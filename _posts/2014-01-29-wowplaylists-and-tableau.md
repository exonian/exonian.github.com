---
layout: post
title: WOWPlaylists and Tableau
truncate: yes
---

Recently at work I started organising the return of a tradition called [Welcome Playlists][wowp], where new staff get to
create a playlist for the office to listen to on a Friday afternoon shortly after they start; for those weeks where
there isn't anybody new starting, it's names out of a hat time to see who gets to have a go.
  
And then, inspired by [Andy][andy]'s [blog posts about visualising Last.fm data][andyBlogPost], I decided to
[fetch the playlist metadata][playviz] and play around with it in Tableau.

Below is the result of my first (really rather quick) effort at doing so:


<div>
  <script type='text/javascript' src='http://public.tableausoftware.com/javascripts/api/viz_v1.js'><!-- --></script>
  <div class='tableauPlaceholder' style='width: 654px; height: 928px;'>
    <noscript><a href='#'><img alt='WOWPlaylists ' src='http:&#47;&#47;public.tableausoftware.com&#47;static&#47;images&#47;63&#47;63S8THFFB&#47;1_rss.png' style='border: none' /></a></noscript>
    <object class='tableauViz' width='654' height='928' style='display:none;'>
      <param name='host_url' value='http%3A%2F%2Fpublic.tableausoftware.com%2F' /> 
      <param name='path' value='shared&#47;63S8THFFB' /> 
      <param name='toolbar' value='yes' />
      <param name='static_image' value='http:&#47;&#47;public.tableausoftware.com&#47;static&#47;images&#47;63&#47;63S8THFFB&#47;1.png' /> 
      <param name='animate_transition' value='yes' />
      <param name='display_static_image' value='yes' />
      <param name='display_spinner' value='yes' />
      <param name='display_overlay' value='yes' />
      <param name='display_count' value='yes' />
    </object>
  </div>
  <div style='width:654px;height:22px;padding:0px 10px 0px 0px;color:black;font:normal 8pt verdana,helvetica,arial,sans-serif;'>
    <div style='float:right; padding-right:8px;'>
      <a href='http://www.tableausoftware.com/public/about-tableau-products?ref=http://public.tableausoftware.com/shared/63S8THFFB' target='_blank'>Learn About Tableau</a>
    </div>
  </div>
</div>


[andy]: https://twitter.com/intent/user?screen_name=acotgreave "@acotgreave"
[andyBlogPost]: http://gravyanecdote.com/uncategorized/lastfmthesummary/
[playviz]: https://github.com/exonian/playviz
[wowp]: https://twitter.com/intent/user?screen_name=wowplaylists "@WOWPlaylists"
