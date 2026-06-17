import cv2
import numpy as np


def apply_filter(input_path, output_path, filter_type, intensity=100):
    """
    Apply a filter to an image.
    intensity: 0-100, controls blend between original and filtered image.
    """
    try:
        image = cv2.imread(input_path)

        if image is None:
            print(f"ERROR: Could not read image from {input_path}")
            return False

        alpha = intensity / 100.0  # blend factor

        filtered = _run_filter(image, filter_type)

        if filtered is None:
            print(f"WARNING: Unknown filter '{filter_type}', saving original.")
            filtered = image

        # Ensure filtered has same shape as original for blending
        if filtered.shape != image.shape:
            # e.g. grayscale -> convert back to BGR for blending
            if len(filtered.shape) == 2:
                filtered = cv2.cvtColor(filtered, cv2.COLOR_GRAY2BGR)

        # Blend original + filtered based on intensity
        if alpha < 1.0:
            result = cv2.addWeighted(image, 1.0 - alpha, filtered, alpha, 0)
        else:
            result = filtered

        cv2.imwrite(output_path, result)
        print(f"Filter '{filter_type}' applied at {intensity}% intensity -> {output_path}")
        return True

    except Exception as e:
        print(f"ERROR in filter processing: {str(e)}")
        return False


def _run_filter(image, filter_type):
    """Route to the correct filter function."""

    # ── ADJUSTMENTS ──────────────────────────────────────────────────────────
    if filter_type == "sharpen":
        return _sharpen(image)

    elif filter_type == "super_sharpen":
        return _super_sharpen(image)

    elif filter_type == "clarity":
        return _clarity(image)

    elif filter_type == "brightness":
        return _brightness(image, beta=60)

    elif filter_type == "contrast":
        return _contrast(image, alpha=1.5)

    elif filter_type == "saturation":
        return _saturation(image, scale=1.8)

    elif filter_type == "warm":
        return _warm(image)

    elif filter_type == "cool":
        return _cool(image)

    elif filter_type == "dehaze":
        return _dehaze(image)

    # ── ARTISTIC ─────────────────────────────────────────────────────────────
    elif filter_type == "pencil":
        _, sketch = cv2.pencilSketch(image, sigma_s=60, sigma_r=0.07, shade_factor=0.05)
        return sketch

    elif filter_type == "pencil_color":
        return _pencil_color(image)

    elif filter_type == "cartoon":
        return _cartoon(image)

    elif filter_type == "watercolor":
        return cv2.stylization(image, sigma_s=60, sigma_r=0.6)

    elif filter_type == "oil_painting":
        return _oil_painting(image)

    elif filter_type == "emboss":
        return _emboss(image)

    elif filter_type == "comic":
        return _comic(image)

    elif filter_type == "vintage":
        return _vintage(image)

    elif filter_type == "sepia":
        return _sepia(image)

    # ── EFFECTS ──────────────────────────────────────────────────────────────
    elif filter_type == "edge":
        edges = cv2.Canny(image, 80, 180)
        return cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)

    elif filter_type == "invert":
        return cv2.bitwise_not(image)

    elif filter_type == "grayscale":
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        return cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)

    elif filter_type == "vignette":
        return _vignette(image)

    elif filter_type == "hdr":
        return _hdr(image)

    elif filter_type == "blur":
        return cv2.GaussianBlur(image, (21, 21), 0)

    elif filter_type == "pixelate":
        return _pixelate(image, pixel_size=12)

    elif filter_type == "night_vision":
        return _night_vision(image)

    elif filter_type == "glitch":
        return _glitch(image)

    else:
        return image  # original fallback


# ── FILTER IMPLEMENTATIONS ────────────────────────────────────────────────────

def _sharpen(image):
    kernel = np.array([
        [ 0, -1,  0],
        [-1,  5, -1],
        [ 0, -1,  0]
    ], dtype=np.float32)
    return cv2.filter2D(image, -1, kernel)


def _super_sharpen(image):
    kernel = np.array([
        [-1, -1, -1],
        [-1,  9, -1],
        [-1, -1, -1]
    ], dtype=np.float32)
    sharpened = cv2.filter2D(image, -1, kernel)
    return np.clip(sharpened, 0, 255).astype(np.uint8)


def _clarity(image):
    """Local contrast enhancement via unsharp mask on luminance."""
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    blur = cv2.GaussianBlur(l, (0, 0), 3)
    l_sharp = cv2.addWeighted(l, 1.5, blur, -0.5, 0)
    merged = cv2.merge([l_sharp, a, b])
    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)


def _brightness(image, beta=60):
    return cv2.convertScaleAbs(image, alpha=1.0, beta=beta)


def _contrast(image, alpha=1.5):
    return cv2.convertScaleAbs(image, alpha=alpha, beta=0)


def _saturation(image, scale=1.8):
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * scale, 0, 255)
    return cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)


def _warm(image):
    """Shift reds/yellows up, blues down."""
    result = image.copy().astype(np.float32)
    result[:, :, 2] = np.clip(result[:, :, 2] * 1.15, 0, 255)  # R up
    result[:, :, 1] = np.clip(result[:, :, 1] * 1.05, 0, 255)  # G slight up
    result[:, :, 0] = np.clip(result[:, :, 0] * 0.85, 0, 255)  # B down
    return result.astype(np.uint8)


