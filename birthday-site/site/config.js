/* ✏️ EDIT THIS FILE to personalize the website.
   Photos go in site/assets/photos/, videos in site/assets/videos/, music in site/assets/music/.
   Use file names WITHOUT spaces. If a photo file is missing, a colorful placeholder shows instead. */
window.CONFIG = {
  name: "Alex",
  age: "Turning 25",
  from: "Your best friend",
  gateText: "Psst… I made something for you.",
  music: "",            // e.g. "assets/music/song.mp3" (leave empty for no music)

  /* The "Are you excited?" question on page 2. The No button runs away! */
  excited: {
    q: "Are you excited? 🎉", yes: "Yes! 🎉", no: "No",
    yesMsg: "I knew it! Let’s go 🎉",
    dodges: ["Nice try 😏", "Too slow!", "Hehe, can’t catch me", "Just say yes 💛", "Still trying? 😂"]
  },

  letter: [
    "Happy birthday, Alex! 🎉",
    "I couldn’t find a card good enough, so I built you a whole story of us.",
    "Thank you for every laugh, every late-night talk, and for always being there."
  ],

  /* Memory wall: add as many as you like. caption = under the photo, msg = on the back. */
  memories: [
    { img: "assets/photos/1.jpg",  caption: "The day we met",    msg: "Write how you two met here." },
    { img: "assets/photos/2.jpg",  caption: "Food trip 🍕",      msg: "A funny meal or a food obsession." },
    { img: "assets/photos/3.jpg",  caption: "Road trip 🚗",      msg: "A trip, a wrong turn, a song on repeat." },
    { img: "assets/photos/4.jpg",  caption: "Movie night 🎬",    msg: "The movie you quote constantly." },
    { img: "assets/photos/5.jpg",  caption: "That joke 😂",      msg: "Write the inside joke. No one else will get it." },
    { img: "assets/photos/6.jpg",  caption: "Golden hour 🌅",    msg: "A quiet moment that meant a lot." },
    { img: "assets/photos/7.jpg",  caption: "Party time 🎉",     msg: "Your best party story." },
    { img: "assets/photos/8.jpg",  caption: "Coffee date ☕",    msg: "The place you always go to." },
    { img: "assets/photos/9.jpg",  caption: "Our song 🎶",       msg: "The song that is always ours." },
    { img: "assets/photos/10.jpg", caption: "Beach day 🌊",      msg: "Sun, sand and bad decisions." }
  ],
  unlockAfter: null,    // how many memories must be opened and flipped to unlock the last polaroid (null = all)

  stickers: [
    ["⭐", "You’re a star!"], ["💌", "Secret: you’re my person"], ["🍀", "Lucky to have you"],
    ["🦋", "You make life brighter"], ["👑", "Best friend royalty"]
  ],

  /* How our friendship started */
  timeline: [
    { date: "Day 1",   title: "We met",          img: "assets/photos/t1.jpg", text: "Tell the story of how it started." },
    { date: "Soon after", title: "Became close", img: "assets/photos/t2.jpg", text: "The moment you knew you’d be friends." },
    { date: "The big one", title: "Our first trip", img: "assets/photos/t3.jpg", text: "A trip or a moment that changed everything." },
    { date: "Today",   title: "Still us",        img: "assets/photos/t4.jpg", text: "Still best friends. Still laughing." }
  ],

  /* Inside jokes as a chat. who: "me" (right) or "you" (left) */
  jokes: [
    { who: "you", t: "Remember the thing at the place? 😂" },
    { who: "me",  t: "STOP. I’m still laughing." },
    { who: "you", t: "Nobody else will ever understand." },
    { who: "me",  t: "That’s what makes it ours 💛" }
  ],

  /* Quiz: a = index of the correct option (0 is the first) */
  quiz: [
    { q: "What’s my go-to coffee order?", o: ["Black", "Latte", "I don’t drink coffee"], a: 1 },
    { q: "Where did we first meet?",      o: ["School", "A party", "Online"], a: 0 },
    { q: "What song is always ours?",     o: ["Song A", "Song B", "Song C"], a: 2 }
  ],
  quizResults: [
    "Hmm… we need more hangouts. Soon!",
    "Not bad, but you can do better 😏",
    "Almost perfect! You know me well.",
    "100%! Officially the best friend ever 🏆"
  ],

  /* Video memories page: 6 videos shown like the photo wall. Keep each 10-20 seconds. */
  videos: [
    { src: "assets/videos/1.mp4", caption: "Crazy day 😂" },
    { src: "assets/videos/2.mp4", caption: "Our trip ✈️" },
    { src: "assets/videos/3.mp4", caption: "Dance time 💃" },
    { src: "assets/videos/4.mp4", caption: "Random fun" },
    { src: "assets/videos/5.mp4", caption: "Party night 🎉" },
    { src: "assets/videos/6.mp4", caption: "Just us 💛" }
  ],

  reasons: [
    "You make everyone feel like they belong.",
    "You laugh at my jokes, even the bad ones.",
    "You’re the first person I call with good news.",
    "You’re loyal, kind, and funnier than you admit."
  ],

  /* Last polaroid: photos and videos. type: "img" or "video". Keep videos short (10-20 seconds). */
  final: {
    media: [
      { type: "img",   src: "assets/photos/f1.jpg", cap: "Us ❤️" },
      { type: "img",   src: "assets/photos/f2.jpg", cap: "Always" },
      { type: "video", src: "assets/videos/v1.mp4", cap: "A little video for you" }
    ],
    text: "Dinner is on me this weekend. Pick the place! 🍽️"
  },

  wish: "May all your wishes come true. Love you! 💛",
  ending: "Thank you for being my best friend.",
  signoff: "Made with love, just for you."
};
