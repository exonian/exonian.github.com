$(function() {
    var $pre = $('pre');
    var height = ben_ascii.length;
    var width = ben_ascii[0].length;
    console.log('Height = ' + height);
    console.log('Width = ' + width);

    var bensum = loremBensum({wordLimit: 400}).split(' ');

    var lines = '';
    var line_number = 1;
    while (line_number <= height) {
        line_number++;
        line = make_line();
        lines += line;
    }

    $pre.typed({
        strings: [lines],
        typeSpeed: -100000,
    });

    function make_line() {
        var line = '';
        while (line.length < width) {
            var next_word = get_next_word();
            if (line.length + next_word.length <= width - 1) {
                line += ' ' + next_word;
            }
            else {
                while (line.length < width) {
                    line += ' ';
                }
            };
        }
        return line + '\n';
    }

    function get_next_word() {
        return bensum[Math.floor(Math.random() * bensum.length)];
    }

    // $.each(ben_ascii,  function( i,v ) {
        // $pre.append(v + '\n');
    // });
});


// Fisher Yates ftw
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
