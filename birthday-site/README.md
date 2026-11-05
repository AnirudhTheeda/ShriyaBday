# 🎁 Birthday Scrapbook Website

A page-by-page birthday surprise: gift → welcome → letter → messy memory wall →
friendship timeline → inside jokes → quiz → video memories wall → reasons →
locked polaroid (photos + videos) → cake → final page.

```
birthday-site/
├── app.py              # Streamlit wrapper (for Streamlit hosting)
├── requirements.txt
├── .streamlit/config.toml
└── site/
    ├── index.html      # layout + styles
    ├── config.js       # ✏️ ALL your texts and photo paths live here
    ├── app.js          # logic (no need to edit)
    └── assets/
        ├── photos/     # 1.jpg … 10.jpg, t1.jpg … t4.jpg, f1.jpg, f2.jpg
        ├── videos/     # 1.mp4 … 6.mp4 (video wall), v1.mp4 (last polaroid)
        └── music/      # optional song.mp3
```

## 1. Personalize
1. Open `site/config.js` and change the name, letter, captions, messages, quiz, etc.
2. Drop your photos into `site/assets/photos/`. Either use the default names
   (`1.jpg`, `2.jpg`, …) or change the paths in `config.js`. **No spaces in file names.**
3. Missing files show a colorful placeholder, so you can add photos gradually.
4. To add more memories, copy a line in the `memories` list.

**Keep files small** (the whole site is sent to the phone at once):
- Photos: resize to about 1000 px wide (roughly 150-300 KB each).
- Videos: 10-20 seconds, 720p or lower, `.mp4`. Total of all assets: ideally under 20 MB.
- Compress with squoosh.app (photos) or HandBrake (videos).

## 2. Run locally in VS Code

**Option A: plain HTML (easiest, no Python needed)**
1. Install the **Live Server** extension in VS Code.
2. Right-click `site/index.html` → **Open with Live Server**.

(Or in the terminal: `cd site && python -m http.server 8000` then open http://localhost:8000)

**Option B: with Streamlit (same as the hosted version)**
```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

## 3. Host on Streamlit Community Cloud
1. Create a GitHub repo and upload everything in this folder
   (`app.py`, `requirements.txt`, `.streamlit/`, `site/` with your assets).
   ```bash
   git init && git add . && git commit -m "birthday site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/birthday-site.git
   git push -u origin main
   ```
2. Go to https://share.streamlit.io, sign in with GitHub, click **Create app**.
3. Pick your repo, branch `main`, main file `app.py`, then **Deploy**.
4. Send the link to your friend (best opened on a phone). 🎉

Note: GitHub limits single files to 100 MB. Keep videos small and your repo public or private
(Streamlit can deploy both).

## Tips
- Streamlit apps on the free tier can "sleep" if nobody visits for a while. Open the link
  yourself a few minutes before sending it.
- Music can't autoplay on phones; the 🎵 button (top-right) starts it.
- Arrow keys, swipe, and the Next/Back buttons all turn pages.
