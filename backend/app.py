from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import uuid
import io
from filters import apply_filter

MIME_TYPES = {
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "webp": "image/webp",
    "bmp": "image/bmp",
}

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
PROCESSED_FOLDER = "processed"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "bmp"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/apply-filter", methods=["POST"])
def filter_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filter_type = request.form.get("filter", "original")

    try:
        intensity = int(request.form.get("intensity", 100))
    except (TypeError, ValueError):
        return jsonify({"error": "Intensity must be a whole number between 0 and 100"}), 400

    intensity = max(0, min(100, intensity))  # clamp 0-100

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed. Use PNG, JPG, JPEG, WEBP or BMP"}), 400

    # Use unique name to avoid collisions in concurrent requests
    ext = file.filename.rsplit(".", 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}.{ext}"

    input_path = os.path.join(UPLOAD_FOLDER, unique_name)
    output_path = os.path.join(PROCESSED_FOLDER, unique_name)

    file.save(input_path)

    success = apply_filter(input_path, output_path, filter_type, intensity)

    # Clean up upload after processing
    try:
        os.remove(input_path)
    except Exception:
        pass

    if not success:
        try:
            os.remove(output_path)
        except Exception:
            pass
        return jsonify({"error": "Failed to process image"}), 500

    # Read processed bytes into memory, then delete the file immediately.
    # (Relying on send_file + call_on_close to clean up is not reliable
    # across all WSGI servers/proxies, so we avoid disk lingering entirely.)
    try:
        with open(output_path, "rb") as f:
            image_bytes = f.read()
    finally:
        try:
            os.remove(output_path)
        except Exception:
            pass

    mimetype = MIME_TYPES.get(ext, "application/octet-stream")

    return send_file(
        io.BytesIO(image_bytes),
        mimetype=mimetype,
        as_attachment=False,
        download_name=f"filtered.{ext}",
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)