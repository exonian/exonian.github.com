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

    // $pre.typed({
        // strings: [lines],
        // typeSpeed: -100000,
        // callback: make_ben
    // });

    $pre.html(lines);
    make_ben();

    function make_ben() {
        var char_coords = []
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                char_coords.push([x,y])
            }
        }
        order = shuffle(char_coords)
        var current_string=$pre.html();
        var new_string;
        var per_delay = 1000;
        var easing = 1;
        for (var i = 0, delay_time = per_delay; i < order.length; i++) {
            var x = order[i][0];
            var y = order[i][1];
            var index = (y*(width+1))+x; // account for newline chars by adding 1 to width
            if (current_string.charAt(index) == '\n') {
                continue;
            }
            var new_char = ben_ascii[y].charAt(x);
            var new_string = current_string.substr(0, index) + new_char + current_string.substr(index+new_char.length);
            setTimeout((function(new_string) {
                return function() {
                    replace_string(new_string);
                };
            })(new_string), delay_time);
            var current_string = new_string;
            var delay_time = delay_time + per_delay;
        }
    }

    function replace_string(new_string) {
        $pre.html(new_string);
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
