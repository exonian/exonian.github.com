---
layout: post
truncate: yes
---

Happy as I was with my [initial effort at creating a visualisation][vizBlogPost1] of [@WOWPlaylists][wowp] data,
there were a couple of issues that I wanted to get working on pretty quickly:

  1) the tooltips weren't necessarily displaying the most relevant information
  2) the "Album year" metadata isn't always that valuable

### Tooltips
Choosing which fields to include in the tooltip, and then displaying their values in a nice human-readable form, was
nice and straightforward, and made a huge difference. What I didn't work out was how (if!?) I could display a list of
values where the data point represents a count of items (eg saying *which* playlists Wham! are on, not just saying how
many); that's a work in progress...

### Better years
In the original viz, year data was featured prominently; however, this data was actually *album year*, not *track year*.
This is fair, as who's to say when a track originates from without reference to the release of the album or single it
came from? Either way, abstract information like that might be available from some source on the internet, but it's
certainly not something we could expect to get from Spotify.

That the date information is actually about albums rather tracks does affect us, however, in a couple of situations:
  - the track on the playlist is the version 'from' a compilation rather than the original release
  - the original album has been remastered, and its metadata reflects the release of the remastered version not the
  original

As a practical solution to try to get the most appropriate date for a given track, I updated [playviz][playviz] to
include an extra step in its json fetching routine: before saving a track's json, the script now does a new Spotify
search query using the track name and artist name returned by the original lookup, and grabs the earliest date from
the results. This combats the compilation issue nicely, and can sometimes get around the remastering issue too (if
the track was on a single as well as an album, it's possible that the single version will have retained its original
date).

Below is my viz updated to use this new year attribute:

<div>
  <script type='text/javascript' src='http://public.tableausoftware.com/javascripts/api/viz_v1.js'> </script>
  <div class='tableauPlaceholder' style='width: 654px; height: 928px;'>
    <noscript><a href='#'><img alt='WOWPlaylists with better years ' src='http:&#47;&#47;public.tableausoftware.com&#47;static&#47;images&#47;KX&#47;KXHPGWGKR&#47;1_rss.png' style='border: none' /></a></noscript>
    <object class='tableauViz' width='654' height='928' style='display:none;'>
      <param name='host_url' value='http%3A%2F%2Fpublic.tableausoftware.com%2F' />
      <param name='path' value='shared&#47;KXHPGWGKR' />
      <param name='toolbar' value='yes' />
      <param name='static_image' value='http:&#47;&#47;public.tableausoftware.com&#47;static&#47;images&#47;KX&#47;KXHPGWGKR&#47;1.png' />
      <param name='animate_transition' value='yes' />
      <param name='display_static_image' value='yes' />
      <param name='display_spinner' value='yes' />
      <param name='display_overlay' value='yes' />
      <param name='display_count' value='yes' />
    </object>
  </div>
  <div style='width:654px;height:22px;padding:0px 10px 0px 0px;color:black;font:normal 8pt verdana,helvetica,arial,sans-serif;'>
    <div style='float:right; padding-right:8px;'>
      <a href='http://www.tableausoftware.com/public/about-tableau-products?ref=http://public.tableausoftware.com/shared/KXHPGWGKR' target='_blank'>Learn About Tableau</a>
    </div>
  </div>
</div>


[vizBlogPost1]: http://michaelblatherwick.co.uk/2014/01/29/wowplaylists-and-tableau/
[playviz]: https://github.com/exonian/playviz
[wowp]: https://twitter.com/intent/user?screen_name=wowplaylists "@WOWPlaylists"
