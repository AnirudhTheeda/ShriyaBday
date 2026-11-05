/* ✏️ EDIT THIS FILE to personalize the website.
   Photos go in site/assets/photos/, videos in site/assets/videos/, music in site/assets/music/.
   Use file names WITHOUT spaces. If a photo file is missing, a colorful placeholder shows instead. */
window.CONFIG = {
  name: "Shriya",
  age: "Turning 24",
  from: "Your bestieee!!",
  gateText: "Neekosame okati chesa Riyaaa.",
  music: "",            // e.g. "assets/music/song.mp3" (leave empty for no music)

  /* The "Are you excited?" question on page 2. The No button runs away! */
  excited: {
    q: "Baaga Excited Feel Avthunnava? 🎉", yes: "Yes! 🎉", no: "No",
    yesMsg: "Naaku Telusu! Lesss go 🎉",
    dodges: ["Nice try 😏", "Too slow!", "Hehe, can’t catch me", "Just say yes ", "Still trying? 😂"]
  },

  letter: [
    "Puttina Roju Subhakanshalu Riyaaa 🎉",
    "Nenu deenikante manchi website cheyyalekapoya, so I built you a whole story of us.",
    "Thank you for every laugh, every late-night talk, and for always being there."
  ],

  /* Memory wall: add as many as you like. caption = under the photo, msg = on the back. */
  memories: [
    { img: "assets/photos/1.jpg",  caption: "Comedy Riyaa",    msg: "The Best Comedy pic urs" },
    { img: "assets/photos/2.jpg",  caption: "Us",      msg: "Oka manchi memory ee photo" },
    { img: "assets/photos/3.jpg",  caption: "Cute Pose",      msg: "Aa pose lo chaala Cute ga unnav" },
    { img: "assets/photos/4.jpg",  caption: "The Stunt day",    msg: "Manam oka chinna stunt chesina roju" },
    { img: "assets/photos/5.jpg",  caption: "Nee brain mokallo undi",      msg: "Write the inside joke. No one else will get it." },
    { img: "assets/photos/6.jpg",  caption: "The Meme gal",    msg: "Nee sticker kosam bale pose pettav" },
    { img: "assets/photos/7.jpg",  caption: "Foodie",     msg: "Food thintu addanga dorikipoyina riyaa" },
    { img: "assets/photos/8.jpg",  caption: "ilatto",    msg: "Costly italian ice cream thinna roju" },
    { img: "assets/photos/9.jpg",  caption: "Evaru ee papa",       msg: "Waffle thinipinchina roju" },
    { img: "assets/photos/10.jpg", caption: "Sunnam Papa",      msg: "Ma sunnam papa tho bayataki vellina roju" }
  ],
  unlockAfter: null,    // how many memories must be opened and flipped to unlock the last polaroid (null = all)

  stickers: [
    ["⭐", "Riyaa Thopuuu"], ["💌", "Secret: you’re my Kuchupuchu riyaa"], ["🍀", "Lucky to have you"],
    ["🦋", "Sunnam Papa"], ["👑", "Chaala manchidaanivi"]
  ],

  /* How our friendship started */
  timeline: [
    { date: "Day 1",   title: "Mana 1st Convo",          img: "assets/photos/t1.jpg", text: "Nuv Naaku first time AUG 11th msg chesav" },
    { date: "Soon after", title: "Became close", img: "assets/photos/t2.jpg", text: "Chaala Fast ga close aiyyamu" },
    { date: "The big one", title: "Our first trip", img: "assets/photos/t3.jpg", text: "First time aunty tho bunk kotti bayataki vellam" },
    { date: "Today",   title: "Still us",        img: "assets/photos/t4.jpg", text: "Still bestiesss. Still laughing." }
  ],

  /* Inside jokes as a chat. who: "me" (right) or "you" (left) */
  jokes: [
    { who: "you", t: "Sunnam Paapa is your tag line" },
    { who: "me",  t: "Nenu Chitika tho piliche habit" },
    { who: "you", t: "U are a sleepy Head" },
    { who: "me",  t: "Bestieeess!!!" }
  ],

  /* Quiz: a = index of the correct option (0 is the first) */
  quiz: [
    { q: "What’s my go-to coffee order?", o: ["Black", "Latte", "Challa coffee"], a: 2 },
    { q: "Nee peru enti",      o: ["Shriya", "ShRiya", "Riyaaa"], a: 2 },
    { q: "Neeku brain unda?",     o: ["Neither", "Yes", "NO"], a: 2 }
  ],
  quizResults: [
    "Hmm… we need more hangouts. Soon!",
    "Parledu, inkoncham try cheyyachu 😏",
    "Almost perfect! Then your Brain is not in the knee",
    "100%! Officially the bestiesss ever 🏆"
  ],

  /* Video memories page: 6 videos shown like the photo wall. Keep each 10-20 seconds. */
  videos: [
    { src: "assets/videos/1.mp4", caption: "Talking abt Ananth sir" },
    { src: "assets/videos/2.mp4", caption: "R Exam Day" },
    { src: "assets/videos/3.mp4", caption: "Exams Over" },
    { src: "assets/videos/4.mp4", caption: "Latenyt Study" },
    { src: "assets/videos/5.mp4", caption: "Random fun latenight" },
    { src: "assets/videos/6.mp4", caption: "Just u 💛" }
  ],

  reasons: [
    "Coz you dont have brain....",
    "Coz I became your frined.",
    "Coz you are Sunnam papa.",
    "Finally coz you are Kuchupuchu Riyaaa."
  ],

  /* Last polaroid: photos and videos. type: "img" or "video". Keep videos short (10-20 seconds). */
  final: {
    media: [
      { type: "img",   src: "assets/photos/f1.jpg", cap: "Us ❤️" },
      { type: "img",   src: "assets/photos/f2.jpg", cap: "Always eyes" },
      { type: "video", src: "assets/videos/v1.mp4", cap: "Kuchupuchu Riyaa" }
    ],
    text: "A gift is yet to be delivered to you, So stay Tuned...!"
  },

  wish: "May all your wishes come true Riyaaaa.",
  ending: "Dhanyavaadalu for being my bestieee.",
  signoff: "Made with premaa, just for you."
};
