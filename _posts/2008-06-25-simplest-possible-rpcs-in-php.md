---
layout: post
title: Simplest possible RPCs in PHP
categories:
- Programming
tags:
- PHP
- Programming
- soap
- Software
- webdev
status: publish
type: post
published: true
meta:
  _edit_last: "1"
---
After spending hours to find out why a particular combination of SoapClient in PHP itself and SOAP::Server from PEAR didn't consistenly work together (sometimes, arrays passed around lost an arbitrary number of elements), I thought about what would be needed to make RPCs work form a PHP client to a PHP server.

I wanted nothing fancy and I certainly wanted as less an overhead as humanly possible.

This is what I came up with for the server:
{% highlight php %}
<?php
header('Content-Type: text/plain');

require_once('a/file/containing/a/class/you/want/to/expose.php');

$method = str_replace('/', '', $_SERVER['PATH_INFO']);

if ($_SERVER['REQUEST_METHOD'] != 'POST'){
   sendResponse(array('state' =&gt; 'error', 'cause' =&gt; 'unsuppored HTTP method'));
}

$s = new MyServerObject();
$params = unserialize(file_get_contents('php://input'));
if ( ($res = call_user_func_array(array($s, $method), $params)) === false)
   sendResponse(array('state' => 'error', 'cause' => 'RPC failed'));
if (is_object($res))
   $res = get_object_vars($res);
sendResponse($res);

function sendResponse($resobj){
    echo serialize($resobj);
    exit;

}

?>
{% endhighlight %}
This client as shown below is a bit more complex, mainly because it contains some HTTP protocol logic. Logic, which could possibly be reduced to 2-3 lines of code if I'd use the CURL library, but the client in this case does not have the luxury of having access to such functionality.

Also, I've already had the function laying around (/me winks at domi), so that's what I used (as opposed to file_get_contents with a pre-prepared stream context). This way, we DO have the advantage of learning a bit of how HTTP works and we are totally self-contained.

{% highlight php %}
<?php
class Client{
    function __call($name, $args){
        $req = $this-&gt;openHTTPRequest('http://localhost:5436/restapi.php/'.$name, 'POST', array('Content-Type' =&gt; 'text/plain'), serialize($args));
        $data = unserialize(stream_get_contents($req['handle']));
        fclose($req['handle']);
        return $data;
    }
    private function openHTTPRequest($url, $method = 'GET', $additional_headers = null, $data = null){
        $parts = parse_url($url);

        $fp = fsockopen($parts['host'], $parts['port'] ? $parts['port'] : 80);
        fprintf($fp, "%s %s HTTP/1.1\r\n", $method, implode('?', array($parts['path'], $parts['query'])));
        fputs($fp, "Host: ".$parts['host']."\r\n");
        if ($data){
            fputs($fp, 'Content-Length: '.strlen($data)."\r\n");
        }
        if (is_array($additional_headers)){
            foreach($additional_headers as $name => $value){
                fprintf($fp, "%s: %s\r\n", $name, $value);
            }
        }
        fputs($fp, "Connection: close\r\n\r\n");
        if ($data)
            fputs($fp, "$data\r\n");

        // read away header
        $header = array();
        $response = "";
        while(!feof($fp)) {
            $line = trim(fgets($fp, 1024));
            if (empty($response)){
                $response = $line;
                continue;
            }
            if (empty($line)){
                break;
            }
            list($name, $value) = explode(':', $line, 2);
            $header[strtolower(trim($name))] = trim($value);
        }
        return array('response' => $response, 'header' => $header, 'handle' => $fp);
   }

}

$client = new Client();
$result = $client->someMethod(array('data' => 'even arrays work'));

?>
{% endhighlight %}
What you can't pass around this way is objects (at least object which are not of type stdClass) as both client and server would need to have access to the prototype. Also, this seriously lacks error handling. But it generally works much better than what SOAP ever could accomplish.

Naturally, I give up stuff when compared to SOAP or any «real» RPC solution:
<ul>
	<li>This one works only with PHP</li>
	<li>It has limitations on what data structures can be passed around, though that's aleviated by PHP's incredibly strong array support.</li>
	<li>It relies heavily on PHP's loosely typed nature and thus probably isn't as robust.</li>
</ul>
Still, protocols like SOAP (or even <strong>any </strong>protocol with either «simple» or «lightweight» in its name) tend to be so complicated that it's incredibly hard if not impossible to create different implementations what still correctly work together in all cases.

In my case, where I have the problem of having to separate two pieces of the same application due to unstable third-party libraries which I would not want to have linked into every PHP instance running on that server for which the solution outlined above (plus some error handling code) works better than SOAP on so many levels:
<ul>
	<li>it's easily debuggable. No need for wireshark or comparable tools</li>
	<li>client and server are written by me, so they are under my full control</li>
	<li>it works all the time</li>
	<li>it relies on as little functionality of PHP as possible and the functionality it depends on is widely used and tested, to I can assume that it's reasonably bug-free (aside of my own bugs).</li>
	<li>it's a whole lot faster than SOAP, though this does not matter at all in this case.</li>
</ul>
