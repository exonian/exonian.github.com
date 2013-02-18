---
layout: post
truncate: yes
---

<p class="lead">tl;dr <code>permalink: pretty</code></p>
<hr />

I don't know how much technical stuff is going to make it onto this blog
and I certainly don't intend to go into every detail of how the blog
itself was constructed, but today at work I was talking to [Ben][ben] about
pretty urls in Jekyll.

It was [Ben's website][benWeb] that inspired me to build this, and from
which I got a few specific ideas, but he hadn't come across Jekyll's
ability to generate 'pretty' urls (urls without a file extension at the
end), so I thought I'd do a little post about it on here.  

Jekyll lets you choose [how your posts' urls come out][permalinks]; this
post is generated from a file called 2013-20-11-pretty-urls-with-jekyll.md
and the url Jekyll would produce with its default <code>permalink:
date</code> permalink style
would be /2013/02/11/pretty-urls-with-jekyll.html; however, just by
setting <code>permalink: pretty</code>, the url becomes
/2013/02/11/pretty-urls-with-jekyll/index.html, and thus
/2013/02/11/pretty-urls-with-jekyll/ will point to it.

As well as 'date' and 'pretty', the permalink variable has a built-in
value of 'none', which would put the post at
/pretty-urls-with-jekyll.html, but you can also construct your own
formats using various variables (date components, title and categories).

You can even override the permalink of individual posts in the post's
front-matter if you see fit.  All very cool, but the standard pretty
urls work just fine for me right now.

[ben]: https://twitter.com/intent/user?screen_name=benjaminbenben "@benjaminbenben"
[benWeb]: http://benjaminbenben.com
[permalinks]: https://github.com/mojombo/jekyll/wiki/Permalinks
