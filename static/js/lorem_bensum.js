// Lorem Bensum generator
// Produces sentences which are (statistically) similar to what Ben says, or whatever.
var loremBensum = function(settings) {
  var data = [
    "How's that going, do you want to pop outside?",
    "Yeah, course.",
    "How was it?",
    "Yeah wait, you got, how is it you've got anything left to do.",
    "Shall we do that just now?",
    "Cool, cool, cool, cool, cool.",
    "Yo, how's it going?",
    "I keep on saying like stupid things in calls like take it easy or whatever.",
    "I know it's like a unique example or whatever.",
    "You can train it per venue I think.",
    "It might be cool to have a talk when you've looked at the code or whatever.",
    "Train it over a sequence of things, I dunno.",
    "I don't, I don't know if it would, that might...",
    "I keep on having these things, it's like a few days ago Anthony had a shower curtain.",
    "Aww, that is cute.",
    "This is at six fifteen in the morning which is really early.",
    "Party time.",
    "Newfound bullying.",
    "I won't be massively, massively hungry.",
    "I did have two and a half burritos for lunch.",
    "It's pretty, pretty sizable.",
    "Alright, okay, good.",
    "I think it might be like less structure, I don't know...",
    "It'll just say like zap it five times in the last hour or whatever.",
    "Right, yeah, take it easy.",
    "Exciting stuff.",
    "No worries at all.",
    "It needs to go, does that make sense, what were you?...",
    "How about something like...",
    "Yeah right on.",
    "Okay cool so.",
    "Okay I, yeah...",
    "Right erm so yeah.",
    "If you wanted to make a back button that would be cool or whatever, does that make sense?",
    "The other thing is yeah, did you know at the random hacks thing someone used the API?",
    "Er right yeah then, is that cool?",
    "Okay yeah so checkboxes.",
    "I guess if we were to make, or give some mini example apps...",
    "Just, totally, I guess.",
    "No, not even slightly.",
    "It would just be like...",
    "The sheer amount of information in there is just like massive.",
    "Yeah, okay, catch you later.",
    "Totally!",
    "I got it because my friend has a mega hammmer.",
    "Nice one!",
    "Don't really know what I'm doing really, partying maybe.",
    "Mince pies, daily scrum...",
    "That would be awesome actually, yeah!",
    "I don't know, I hadn't really thought that through actually.",
    "So if everyone's away during christmas will the company make like massive profits?",
    "Yeah, yeah, totally, yeah, cool.",
    "Thirty three unread messages in the chat thing.",
    "That's not that's boxers...",
    "Look at Ben, look at Ben.",
    "Also you can stay stuff like pug...",
    "There is a useful application, which is the thing we're talking about which is er, Jenkins.",
    "Brilliant!",
    "What's been changed?",
    "Perhaps just delete a few sections?",
    "I had a really good idea for a project, it's like really interesting, I thought you'd want to know.",
    "I don't think that...",
    "It's a solid idea actually.",
    "So what you do is you give it a webpage like White October or whatever.",
    "Then down here if there's like three stylesheets...",
    "You know like all these kind of things.",
    "You connect to this, you draw lines from here, here, here, here...",
    "So like this one here has ramifications here.",
    "What I've got is I've got this thing that basically goes through...",
    "So I've got basically it goes through every element and it works out the dimensions of it and saves that.",
    "So like phantom js is like really nice like that.",
    "Pretty nice.",
    "I made a point of putting music on when Anthony leaves so it's like we start having a good time.",
    "Ah, awesome",
    "Where were you...?",
    "Poor Dave... brilliant!",
    "Er so yeah like I... er, yeah.",
    "Seems like quite a lot of people share your, your irritation.",
    "Which shop, and when?",
    "Just uh, I'm trying to get better at responding to emails and stuff like that",
    "Why are you watching that, what?",
    "What have you just been...?",
    "Alright it was good sitting back there and seeing all people and stuff... whatever.",
    "This is my first conference of this style or something.",
    "So I just wanted to see what it was like, and so far it's been great with all the talks and stuff.",
    "Erm yeah, but not today...",
    "I just need to finish this thing today...",
    "Perfect! I would be so into that, it would be amazing.",
    "What as in what, that would be?",
    "Nope, I really want to see that. I want to see that sherlock holmes thing, that would be amazing.",
    "No, no it would be fine.",
    "Yeah that would be perfect.",
    "What as in just now or what?",
    "Yeah, no that would be so nice I would really love that.",
    "Yeah sure I've probably got a couple of hour more work.",
    "Okay super, alright okay.",
    "I've got that sleepy taste in my mouth, you know that?",
    "After the hack day thing I've been up all right or whatever.",
    "I got really hot in my sleep and I'd just been sweating and I'd also been dribbling.",
    "Dinner... like evening meal.",
    "So yeah, that's brilliant!",
    "Yeah it's using websockets so it's like super fast.",
    "Ruby is great, or whatever",
    "Basically I just built this thing which is just like really nice, you know?",
    "Neato, that is brilliant!",
    "I'm not explaining myself very well...",
    "That is totally brilliant or whatever.",
    "This is Dave the boss",
    "Everyone's working at stuff",
    "Right, we're going to go out and get lunch and stuff",
    "Um, yeah, nice one!",
    "They were just so cool, they would like twist round then come out",
    "No, they had some like metal ones aswell",
    "Do any of you guys have some like water?"
  ];

  settings = settings || {};
  var depth = Math.min(Math.max(settings.depth || 4, 0), 10);
  var smoothing = settings.smoothing || 0.01;
  var wordLimit = Math.min(settings.wordLimit || 15, 500);

  // Splits each sentence into tokens, including grammar
  var tokenise = function(sentence) {
    return sentence.toLowerCase().replace(/[\?!\.]+/g, "").replace(/,/g, function(c) { return " "+c; }).split(/\s+/);
  };

  // Adds beginning and end of sentence tokens
  var wrap = function(tokens) {
    return ["^"].concat(tokens).concat("$");
  };

  // Creates a hash of all usable words
  var allWords = tokenise(data.join(" "));
  var words = {};
  for (var i = 0; i < allWords.length; i++) {
    words[allWords[i]] = 0;
  }

  // Creates a tree of word chains up to `depth`
  // terminating with a count of possible words to end the chain
  var getCounts = function(data) {
    var counts = {};
    for (var i = 0; i < data.length; i++) {
      var line = wrap(tokenise(data[i]));
      for (var j = 0; j < line.length; j++) {
        var set = line.slice(Math.max(j - depth, 0), Math.min(j + 1, line.length));
        var current = counts;
        for (var k = 0; k < set.length; k++) {
          current = current[set[k]] = current[set[k]] || {};

        }
        current._ = (current._ || 0) + 1;
      }
    }
    return counts;
  };

  // Given a set of words, finds the next word
  var nextWord = function(previousWords, allWords, counts, depth) {
    var priors = previousWords.slice(-depth);

    // Gets possible words and their counts
    var getWordCounts = function(set, counts) {
      for (var j = 0; j < set.length; j++) {
        if (counts[set[j]] === undefined) return {};
        counts = counts[set[j]];
      }
      delete counts._;
      return counts;
    };

    // Shallow clones an object
    var clone = function(obj) {
      var cloned = {};
      for (key in obj) cloned[key] = obj[key];
      return cloned;
    };

    // Gets the sample counts for each word and totals
    var wordCounts = getWordCounts(priors, counts);
    var possibleWords = clone(allWords);
    var totalSamples = 0;
    var totalWords = 0;
    for (key in possibleWords) {
      possibleWords[key] = wordCounts[key] ? (wordCounts[key]._ || 0) : 0;
      totalSamples = totalSamples + possibleWords[key];
      totalWords++;
    }

    // Laplacian smoothing function creates more robust and flexible model
    var smoother = function(value, samples, words, smoothing) { return parseFloat(value + smoothing) / (samples + smoothing * words); };

    // Applies smoothing/normalisation to all possible words
    for (key in possibleWords) {
      possibleWords[key] = smoother(possibleWords[key], totalSamples, totalWords, smoothing);
    }

    // Selects a random word based on smoothed likelihood value
    var number = Math.random();
    var accumulate = 0;
    for (key in possibleWords) {
      accumulate = accumulate + possibleWords[key];
      if (number < accumulate) return key;
      var last = key;
    }
    return last;
  };

  // Changes the first letter of a string to upper case
  var upperCaseFirst = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Changes a sentence to sentence case
  var sentenceCase = function(str) {
    var sentences = str.split(". ");
    for (var i = 0; i < sentences.length; i++) {
      sentences[i] = upperCaseFirst(sentences[i]);
    }
    return sentences.join(". ")
      .replace("ben", "Ben")
      .replace("i'm", "I'm")
      .replace("i've", "I've")
      .replace("i'd", "I'd")
      .replace(/[ \.,]i[ \.,]/, function(i) {
        return i.toUpperCase();
      });
  };

  // Generates a sentence
  var counts = getCounts(data);
  var sentence = ["^"];
  var i = 0;
  var punctuated = true;
  do {
    var next = nextWord(sentence, words, counts, depth);
    if (!punctuated || !(punctuated = next.match(/^[\.,!?]+$/g))) {
      sentence.push(next);
      i++;
    }
  } while (next != "$" && i < wordLimit);
  sentence.push(nextWord(sentence, {".": 0, "!": 0, "?": 0, "...": 0}, counts, depth));

  return sentenceCase(sentence.slice(1, sentence.length).join(" "))
    .replace(/ [\.,!?]/g, function(e) { return e.charAt(1); });
};