def _cool(image):
    """Shift blues up, reds down."""
    result = image.copy().astype(np.float32)
    result[:, :, 2] = np.clip(result[:, :, 2] * 0.85, 0, 255)  # R down
    result[:, :, 1] = np.clip(result[:, :, 1] * 1.05, 0, 255)  # G slight up
    result[:, :, 0] = np.clip(result[:, :, 0] * 1.20, 0, 255)  # B up
    return result.astype(np.uint8)


def _dehaze(image):
    """Simple dehazing via CLAHE on LAB lightness channel."""
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    l_eq = clahe.apply(l)
    merged = cv2.merge([l_eq, a, b])
    return cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)


def _pencil_color(image):
    _, color_sketch = cv2.pencilSketch(image, sigma_s=60, sigma_r=0.07, shade_factor=0.05)
    return color_sketch


def _cartoon(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray_blur = cv2.medianBlur(gray, 5)
    edges = cv2.adaptiveThreshold(
        gray_blur, 255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY, 9, 9
    )
    color = cv2.bilateralFilter(image, 9, 300, 300)
    cartoon = cv2.bitwise_and(color, color, mask=edges)
    return cartoon


def _oil_painting(image):
    """Simulated oil painting via stylization + saturation boost."""
    stylized = cv2.stylization(image, sigma_s=150, sigma_r=0.45)
    return _saturation(stylized, scale=1.4)


def _emboss(image):
    kernel = np.array([
        [-2, -1,  0],
        [-1,  1,  1],
        [ 0,  1,  2]
    ], dtype=np.float32)
    embossed = cv2.filter2D(image, -1, kernel) + 128
    return np.clip(embossed, 0, 255).astype(np.uint8)


def _comic(image):
    """High-contrast cartoon with strong edges."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    edges_bgr = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
    color = cv2.bilateralFilter(image, 5, 150, 150)
    # Quantize colors to flat blocks
    color = (color // 64) * 64
    # Darken edge areas
    mask = edges_bgr.astype(np.float32) / 255.0
    result = color.astype(np.float32) * (1 - mask * 0.8)
    return np.clip(result, 0, 255).astype(np.uint8)


def _vintage(image):
    """Faded, slightly warm with a slight green channel dip."""
    result = image.copy().astype(np.float32)
    result[:, :, 2] = np.clip(result[:, :, 2] * 1.1 + 20, 0, 255)
    result[:, :, 1] = np.clip(result[:, :, 1] * 0.9 + 10, 0, 255)
    result[:, :, 0] = np.clip(result[:, :, 0] * 0.8, 0, 255)
    # Add slight fade (lift shadows)
    result = result * 0.85 + 30
    return np.clip(result, 0, 255).astype(np.uint8)


def _sepia(image):
    sepia_filter = np.array([
        [0.272, 0.534, 0.131],
        [0.349, 0.686, 0.168],
        [0.393, 0.769, 0.189]
    ])
    sepia_img = cv2.transform(image, sepia_filter)
    return np.clip(sepia_img, 0, 255).astype(np.uint8)


def _vignette(image):
    rows, cols = image.shape[:2]
    sigma = min(rows, cols) * 0.5
    kernel_x = cv2.getGaussianKernel(cols, sigma)
    kernel_y = cv2.getGaussianKernel(rows, sigma)
    mask = kernel_y * kernel_x.T
    mask = mask / mask.max()
    result = image.copy().astype(np.float32)
    for i in range(3):
        result[:, :, i] = result[:, :, i] * mask
    return np.clip(result, 0, 255).astype(np.uint8)


def _hdr(image):
    """Simulate HDR via tone mapping + saturation + local contrast."""
    # Convert to float
    img_float = image.astype(np.float32) / 255.0
    # Tone mapping: reinhard
    tonemap = cv2.createTonemapReinhard(gamma=1.5, intensity=0, light_adapt=0.8, color_adapt=0.0)
    hdr = tonemap.process(img_float)
    hdr = np.clip(hdr * 255, 0, 255).astype(np.uint8)
    return _saturation(hdr, scale=1.3)


def _pixelate(image, pixel_size=12):
    h, w = image.shape[:2]
    small = cv2.resize(image, (w // pixel_size, h // pixel_size), interpolation=cv2.INTER_LINEAR)
    return cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)


def _night_vision(image):
    """Green-tinted high-contrast monochrome effect."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    gray_eq = clahe.apply(gray)
    # Add noise
    noise = np.random.normal(0, 8, gray_eq.shape).astype(np.int16)
    gray_noisy = np.clip(gray_eq.astype(np.int16) + noise, 0, 255).astype(np.uint8)
    # Green channel
    result = np.zeros((*gray_noisy.shape, 3), dtype=np.uint8)
    result[:, :, 1] = gray_noisy
    return result


def _glitch(image):
    """RGB channel shift for a glitch/chromatic aberration effect."""
    result = image.copy()
    shift = 8
    h, w = image.shape[:2]
    # Shift red channel right
    result[:, shift:, 2] = image[:, :w - shift, 2]
    # Shift blue channel left
    result[:, :w - shift, 0] = image[:, shift:, 0]
    return result