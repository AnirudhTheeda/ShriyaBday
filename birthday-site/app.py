"""Streamlit wrapper: serves the birthday website (site/) as a full-screen page.

Run locally:   python -m streamlit run app.py
Deploy:        push this folder to GitHub, then create the app on share.streamlit.io
"""
import base64
import mimetypes
import re
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).parent / "site"
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov", ".mp3", ".m4a"}

st.set_page_config(page_title="Happy Birthday!", page_icon="🎁", layout="wide",
                   initial_sidebar_state="collapsed")

# Make the website fill the whole screen (hide Streamlit's own chrome)
st.markdown(
    """
    <style>
    #MainMenu, header, footer, [data-testid="stToolbar"] {visibility:hidden; height:0}
    .block-container {padding:0 !important; max-width:100% !important}
    iframe {height:100dvh !important; width:100% !important; border:0}
    </style>
    """,
    unsafe_allow_html=True,
)


def files_signature():
    """Changes whenever any site file is added, removed or edited (so new photos show up)."""
    return tuple((str(f), f.stat().st_mtime_ns, f.stat().st_size)
                 for f in sorted(ROOT.rglob("*")) if f.is_file())


def find_file(path: Path):
    """Exact file, or a file with the same name but another extension/case (1.jpg -> 1.png)."""
    if path.is_file():
        return path
    if path.parent.is_dir():
        for f in sorted(path.parent.iterdir()):
            if f.is_file() and f.stem.lower() == path.stem.lower() and f.suffix.lower() in EXTS:
                return f
    return None


@st.cache_data(show_spinner=False)
def build_page(_signature) -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    # Streamlit shows the page inside an iframe, so inline the JS files
    for name in ("config.js", "app.js"):
        js = (ROOT / name).read_text(encoding="utf-8")
        html = html.replace(f'<script src="{name}"></script>', f"<script>{js}</script>")

    # ...and inline every photo, video and song as base64 so paths always work
    def inline(match: re.Match) -> str:
        found = find_file(ROOT / match.group(0))
        if found is None:
            return match.group(0)
        mime = mimetypes.guess_type(found.name)[0] or "application/octet-stream"
        return f"data:{mime};base64," + base64.b64encode(found.read_bytes()).decode()

    return re.sub(r"assets/[\w\-./]+\.(?:jpe?g|png|webp|gif|mp4|webm|mov|mp3|m4a)",
                  inline, html, flags=re.IGNORECASE)


components.html(build_page(files_signature()), height=800, scrolling=False)
