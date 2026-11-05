(function () {
var C = window.CONFIG, $ = function (s) { return document.querySelector(s); };
function esc(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* If a photo path fails (e.g. file is .png or .jpeg instead of .jpg), try other extensions, then give up and show the placeholder */
window.__fb = function (i) {
  var s = i.getAttribute('src'), m = s.match(/^(.*)\.[A-Za-z0-9]+$/);
  if (!m) { i.remove(); return; }
  var x = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG', 'gif'], k = +(i.dataset.k || 0);
  while (k < x.length && m[1] + '.' + x[k] === s) k++;
  if (k >= x.length) { i.remove(); return; }
  i.dataset.k = k + 1; i.src = m[1] + '.' + x[k];
};
var GR = [["#ff9aa2","#ffdac1"],["#ffd166","#f6a96b"],["#8ecbff","#a0e7e5"],["#c77dff","#ffafcc"],["#7ee0c8","#cdf0a0"],["#ffb347","#ff7aa2"]];
var EM = ["📸","🍕","🚗","🎬","😂","🌅","🎉","☕","🎶","🌊"];
function ph(src, i, e) {
  return '<div class="ph" style="background:linear-gradient(135deg,' + GR[i % 6][0] + ',' + GR[i % 6][1] + ')"><span>' + (e || EM[i % EM.length]) + '</span>' +
    (src ? '<img src="' + src + '" alt="" draggable="false" onerror="__fb(this)">' : '') + '</div>';
}

/* ---------- confetti, toast, sparkles ---------- */
var cv = $('#cv'), ctx = cv.getContext('2d'), bits = [], run = false, cols = ['#ffd166','#ff7aa2','#7ee0c8','#b39ddb','#8ecbff','#ff9ec4'];
function sz() { cv.width = innerWidth; cv.height = innerHeight; } addEventListener('resize', sz); sz();
function burst(n, el) {
  if (reduce) return;
  var r = el ? el.getBoundingClientRect() : null, x = r ? r.left + r.width / 2 : innerWidth / 2, y = r ? r.top + r.height / 2 : innerHeight * .45;
  for (var i = 0; i < n; i++) bits.push({ x: x, y: y, vx: (Math.random() - .5) * 15, vy: -Math.random() * 13 - 3, w: 6 + Math.random() * 6, h: 4 + Math.random() * 6, a: Math.random() * 6, va: (Math.random() - .5) * .4, c: cols[i % 6], l: 1 });
  if (!run) { run = true; requestAnimationFrame(tick); }
}
function tick() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  bits = bits.filter(function (b) { return b.y < cv.height + 20 && b.l > 0; });
  bits.forEach(function (b) { b.vy += .3; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.a += b.va; b.l -= .004;
    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.globalAlpha = Math.max(b.l, 0); ctx.fillStyle = b.c; ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore(); });
  if (bits.length) requestAnimationFrame(tick); else run = false;
}
var tt;
function toast(t) { var e = $('#toast'); e.textContent = t; e.className = 'hand on'; clearTimeout(tt); tt = setTimeout(function () { e.className = 'hand'; }, 2600); }
var last = 0, em = ['✨','⭐','💛','🎈'];
addEventListener('pointermove', function (e) {
  if (reduce || e.pointerType !== 'mouse') return; var n = Date.now(); if (n - last < 70) return; last = n;
  var s = document.createElement('span'); s.className = 'spark'; s.textContent = em[Math.floor(Math.random() * 4)];
  s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px'; document.body.appendChild(s); setTimeout(function () { s.remove(); }, 800);
});

/* ---------- state ---------- */
var N = C.memories.length, need = C.unlockAfter || N, viewed = {}, nView = 0, found = 0, opened = false;
function counts() {
  var a = $('#c1'), b = $('#c2'); if (a) a.textContent = '📸 ' + nView + '/' + N + ' flipped';
  if (b) b.textContent = '✨ ' + found + '/' + C.stickers.length + ' stickers';
  var h = $('#lh'), l = $('#lock');
  if (h && !opened) h.textContent = nView >= need ? 'It’s unlocked! Tap it 🔓' : 'Open and flip ' + need + ' memories to unlock (' + Math.min(nView, need) + '/' + need + ')';
  if (l && !opened && nView >= need && l.disabled) { l.disabled = false; $('#lf').innerHTML = '🔓<small class="hand">Tap me!</small>'; }
}

/* ---------- lightbox ---------- */
function openLB(i) {
  var m = C.memories[i];
  $('#lbw').innerHTML = '<div class="pl" id="pl" tabindex="0" role="button" aria-label="Flip photo"><div class="in2"><div class="fc">' + ph(m.img, i) + '<div class="cap hand">' + esc(m.caption) + '</div></div><div class="fc b2"><p class="hand">' + esc(m.msg) + '</p></div></div></div><p class="tip hand">Tap the photo to flip it</p>';
  $('#lb').hidden = false;
  var p = $('#pl');
  function f() { p.classList.toggle('fl'); if (p.classList.contains('fl') && !viewed[i]) { viewed[i] = 1; nView++; counts(); } }
  p.onclick = f; p.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); f(); } };
  p.focus();
}
function scatter(g) {
  var fs = [].slice.call(g.children), n = fs.length, W = g.clientWidth, cols = W > 600 ? 3 : 2, rows = Math.ceil(n / cols), cw = W / cols,
      fw = Math.min(cw * 1.08, 240), fh = fw * .75 + 52, ch = fh * .85, s = 11, z = 1;
  function r() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
  g.style.height = (rows * ch + fh * .6) + 'px';
  fs.forEach(function (d, i) {
    var x = (i % cols) * cw + (cw - fw) / 2 + (r() - .5) * cw * .4, y = Math.floor(i / cols) * ch + r() * fh * .5;
    x = Math.max(0, Math.min(W - fw, x));
    d.style.cssText = 'width:' + fw + 'px;left:' + x + 'px;top:' + y + 'px;transform:rotate(' + ((r() - .5) * 18) + 'deg)';
    if (d.dataset.v === '1') { d.style.zIndex = 50; return; }
    var sx, sy, ox, oy, dn;
    d.onpointerdown = function (ev) { dn = 1; sx = ev.clientX; sy = ev.clientY; ox = d.offsetLeft; oy = d.offsetTop; d.setPointerCapture(ev.pointerId); d.style.zIndex = ++z; };
    d.onpointermove = function (ev) { if (dn) { d.style.left = (ox + ev.clientX - sx) + 'px'; d.style.top = (oy + ev.clientY - sy) + 'px'; } };
    d.onpointerup = function () { dn = 0; };
  });
}
function closeLB() { $('#lb').hidden = true; }
$('#lbx').onclick = closeLB;
$('#lb').onclick = function (e) { if (e.target === this) closeLB(); };

