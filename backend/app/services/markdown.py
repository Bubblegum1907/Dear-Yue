import markdown as md
import math
import re

def render_markdown(text: str) -> str:
    if not text:
        return ""
    return md.markdown(
        text,
        extensions=["fenced_code", "codehilite"]
    )

def estimate_read_time(text: str) -> int:
    if not text:
        return 1
    words = len(re.findall(r"\w+", text))
    return max(1, math.ceil(words / 200))  # 200 words per minute
