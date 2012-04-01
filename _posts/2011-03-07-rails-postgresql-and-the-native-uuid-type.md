---
layout: post
title: rails, PostgreSQL and the native uuid type
categories:
- postgres
- Programming
- rails
- ruby
- Solutions
- uuid
status: publish
type: post
published: true
meta:
  _flattr_post_language: en_GB
  _flattr_post_category: text
  _flattr_post_hidden: "0"
  _flattr_btn_disabled: ""
  _edit_last: "1"
---
UUID have the very handy property that they are uniqe and there are quite many of them for you to use. Also they are difficult to guess and knowing the UUID of one object, it's very hard to guess a valid UUID of another object.

This makes UUIDs perfect for identifying things in web applications:
<ul>
	<li>Even if you shard across multiple machines, each machine can independently generate primary keys without (realistic) fear of overlapping.</li>
	<li>You can generate them without using any kind of locks.</li>
	<li>Sometimes, you have to expose such keys to the user. If possible, you will of course do authorization checks, but it still makes sense not allowing users know about neighboring keysThis gets even more important when you are not able to do authorization keys because the resource you are referring to is public (like a <a href="http://tempalias.com">mail alias</a>) but it should still not possible to know other items if you know one.</li>
</ul>
Knowing that <a href="http://www.codinghorror.com/blog/2007/03/primary-keys-ids-versus-guids.html">UUIDs are a good thing</a>, you might want to use them in your application (or you just have to in the last case above).

There are multiple recipes out there that show how to do it in a rails application (<a href="http://stackoverflow.com/questions/2487837/uuids-in-rails3">this one for example</a>).

All of these recipes store UUIDs as varchar's in your database. In general, that's fine and also the only thing you can do as most databases don't have a native data type for UUIDs.

[PostgreSQL](http://www.postgresql.org) the other hand indeed has a native 128 bit integer type to store UUID.

This is more space efficient than storing the UUID in string form (288 bit) and it might be a tad bit faster when doing comparison operations on the database as integer operations (even if they are this big) require a constant amount of operations whereas comparing two string UUIDs is a string comparison which is dependent on the string size and size of the matching parts.

So maybe for the (minuscule) speed increase or for the purpose of correct semantics or just for interoperability with other applications, you might want to use native PostgreSQL UUIDs from your Rails (or other, but without the abstraction of a "Migration", just using UUID is trivial) applications.

This already works quite nicely if you generate the columns as strings in your migrations and then manually send an <code>alter table</code> (whenever you restore the schema from scratch).

But if you want to create the column with the correct type directly from the migration and you want the column to be created correctly when using <code>rake db:schema:load</code>, then you need a bit of additional magic, especially if you want to still support other databases.

In my case, I was using PostgreSQL in production (<a href="http://www.gnegg.ch/2004/06/all-time-favourite-tools/">what</a> <a href="http://www.gnegg.ch/2009/02/all-time-favourite-tools-update/">else</a>?), but on my local machine, for the purpose of getting started quickly, I wanted to still be able to use SQLite for development.

In the end, everything boils down to monkey patching ActiveRecord::ConnectionAdapters::*Adapters and PostgreSQLColumn of the same module. So here's what I've addded to <code>config/initializers/uuuid_support.rb</code> (Rails 3.0.*):
{% highlight ruby %}
module ActiveRecord
  module ConnectionAdapters
    SQLiteAdapter.class_eval do
      def native_database_types_with_uuid_support
        a = native_database_types_without_uuid_support
        a[:uuid] = {:name => 'varchar', :limit => 36}
        return a
      end
      alias_method_chain :native_database_types, :uuid_support
    end if ActiveRecord::Base.connection.adapter_name == 'SQLite'

    if ActiveRecord::Base.connection.adapter_name == 'PostgreSQL'
      PostgreSQLAdapter.class_eval do
        def native_database_types_with_uuid_support
          a = native_database_types_without_uuid_support
          a[:uuid] = {:name => 'uuid'}
          return a
        end
        alias_method_chain :native_database_types, :uuid_support
      end

      PostgreSQLColumn.class_eval do
        def simplified_type_with_uuid_support(field_type)
          if field_type == 'uuid'
            :uuid
          else
            simplified_type_without_uuid_support(field_type)
          end
        end
        alias_method_chain :simplified_type, :uuid_support
      end
    end
  end
end
{% endhighlight %}
In your migrations you can then use the :uuid type. In my sample case, this was it:
{% highlight ruby %}
class AddGuuidToSites < ActiveRecord::Migration
  def self.up
    add_column :sites, :guuid, :uuid
    add_index :sites, :guuid
  end

  def self.down
    remove_column :sites, :guuid
  end
end
{% endhighlight %}
Maybe with a bit better Ruby knowledge than I have, it should be possible to just monkey-patch the parent <code>AbstractAdaper</code> while still calling the method of the current subclass. This would not require a separate patch for all adapters in use.

For my case which was just support for SQLite and PostgreSQL, the above initializer was fine though.