/* ---------- pages ---------- */
var pages = [
 { h: '<p class="hand xl">' + esc(C.gateText) + '</p><button id="gift" aria-label="Open your surprise">🎁</button><p class="hand xl">Tap the gift</p>',
   i: function (e) { e.querySelector('#gift').onclick = function () { burst(220, this); setTimeout(function () { go(1); }, reduce ? 0 : 700); }; } },

 { h: '<h1>Happy Birthday, ' + esc(C.name) + '!</h1><span class="badge">' + esc(C.age) + '</span><p class="hand xl">This is a little story about us.</p>' +
      '<div id="ex"><p class="hand xl">' + esc(C.excited.q) + '</p><div class="yn"><button class="cta" id="yes">' + esc(C.excited.yes) + '</button><button class="cta no" id="no">' + esc(C.excited.no) + '</button></div><p class="hand sub" id="nt" aria-live="polite"></p></div>' +
      '<div id="go" hidden><p class="hand xl">' + esc(C.excited.yesMsg) + '</p><button class="cta" data-next>Start →</button></div>',
   i: function (e) {
     var yes = e.querySelector('#yes'), no = e.querySelector('#no'), nt = e.querySelector('#nt'), fixed = false, n = 0;
     function dodge(px, py) {
       if (!fixed) {
         var b = no.getBoundingClientRect(), sp = document.createElement('span');
         sp.style.cssText = 'width:' + b.width + 'px;height:' + b.height + 'px';
         no.parentNode.insertBefore(sp, no); no.classList.add('fx'); no.style.left = b.left + 'px'; no.style.top = b.top + 'px'; fixed = true;
       }
       var st = e.getBoundingClientRect(), bw = no.offsetWidth, bh = no.offsetHeight, x, y, t = 0;
       do { x = st.left + 8 + Math.random() * Math.max(1, st.width - bw - 16); y = st.top + 8 + Math.random() * Math.max(1, st.height - bh - 16); t++; }
       while (t < 25 && Math.hypot(x + bw / 2 - px, y + bh / 2 - py) < 130);
       no.style.left = x + 'px'; no.style.top = y + 'px';
       nt.textContent = C.excited.dodges[n++ % C.excited.dodges.length];
     }
     /* laptop: runs away when the cursor gets close */
     addEventListener('pointermove', function (ev) {
       if (ev.pointerType !== 'mouse' || cur !== 1 || e.querySelector('#ex').hidden) return;
       var b = no.getBoundingClientRect();
       if (Math.hypot(ev.clientX - (b.left + b.width / 2), ev.clientY - (b.top + b.height / 2)) < Math.max(b.width, b.height) / 2 + 70) dodge(ev.clientX, ev.clientY);
     });
     /* phone (and keyboard): dodges as soon as it is touched or activated */
     no.addEventListener('pointerdown', function (ev) { ev.preventDefault(); dodge(ev.clientX, ev.clientY); });
     no.addEventListener('click', function (ev) { ev.preventDefault(); var b = no.getBoundingClientRect(); dodge(b.left + b.width / 2, b.top + b.height / 2); });
     yes.onclick = function () { burst(200, yes); e.querySelector('#ex').hidden = true; e.querySelector('#go').hidden = false; };
   } },

 { h: '<div class="note hand">' + C.letter.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '<p>– ' + esc(C.from) + '</p></div>' },

 { c: 'wallp', h: '<div class="cnt"><span id="c1"></span><span id="c2"></span></div><p class="sub hand">Drag the photos. Tap one to open it. Find the hidden stickers!</p><div class="wall" id="wall"></div>',
   i: function (e) {
     var w = e.querySelector('#wall'), W = w.clientWidth, H = w.clientHeight, cols2 = W > 760 ? 5 : 3, rows = Math.ceil(N / cols2), cw = W / cols2, ch = H / rows, s = 7, z = 1;
     function r() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
     C.memories.forEach(function (m, i) {
       var pw = Math.max(80, Math.min(cw * (1 + r() * .35), W > 760 ? 200 : 150)), phh = pw * 1.3;
       var x = (i % cols2) * cw + (cw - pw) / 2 + (r() - .5) * cw * .5, y = Math.floor(i / cols2) * ch + (ch - phh) / 2 + (r() - .5) * ch * .5;
       x = Math.max(0, Math.min(W - pw, x)); y = Math.max(0, Math.min(H - phh, y));
       var d = document.createElement('div'); d.className = 'pol'; d.tabIndex = 0; d.setAttribute('role', 'button'); d.setAttribute('aria-label', 'Open memory: ' + (m.caption || ''));
       d.style.cssText = 'width:' + pw + 'px;left:' + x + 'px;top:' + y + 'px;transform:rotate(' + ((r() - .5) * 18) + 'deg)';
       d.innerHTML = '<i class="tp"></i>' + ph(m.img, i) + '<div class="cap hand">' + esc(m.caption) + '</div>';
       var sx, sy, ox, oy, mv, dn;
       d.onpointerdown = function (ev) { dn = 1; mv = 0; sx = ev.clientX; sy = ev.clientY; ox = d.offsetLeft; oy = d.offsetTop; d.setPointerCapture(ev.pointerId); d.style.zIndex = ++z; };
       d.onpointermove = function (ev) { if (!dn) return; var dx = ev.clientX - sx, dy = ev.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 6) mv = 1; if (mv) { d.style.left = (ox + dx) + 'px'; d.style.top = (oy + dy) + 'px'; } };
       d.onpointerup = function () { dn = 0; if (!mv) openLB(i); };
       d.onkeydown = function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openLB(i); } };
       w.appendChild(d);
     });
     C.stickers.forEach(function (st) {
       var b = document.createElement('button'); b.className = 'stk'; b.textContent = st[0]; b.setAttribute('aria-label', 'Hidden sticker');
       b.style.left = (r() * (W - 36)) + 'px'; b.style.top = (r() * (H - 36)) + 'px';
       b.onclick = function () { b.classList.add('found'); found++; toast(st[1]); counts(); burst(40, b); };
       w.appendChild(b);
     });
     counts();
   } },

 { h: '<h2>How our friendship started</h2><div class="tl">' + C.timeline.map(function (t, i) {
     return '<div class="ev"><div class="evp">' + ph(t.img, i + 2, ['👋','☕','✈️','💛'][i % 4]) + '</div><div class="evt"><b class="hand">' + esc(t.date) + ' · ' + esc(t.title) + '</b><p>' + esc(t.text) + '</p></div></div>';
   }).join('') + '</div>' },

 { h: '<h2>Things only we understand</h2><div class="chat">' + C.jokes.map(function (j, i) {
     return '<div class="b ' + (j.who === 'me' ? 'me' : 'you') + '" style="animation-delay:' + (i * .6) + 's">' + esc(j.t) + '</div>';
   }).join('') + '</div>' },

 { h: '<h2>How well do you know us?</h2><div class="card" id="qz"></div>',
   i: function (e) {
     var q = C.quiz, k = 0, sc = 0, box = e.querySelector('#qz');
     function show() {
       if (k >= q.length) { box.innerHTML = '<h2>' + sc + ' / ' + q.length + '</h2><p class="hand xl">' + esc(C.quizResults[Math.min(sc, C.quizResults.length - 1)]) + '</p>'; if (sc === q.length) burst(150); return; }
       var it = q[k];
       box.innerHTML = '<p class="hand sub">Question ' + (k + 1) + ' of ' + q.length + '</p><h3>' + esc(it.q) + '</h3>' + it.o.map(function (o, j) { return '<button class="opt" data-j="' + j + '">' + esc(o) + '</button>'; }).join('');
       var bs = box.querySelectorAll('.opt');
       bs.forEach(function (b) { b.onclick = function () {
         var j = +b.dataset.j; bs.forEach(function (x) { x.disabled = true; });
         if (j === it.a) { sc++; b.classList.add('ok'); } else { b.classList.add('no'); bs[it.a].classList.add('ok'); }
         k++; setTimeout(show, 1100); }; });
     }
     show();
   } },

 { c: 'wallp', h: '<h2>Our video memories 🎬</h2><p class="sub hand">Drag a frame by its border. Tap a video to play it!</p><div class="wall" id="vwall"></div>',
   i: function (e) {
     var w = e.querySelector('#vwall'), W = w.clientWidth, H = w.clientHeight, V = C.videos, cl = W > 760 ? 3 : 2, rows = Math.ceil(V.length / cl), cw = W / cl, ch = H / rows, s = 5, z = 1;
     function r() { s = (s * 9301 + 49297) % 233280; return s / 233280; }
     V.forEach(function (v, i) {
       var pw = Math.max(110, Math.min(cw * (1 + r() * .2), W > 760 ? 240 : 175)), phh = pw * .75 + 52;
       var x = (i % cl) * cw + (cw - pw) / 2 + (r() - .5) * cw * .4, y = Math.floor(i / cl) * ch + (ch - phh) / 2 + (r() - .5) * ch * .4;
       x = Math.max(0, Math.min(W - pw, x)); y = Math.max(0, Math.min(H - phh, y));
       var d = document.createElement('div'); d.className = 'pol vp';
       d.style.cssText = 'width:' + pw + 'px;left:' + x + 'px;top:' + y + 'px;transform:rotate(' + ((r() - .5) * 16) + 'deg)';
       d.innerHTML = '<i class="tp"></i><video controls playsinline preload="metadata" src="' + v.src + '"></video><div class="cap hand">' + esc(v.caption) + '</div>';
       var vd = d.querySelector('video'), sx, sy, ox, oy, dn;
       vd.addEventListener('error', function () { vd.outerHTML = ph(null, i + 1, '🎬'); });
       vd.addEventListener('play', function () { w.querySelectorAll('video').forEach(function (o) { if (o !== vd) o.pause(); }); });
       d.onpointerdown = function (ev) { d.style.zIndex = ++z; if (ev.target.tagName === 'VIDEO') return; dn = 1; sx = ev.clientX; sy = ev.clientY; ox = d.offsetLeft; oy = d.offsetTop; d.setPointerCapture(ev.pointerId); };
       d.onpointermove = function (ev) { if (dn) { d.style.left = (ox + ev.clientX - sx) + 'px'; d.style.top = (oy + ev.clientY - sy) + 'px'; } };
       d.onpointerup = function () { dn = 0; };
       w.appendChild(d);
     });
   } },

 { h: '<h2>Why you’re the best</h2><div class="rs" id="rs"></div><button class="cta" id="rb">Show a reason</button>',
   i: function (e) {
     var k = 0, box = e.querySelector('#rs'), b = e.querySelector('#rb');
     b.onclick = function () {
       var d = document.createElement('div'); d.className = 'rc'; d.textContent = C.reasons[k++]; box.appendChild(d); burst(25, b);
       if (k >= C.reasons.length) { b.textContent = 'That’s all… for now 😉'; b.disabled = true; }
     };
   } },

 { h: '<h2>The last polaroid</h2><p class="sub hand" id="lh"></p><button class="lock" id="lock" disabled aria-label="Final surprise"><span id="lf">🔒<small class="hand">Locked</small></span></button><div id="fin" hidden></div>',
   i: function (e) {
     counts();
     e.querySelector('#lock').onclick = function () {
       opened = true; this.hidden = true; e.querySelector('#lh').textContent = 'For you 💛';
       var f = e.querySelector('#fin'); f.hidden = false;
       f.innerHTML = '<div class="gal">' + C.final.media.map(function (m, i) {
         return '<figure data-v="' + (m.type === 'video' ? 1 : 0) + '"><i class="tp"></i>' + (m.type === 'video' ? '<video controls playsinline preload="metadata" src="' + m.src + '"></video>' : ph(m.src, i + 3, '❤️')) + '<figcaption class="hand">' + esc(m.cap) + '</figcaption></figure>';
       }).join('') + '</div><div class="note hand"><p>' + esc(C.final.text) + '</p></div>';
       f.querySelectorAll('video').forEach(function (v) { v.addEventListener('error', function () { v.outerHTML = '<div class="ph" style="background:#444">🎬 add video</div>'; }); });
       scatter(f.querySelector('.gal'));
       burst(220);
     };
   } },

 { h: '<h2>Make a wish</h2><p class="sub hand">Tap each candle to blow it out</p><div style="margin:1.6rem auto 0"><div class="candles" id="cd"></div><div class="t1"></div><div class="t2"></div></div><p class="wm hand" id="wm" aria-live="polite"></p>',
   i: function (e) {
     var out = 0, n = 5, box = e.querySelector('#cd');
     for (var i = 0; i < n; i++) { var c = document.createElement('button'); c.className = 'candle'; c.setAttribute('aria-label', 'Candle ' + (i + 1) + ', tap to blow out');
       c.onclick = function () { if (this.classList.contains('out')) return; this.classList.add('out'); if (++out === n) { e.querySelector('#wm').textContent = C.wish; burst(260); } };
       box.appendChild(c); }
   } },

 { h: '<h1>' + esc(C.ending) + '</h1><p class="hand xl">' + esc(C.signoff) + '</p><button class="cta" id="rp">Replay from the start</button>',
   i: function (e) { burst(200); e.querySelector('#rp').onclick = function () { go(1); }; } }
];

