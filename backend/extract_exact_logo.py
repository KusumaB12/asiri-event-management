import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import os
import base64
from io import BytesIO

def process_exact_logo():
    src = "d:/Asiri Website/assets/asiri-brand-logo.png"
    arr = cv2.imread(src, cv2.IMREAD_UNCHANGED)

    # In asiri-brand-logo.png, extract the central logo perfectly matching Image 1
    ymin, ymax = 145, 595
    xmin, xmax = 85, 655

    crop = arr[ymin:ymax, xmin:xmax]
    b, g, r, a = cv2.split(crop)

    diff_rg = np.maximum(r.astype(np.float32), g.astype(np.float32)) - b.astype(np.float32)
    intensity = (0.299 * r + 0.587 * g + 0.114 * b).astype(np.float32)

    # Clean alpha transparency
    alpha_clean = np.clip((diff_rg - 8) * 5.0, 0, 255)
    flare_mask = np.clip((intensity - 120) * 3.0, 0, 255)
    alpha_final = np.maximum(alpha_clean, flare_mask).astype(np.uint8)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
    alpha_final = cv2.morphologyEx(alpha_final, cv2.MORPH_OPEN, kernel)

    # Color boost
    rgb = crop[:, :, :3].astype(np.float32)
    rgb[:, :, 0] = np.clip(rgb[:, :, 0] * 0.9, 0, 255)
    rgb[:, :, 1] = np.clip(rgb[:, :, 1] * 1.08, 0, 255)
    rgb[:, :, 2] = np.clip(rgb[:, :, 2] * 1.15, 0, 255)
    rgb_final = rgb.astype(np.uint8)

    rgba = np.dstack([rgb_final, alpha_final])

    pil_img = Image.fromarray(cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA))

    bbox = pil_img.getbbox()
    if bbox:
        pil_img = pil_img.crop(bbox)

    # Enhance contrast & sharpness
    r_ch, g_ch, b_ch, a_ch = pil_img.split()
    rgb_pil = Image.merge("RGB", (r_ch, g_ch, b_ch))
    sharpener = ImageEnhance.Sharpness(rgb_pil)
    rgb_sharp = sharpener.enhance(1.4)
    contrast = ImageEnhance.Contrast(rgb_sharp)
    rgb_sharp = contrast.enhance(1.1)

    final_img = Image.merge("RGBA", (*rgb_sharp.split(), a_ch))

    out_dirs = [
        "d:/Asiri Website/assets",
        "d:/Asiri Website/asiri-user-portal/assets",
        "d:/Asiri Website/asiri-staff-portal/assets"
    ]

    for d in out_dirs:
        os.makedirs(d, exist_ok=True)
        png_path = os.path.join(d, "asiri-clean-logotype.png")
        final_img.save(png_path, "PNG", optimize=True)
        print(f"Saved exact font PNG: {png_path} (Size: {final_img.size})")

    # SVG with crisp rendering
    w_f, h_f = final_img.size
    buffered = BytesIO()
    final_img.save(buffered, format="PNG")
    img_b64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {w_f} {h_f}" width="100%" height="100%">
  <defs>
    <filter id="goldCrispGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.85" />
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#f2ca50" flood-opacity="0.35" />
    </filter>
  </defs>
  <image href="data:image/png;base64,{img_b64}" x="0" y="0" width="{w_f}" height="{h_f}" filter="url(#goldCrispGlow)" />
</svg>"""

    for d in out_dirs:
        svg_path = os.path.join(d, "asiri-clean-logotype.svg")
        with open(svg_path, "w", encoding="utf-8") as f:
            f.write(svg_content)
        print(f"Saved exact font SVG: {svg_path}")

if __name__ == "__main__":
    process_exact_logo()
