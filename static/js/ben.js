$(function() {
    var $pre = $('pre');
    var height = ben_ascii.length;
    var width = ben_ascii[0].length;
    console.log('Height = ' + height);
    console.log('Width = ' + width);

    var lines = '';
    var line_number = 1;
    while (line_number <= height) {
        line_number++;
        var benness = line_number / height;
        var line = make_line(benness);
        lines += line;
    }

    $pre.typed({
        strings: [lines],
        typeSpeed: -100000,
        callback: make_ben
    });

    function make_ben() {
        console.log("Make Ben now");
    }

    function make_line(benness) {
        var line = '';
        while (line.length < width) {
            var next_word = get_next_word(benness);
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

    function get_next_word(benness) {
        if (Math.random() > benness) {
            return get_next_ipsum_word();
        }
        else {
            return get_next_bensum_word();
        }
    }

    function get_next_ipsum_word() {
        return ipsum[Math.floor(Math.random() * ipsum.length)];
    }

    function get_next_bensum_word() {
        return bensum[Math.floor(Math.random() * bensum.length)];
    }
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