/* ---------- navigation ---------- */
var stage = $('#stage'), cur = 0;
pages.forEach(function (p) { var s = document.createElement('section'); s.className = 'page' + (p.c ? ' ' + p.c : ''); s.innerHTML = p.h; stage.appendChild(s); p.el = s; });
function nav() {
  $('#nav').hidden = cur === 0; $('#bk').disabled = cur <= 1; $('#nx').disabled = cur === pages.length - 1;
}
function go(n) {
  if (n < 0 || n >= pages.length || n === cur) return;
  var d = n > cur ? 'fw' : 'bk', old = pages[cur].el; old.classList.remove('on', 'fw', 'bk'); cur = n;
  var el = pages[n].el; el.classList.remove('fw', 'bk'); el.classList.add('on'); if (!reduce) el.classList.add(d); el.scrollTop = 0;
  if (!pages[n].d) { pages[n].d = 1; if (pages[n].i) pages[n].i(el); }
  nav();
}
pages[0].el.classList.add('on'); pages[0].d = 1; pages[0].i(pages[0].el); nav();
$('#nx').onclick = function () { go(cur + 1); }; $('#bk').onclick = function () { go(cur - 1); };
stage.addEventListener('click', function (e) { if (e.target.closest('[data-next]')) go(cur + 1); });
addEventListener('keydown', function (e) {
  if ($('#lb').hidden === false) { if (e.key === 'Escape') closeLB(); return; }
  if (cur === 0 || e.target.closest('button,video')) { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; }
  if (e.key === 'ArrowRight' && cur > 0) go(cur + 1); else if (e.key === 'ArrowLeft') go(cur - 1);
});
var tx, ty;
stage.addEventListener('touchstart', function (e) { var t = e.touches[0]; tx = t.clientX; ty = t.clientY; }, { passive: true });
stage.addEventListener('touchend', function (e) {
  if (cur === 0 || e.target.closest('.pol,.wall,video')) return;
  var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
  if (Math.abs(dx) > 60 && Math.abs(dy) < 50) go(dx < 0 ? cur + 1 : cur - 1);
}, { passive: true });

/* ---------- music ---------- */
if (C.music) {
  var au = new Audio(C.music), mu = $('#mu'); au.loop = true; mu.hidden = false;
  mu.onclick = function () { if (au.paused) { au.play(); mu.textContent = '🔊'; } else { au.pause(); mu.textContent = '🎵'; } };
}
})();
