"""Streamlit wrapper: serves the birthday website (site/) as a full-screen page.

Run locally:   streamlit run app.py
Deploy:        push this folder to GitHub, then create the app on share.streamlit.io
"""
import base64
import mimetypes
import re
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).parent / "site"

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


@st.cache_data(show_spinner=False)
def build_page() -> str:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    # Streamlit shows the page inside an iframe, so inline the JS files
    for name in ("config.js", "app.js"):
        js = (ROOT / name).read_text(encoding="utf-8")
        html = html.replace(f'<script src="{name}"></script>', f"<script>{js}</script>")

    # ...and inline every photo, video and song as base64 so paths always work
    def inline(match: re.Match) -> str:
        path = ROOT / match.group(0)
        if not path.is_file():
            return match.group(0)
        mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()

    return re.sub(r"assets/[\w\-./]+\.(?:jpe?g|png|webp|gif|mp4|webm|mov|mp3|m4a)",
                  inline, html, flags=re.IGNORECASE)


components.html(build_page(), height=800, scrolling=False)
