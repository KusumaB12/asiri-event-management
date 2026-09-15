import cv2
import numpy as np
import os
from PIL import Image

def generate_svg_and_png():
    src = "d:/Asiri Website/assets/asiri-clean-logotype.png"
    arr = cv2.imread(src, cv2.IMREAD_UNCHANGED)
    h, w = arr.shape[:2]

    alpha = arr[:, :, 3]
    gray = cv2.cvtColor(arr[:, :, :3], cv2.COLOR_BGR2GRAY)
    mask = np.where((alpha > 40) & (gray > 25), 255, 0).astype(np.uint8)

    # Smooth the mask to eliminate pixelation
    blurred = cv2.medianBlur(mask, 3)

    # Find contours
    contours, hierarchy = cv2.findContours(blurred, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

    path_data = []
    for cnt in contours:
        if cv2.contourArea(cnt) < 15:
            continue
        epsilon = 0.001 * cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        pts = approx.reshape(-1, 2)
        if len(pts) < 3:
            continue
        p_str = f"M {pts[0][0]} {pts[0][1]} "
        for p in pts[1:]:
            p_str += f"L {p[0]} {p[1]} "
        p_str += "Z"
        path_data.append(p_str)

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="asiriGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff7d6" />
      <stop offset="20%" stop-color="#fae087" />
      <stop offset="50%" stop-color="#f2ca50" />
      <stop offset="80%" stop-color="#d4a524" />
      <stop offset="100%" stop-color="#a67c13" />
    </linearGradient>
    <filter id="crispShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.9" />
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#f2ca50" flood-opacity="0.35" />
    </filter>
  </defs>
  <g fill="url(#asiriGoldGrad)" fill-rule="evenodd" filter="url(#crispShadow)">
    <path d="{' '.join(path_data)}" />
  </g>
</svg>"""

    out_dirs = [
        "d:/Asiri Website/assets",
        "d:/Asiri Website/asiri-user-portal/assets",
        "d:/Asiri Website/asiri-staff-portal/assets"
    ]

    for folder in out_dirs:
        os.makedirs(folder, exist_ok=True)
        svg_path = os.path.join(folder, "asiri-clean-logotype.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"Generated SVG: {svg_path}")

    # Render ultra-sharp 4K PNG using vectorized numpy broadcasting
    scale = 2
    sw, sh = w * scale, h * scale
    high_mask = cv2.resize(blurred, (sw, sh), interpolation=cv2.INTER_CUBIC)
    _, high_mask = cv2.threshold(high_mask, 127, 255, cv2.THRESH_BINARY)
    high_alpha = cv2.GaussianBlur(high_mask, (3, 3), 0.8)

    # Vectorized gradient meshgrid
    Y, X = np.ogrid[:sh, :sw]
    T = (X + Y) / float(sw + sh)

    c0 = np.array([255, 247, 214], dtype=np.float32)
    c1 = np.array([250, 224, 135], dtype=np.float32)
    c2 = np.array([242, 202, 80], dtype=np.float32)
    c3 = np.array([212, 165, 36], dtype=np.float32)
    c4 = np.array([166, 124, 19], dtype=np.float32)

    grad = np.zeros((sh, sw, 3), dtype=np.uint8)

    m1 = T < 0.25
    f1 = T / 0.25
    for i in range(3):
        grad[:, :, i] = np.where(m1, c0[i] * (1 - f1) + c1[i] * f1, 0)

    m2 = (T >= 0.25) & (T < 0.5)
    f2 = (T - 0.25) / 0.25
    for i in range(3):
        grad[:, :, i] += np.where(m2, c1[i] * (1 - f2) + c2[i] * f2, 0).astype(np.uint8)

    m3 = (T >= 0.5) & (T < 0.75)
    f3 = (T - 0.5) / 0.25
    for i in range(3):
        grad[:, :, i] += np.where(m3, c2[i] * (1 - f3) + c3[i] * f3, 0).astype(np.uint8)

    m4 = T >= 0.75
    f4 = (T - 0.75) / 0.25
    for i in range(3):
        grad[:, :, i] += np.where(m4, c3[i] * (1 - f4) + c4[i] * f4, 0).astype(np.uint8)

    rgba = np.dstack([grad, high_alpha])
    rgba_pil = Image.fromarray(rgba)

    for folder in out_dirs:
        png_path = os.path.join(folder, "asiri-clean-logotype.png")
        rgba_pil.save(png_path, "PNG", optimize=True)
        print(f"Generated 4K Crisp PNG: {png_path}")

if __name__ == "__main__":
    generate_svg_and_png()
