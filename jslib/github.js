/* The following is based on the octopress twitter plugin
   which in turn contains fixes done by myself */
(function($, window, undefined){

  $.fn.githubRepos = function(user, config){
    var el = this,
        url = '',
        render = function(repos){
            var i = 0, fragment = '';
            for(i = 0; i < repos.length; i++)
                fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a><p>'+repos[i].description+'</p></li>';
            return fragment;
        };

    config = $.extend({
      skip_forks: true,
      count: 5
    }, config || {});

    url = "https://api.github.com/users/"+user+"/repos?callback=?";

    $.getJSON(url, function(data){
        var res = [], repos = data.data;
        $.each(repos, function(i, repo){
            if (config.skip_forks && repo.fork) return;
            res.push(repo);
        });
        res.sort(function(a, b){
            var a = new Date(a.pushed_at),
                b = new Date(b.pushed_at);

            if (a.valueOf() == b.valueOf()) return 0;
            return a.valueOf() > b.valueOf() ? -1 : 1;
        });
        res.splice(config.count, res.length-config.count);
        el.html(render(res));
    });

  }

})(jQuery, window);
