<div align="center">

<!-- BANNER / TITLE SECTION -->

# 🎨 AI Image Editor

### *Transform Your Photos with the Power of Computer Vision*

<br/>

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-6366f1?style=for-the-badge)](https://ai-image-editor-plum.vercel.app/)
[![Backend API](https://img.shields.io/badge/⚙️%20Backend%20API-Render-22c55e?style=for-the-badge)](https://ai-image-editor-backend-p4dh.onrender.com/health)
[![GitHub Repo](https://img.shields.io/badge/📂%20GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Snehashis87/Ai-Image-Editor)

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=flat-square&logo=flask)
![OpenCV](https://img.shields.io/badge/OpenCV-4.x-5C3EE8?style=flat-square&logo=opencv)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=flat-square&logo=render)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

<br/>

> **A production-grade, full-stack image processing application** — upload any photo, apply 20+ professional-grade filters in real time, control intensity with a slider, and instantly download your result.  
> Built and deployed end-to-end by a solo developer using React, Flask, and OpenCV.

</div>

---

## 📌 Table of Contents

| # | Section |
|---|---------|
| 1 | [🌟 What is This Project?](#-what-is-this-project) |
| 2 | [✨ Features at a Glance](#-features-at-a-glance) |
| 3 | [🎯 Filter Library — Every Filter Explained](#-filter-library--every-filter-explained) |
| 4 | [🏗️ System Architecture](#️-system-architecture) |
| 5 | [🛠️ Tech Stack — Deep Dive](#️-tech-stack--deep-dive) |
| 6 | [📂 Project Structure](#-project-structure) |
| 7 | [⚡ Local Setup — Step by Step](#-local-setup--step-by-step) |
| 8 | [🌐 REST API Reference](#-rest-api-reference) |
| 9 | [☁️ Cloud Deployment Guide](#️-cloud-deployment-guide) |
| 10 | [🔐 Security & Best Practices](#-security--best-practices) |
| 11 | [🧠 Concepts Explained for Beginners](#-concepts-explained-for-beginners) |
| 12 | [📈 What I Learned / Interview Talking Points](#-what-i-learned--interview-talking-points) |
| 13 | [🔮 Future Roadmap](#-future-roadmap) |
| 14 | [👨‍💻 Author](#-author) |

---

## 🌟 What is This Project?

**AI Image Editor** is a professional web application that lets users apply computer-vision-powered filters to their photos directly in the browser — no software installation required.

### The problem it solves:
Most image editing tools are either desktop-only (Photoshop, GIMP) or require expensive subscriptions (Adobe Express, Canva Pro). This app provides professional-grade image processing filters — **completely free, on the web, with zero setup for the end user.**

### How it works (in plain English):
1. **User** opens the browser and visits the app
2. **User** uploads a photo (PNG, JPG, JPEG, WEBP, or BMP)
3. **React frontend** sends the image + selected filter to a **Flask API** running in the cloud
4. **OpenCV** (a powerful computer vision library) processes the image with pixel-level precision
5. The processed image is returned instantly, shown in the browser, and ready to download
6. All temporary files are deleted — **no image data is ever stored**

---

## ✨ Features at a Glance

```
✅  20+ Professional Image Filters
✅  Real-Time Filter Preview
✅  Intensity Slider (0–100) for every filter
✅  Drag & Drop Image Upload
✅  Supports PNG, JPG, JPEG, WEBP, BMP
✅  Instant Download of Processed Image
✅  Mobile-Responsive UI
✅  Zero Image Storage (privacy-first)
✅  Cloud-Hosted — Works on any device worldwide
✅  REST API Backend (can be integrated anywhere)
```

---

## 🎯 Filter Library — Every Filter Explained

> Every filter below is implemented using **OpenCV** and **NumPy** at the pixel level. Each can be applied at a custom intensity from 0% (no effect) to 100% (maximum effect).

### 🔦 Enhancement Filters
These filters improve the technical quality of a photo.

| Filter | What it Does | Real-World Use |
|--------|-------------|----------------|
| **Brightness** | Increases or decreases pixel luminance uniformly | Fix dark or overexposed photos |
| **Contrast** | Stretches the gap between dark and light pixels | Make dull images pop |
| **Saturation** | Boosts or reduces color intensity | Make colors more vivid |
| **Sharpen** | Applies a convolution kernel to enhance edges | Fix slightly blurry images |
| **Super Sharpen** | Multi-pass aggressive sharpening | Recover detail from low-res images |
| **Clarity** | Mid-tone contrast enhancement (like Lightroom Clarity) | Add texture and depth |
| **Dehaze** | Reduces atmospheric haze/fog from images | Fix foggy outdoor photos |

### 🎨 Artistic Filters
These transform photos into art styles.

| Filter | What it Does | Real-World Use |
|--------|-------------|----------------|
| **Pencil Sketch** | Converts photo to grayscale pencil drawing using edge detection | Create artistic drawings |
| **Cartoon** | Bilateral filtering + edge detection for animated look | Fun social media content |
| **Watercolor** | Stylized blur + edge-preservation for painting look | Artistic profile pictures |
| **Oil Painting** | Pixelation + texture overlay to simulate brush strokes | Creative portfolio pieces |
| **Comic** | Bold edges + color quantization for comic book style | Illustrated content |

### 🌡️ Color Grading Filters
These change the mood and temperature of an image.

| Filter | What it Does | Real-World Use |
|--------|-------------|----------------|
| **Warm** | Boosts red/yellow tones, reduces blue | Sunset, golden-hour aesthetic |
| **Cool** | Boosts blue/cyan tones, reduces red | Winter, cinematic aesthetic |
| **Sepia** | Converts to brownish monochrome | Old/vintage look |
| **Vintage** | Faded colors + vignette effect | Retro aesthetic |

### 🔬 Advanced Processing
| Filter | What it Does |
|--------|-------------|
| **HDR** | High Dynamic Range simulation using tone-mapping |
| **Edge Enhancement** | Highlights object boundaries using Laplacian gradients |
| **Detail Enhancement** | Increases micro-texture detail using guided filters |
| **Original** | Returns image unchanged (useful for comparison) |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              React + Vite Frontend                    │  │
│  │         (Hosted on Vercel — Global CDN)               │  │
│  │                                                       │  │
│  │  [Upload Area] [Filter Panel] [Intensity Slider]      │  │
│  │       [Preview Window]  [Download Button]             │  │
│  └─────────────────────┬─────────────────────────────────┘  │
└────────────────────────│────────────────────────────────────┘
                         │
                    HTTP POST /apply-filter
                    FormData: { file, filter, intensity }
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    RENDER CLOUD SERVER                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Flask REST API (Gunicorn)                 │  │
│  │                                                       │  │
│  │  ① Validate file type (PNG/JPG/JPEG/WEBP/BMP)        │  │
│  │  ② Validate intensity range (0–100)                   │  │
│  │  ③ Generate UUID filename (prevent collisions)        │  │
│  │  ④ Save to /uploads/                                  │  │
│  │  ⑤ Call filters.py → apply_filter()                  │  │
│  │  ⑥ OpenCV processes pixel data                        │  │
│  │  ⑦ Save result to /processed/                        │  │
│  │  ⑧ Read bytes into memory                             │  │
│  │  ⑨ Delete both temp files immediately                │  │
│  │  ⑩ Return image bytes as HTTP response               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                         │
              Returns: Processed Image (bytes)
                         │
                         ▼
              User sees & downloads filtered image
```

### Why This Architecture?

| Decision | Reason |
|----------|--------|
| **React Frontend** | Component-based, fast re-renders, large ecosystem |
| **Flask Backend** | Lightweight Python server, perfect for ML/CV pipelines |
| **OpenCV** | Industry-standard computer vision library, battle-tested |
| **Separate Frontend/Backend** | Independently scalable, maintainable, and deployable |
| **Vercel for Frontend** | Global CDN, zero-config Vite deployment, automatic HTTPS |
| **Render for Backend** | Supports Python, easy GitHub integration, free tier |
| **UUID Filenames** | Prevents file collision when multiple users upload simultaneously |
| **In-Memory Return + Immediate Deletion** | Zero disk storage, GDPR-friendly, privacy-first |

---

## 🛠️ Tech Stack — Deep Dive

### Frontend

| Technology | Version | Role | Why This Choice |
|------------|---------|------|-----------------|
| **React** | 19 | UI Framework | Industry standard, component-based architecture |
| **Vite** | 6.x | Build Tool | 10x faster than Create React App, native ES modules |
| **Axios** | 1.8 | HTTP Client | Promise-based, cleaner than fetch, interceptors support |
| **JavaScript (ES6+)** | — | Language | Async/Await, Modules, Destructuring |
| **CSS3** | — | Styling | Custom properties, Flexbox, Grid |

### Backend

| Technology | Version | Role | Why This Choice |
|------------|---------|------|-----------------|
| **Python** | 3.11 | Language | Best ecosystem for computer vision and ML |
| **Flask** | 3.x | Web Framework | Lightweight, no ORM overhead, perfect for APIs |
| **flask-cors** | — | CORS Handling | Allows React (different port/domain) to call Flask |
| **OpenCV (headless)** | 4.x | Image Processing | 2500+ computer vision algorithms, C++ performance |
| **NumPy** | — | Matrix Operations | Images are just 3D arrays of pixels; NumPy handles them fast |
| **Pillow** | — | Image I/O | Robust image reading/writing across all formats |
| **Gunicorn** | — | Production Server | WSGI server, handles concurrent requests, Render-compatible |

### Infrastructure

| Platform | Service | Cost |
|----------|---------|------|
| **Vercel** | React Frontend Hosting | Free |
| **Render** | Flask Backend Hosting | Free |
| **GitHub** | Source Control + CI | Free |
| **Total** | Full production deployment | **₹0** |

---

## 📂 Project Structure

```
Ai-Image-Editor/                    ← Root of the repository
│
├── .gitignore                      ← Excludes venv, node_modules, uploads, processed
├── README.md                       ← This file
│
├── backend/                        ← Flask Python Backend
│   ├── app.py                      ← Main Flask application (API routes, file handling)
│   ├── filters.py                  ← All 20+ OpenCV filter implementations
│   ├── requirements.txt            ← Python dependencies
│   ├── uploads/                    ← Temporary upload directory (auto-created, auto-cleaned)
│   └── processed/                  ← Temporary output directory (auto-created, auto-cleaned)
│
└── frontend/                       ← React + Vite Frontend
    ├── src/
    │   ├── App.jsx                 ← Main React component (UI, state, API calls)
    │   └── main.jsx                ← React DOM entry point
    ├── public/
    │   └── vite.svg
    ├── index.html                  ← HTML shell (Vite injects React here)
    ├── vite.config.js              ← Vite configuration
    ├── package.json                ← Node.js dependencies & build scripts
    ├── .env                        ← Local environment variables (not committed)
    └── .gitignore                  ← Excludes node_modules, dist
```

### Key Files Explained

**`backend/app.py`** — The heart of the backend.
- Defines two routes: `GET /health` and `POST /apply-filter`
- Handles file upload, validation, UUID naming, filter dispatch, and response
- Cleans up temp files after every request

**`backend/filters.py`** — The image processing engine.
- Contains one function per filter, all returning a processed image array
- Each filter uses intensity blending: `result = (1 - t) * original + t * filtered` where `t = intensity / 100`

**`frontend/src/App.jsx`** — The entire React UI.
- Manages state: uploaded image, selected filter, intensity, processed image
- Sends `multipart/form-data` POST to Flask backend
- Renders the filter panel, intensity slider, preview, and download button

---

## ⚡ Local Setup — Step by Step

> **Prerequisites:** Python 3.9+, Node.js 18+, Git

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Snehashis87/Ai-Image-Editor.git
cd Ai-Image-Editor
```

### Step 2 — Setup the Backend

```bash
# Navigate to backend
cd backend

# Create a Python virtual environment
# (isolates project dependencies from your system Python)
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt

# Start the Flask development server
python app.py
```

✅ Backend is now running at: `http://localhost:5000`  
✅ Test it: Open `http://localhost:5000/health` → you should see `{"status": "ok"}`

### Step 3 — Setup the Frontend

```bash
# Open a NEW terminal tab/window
cd frontend

# Install Node.js dependencies
npm install

# Create local environment file
# (tells React where the backend is)
echo VITE_API_URL=http://localhost:5000 > .env

# Start the Vite development server
npm run dev
```

✅ Frontend is now running at: `http://localhost:5173`

### Step 4 — Use the Application

1. Open `http://localhost:5173` in your browser
2. Upload any image (drag & drop or click to browse)
3. Select a filter from the panel
4. Adjust intensity using the slider
5. Click **Apply Filter**
6. Preview the result and click **Download**

---

## 🌐 REST API Reference

### Base URLs

| Environment | URL |
|-------------|-----|
| Local Development | `http://localhost:5000` |
| Production (Render) | `https://ai-image-editor-backend-p4dh.onrender.com` |

---

### `GET /health`

Health check endpoint — used by Render to verify the server is alive.

**Request:**
```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

**Status Code:** `200 OK`

---

### `POST /apply-filter`

Main endpoint — accepts an image and filter config, returns processed image.

**Request:**
```http
POST /apply-filter
Content-Type: multipart/form-data
```

**Form Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File (image) | ✅ Yes | The image to process |
| `filter` | String | ✅ Yes | Filter name (see list below) |
| `intensity` | Integer (0–100) | ✅ Yes | Effect strength |

**Valid Filter Names:**

```
original, brightness, contrast, saturation, sharpen, super_sharpen,
clarity, dehaze, warm, cool, sepia, vintage, pencil, cartoon,
watercolor, oil_painting, comic, hdr, edge_enhance, detail_enhance
```

**Success Response:**
```http
HTTP/1.1 200 OK
Content-Type: image/jpeg

[Binary image data]
```

**Error Responses:**

| Scenario | Status | Response |
|----------|--------|----------|
| No file provided | `400` | `{"error": "No file uploaded"}` |
| Invalid file type | `400` | `{"error": "File type not allowed. Use PNG, JPG, JPEG, WEBP or BMP"}` |
| Invalid intensity | `400` | `{"error": "Intensity must be a whole number between 0 and 100"}` |
| Processing failure | `500` | `{"error": "Failed to process image"}` |

**Example (using cURL):**
```bash
curl -X POST https://ai-image-editor-backend-p4dh.onrender.com/apply-filter \
  -F "file=@photo.jpg" \
  -F "filter=cartoon" \
  -F "intensity=80" \
  --output result.jpg
```

**Example (using JavaScript fetch):**
```javascript
const formData = new FormData();
formData.append("file", imageFile);
formData.append("filter", "sepia");
formData.append("intensity", 75);

const response = await fetch(`${API_URL}/apply-filter`, {
  method: "POST",
  body: formData,
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);
```

---

## ☁️ Cloud Deployment Guide

### Backend → Render

Render hosts the Flask API. Here's exactly how it's configured:

| Setting | Value |
|---------|-------|
| **Service Type** | Web Service |
| **Runtime** | Python 3 |
| **Root Directory** | `backend` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app` |
| **Instance Type** | Free |
| **Health Check Path** | `/health` |

> **Why Gunicorn?**  
> Flask's built-in server (`python app.py`) is single-threaded and not suitable for production. Gunicorn is a WSGI server that spawns multiple worker processes, handles concurrent requests, and is battle-tested in production.

> **Why `opencv-python-headless`?**  
> The regular `opencv-python` package includes GUI libraries (for displaying windows). On a headless server (no monitor, no GUI), these cause import errors. The `headless` variant is lighter and server-compatible.

---

### Frontend → Vercel

Vercel hosts the React app. Here's the configuration:

| Setting | Value |
|---------|-------|
| **Framework** | Vite (auto-detected) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Environment Variable** | `VITE_API_URL = https://ai-image-editor-backend-p4dh.onrender.com` |

> **Why Environment Variables?**  
> The backend URL changes between local development and production. Using `import.meta.env.VITE_API_URL` lets us configure this once in Vercel's dashboard without touching code.

---

### How Frontend Finds the Backend

```javascript
// In App.jsx
const API_URL = import.meta.env.VITE_API_URL;

// Local:  http://localhost:5000
// Vercel: https://ai-image-editor-backend-p4dh.onrender.com
```

```env
# frontend/.env (local, not committed to GitHub)
VITE_API_URL=http://localhost:5000

# Vercel Dashboard Environment Variable
VITE_API_URL=https://ai-image-editor-backend-p4dh.onrender.com
```

---

## 🔐 Security & Best Practices

This project follows several important security and engineering practices:

| Practice | Implementation | Why It Matters |
|----------|---------------|----------------|
| **File Type Validation** | `allowed_file()` checks extension against whitelist | Prevents malicious file uploads (e.g. `.exe`, `.php`) |
| **UUID Filenames** | `uuid.uuid4().hex` generates random filename | Prevents filename collision in concurrent requests and path traversal attacks |
| **Input Clamping** | `max(0, min(100, intensity))` | Prevents out-of-bound values from crashing OpenCV operations |
| **Immediate File Cleanup** | `os.remove()` after every request | No user images ever persist on the server (privacy-first) |
| **In-Memory Response** | Image bytes loaded to RAM before sending | Eliminates race conditions between send and delete |
| **No Debug Mode in Production** | Gunicorn handles serving (ignores `debug=True`) | Prevents Flask debugger from being exposed publicly |
| **CORS Configuration** | `flask-cors` allows Vercel frontend to call Render backend | Without this, browsers block cross-origin API calls |
| **Environment Variables** | API URL via `VITE_API_URL`, not hardcoded | No secrets in source code; easy config per environment |

---

## 🧠 Concepts Explained for Beginners

> New to web development or computer vision? Here's everything you need to know to understand this project.

### What is a REST API?
A **REST API** is a way for two applications to talk to each other over HTTP.  
In this project: **React (frontend) sends requests → Flask (backend) processes and responds.**

```
Frontend says:  "Here's a photo, apply cartoon filter at 80% intensity"
Backend says:   "Done — here's your processed image"
```

### What is Flask?
**Flask** is a Python web framework. It lets you create URL routes that respond to HTTP requests.

```python
@app.route("/apply-filter", methods=["POST"])
def filter_image():
    # This function runs every time someone POSTs to /apply-filter
    ...
```

### What is OpenCV?
**OpenCV (Open Source Computer Vision)** is a library that can manipulate images at the pixel level.  
An image is just a 3D NumPy array: `[height][width][BGR channels]`.  
OpenCV lets you do things like blur, sharpen, detect edges, and change colors — extremely fast.

### What is React?
**React** is a JavaScript library for building user interfaces.  
Instead of manually updating the HTML when data changes, React re-renders only the parts of the UI that changed. This makes complex UIs much easier to build and maintain.

### What is Vite?
**Vite** is a build tool that makes React development fast.  
- `npm run dev` → starts a hot-reloading dev server (changes appear instantly without refresh)
- `npm run build` → creates an optimized production bundle for deployment

### What is CORS?
**CORS (Cross-Origin Resource Sharing)** is a browser security rule.  
When your frontend (on `vercel.app`) calls your backend (on `render.com`), the browser blocks the request because they're on different domains. `flask-cors` tells the browser: "This API allows cross-origin requests — it's safe."

### What is Gunicorn?
**Gunicorn** is a production-grade WSGI server.  
`python app.py` (Flask's built-in server) handles ONE request at a time.  
Gunicorn spawns multiple workers and handles many concurrent requests — essential for production.

### What is a UUID?
**UUID (Universally Unique Identifier)** is a 128-bit random ID.  
Example: `f47ac10b-58cc-4372-a567-0e02b2c3d479`  
We use it for filenames so that when 100 users upload a photo called `photo.jpg` at the same time, each file gets a unique name and they don't overwrite each other.

---

## 📈 What I Learned / Interview Talking Points

When asked about this project in interviews, here's what to highlight:

### Technical Highlights
- **REST API design** with proper HTTP status codes (200, 400, 500)
- **File handling** in Flask — multipart/form-data, saving, reading, and deleting files
- **OpenCV image processing** — convolution kernels, color space conversions (BGR↔HSV), bilateral filtering
- **Environment-based configuration** using `.env` files and `import.meta.env`
- **Production deployment** on Render (Gunicorn) + Vercel (CDN)
- **Cross-origin communication** and CORS configuration

### Architecture Decisions You Can Explain
- **Why separate frontend and backend?** → Independent scaling, different tech stacks, cleaner separation of concerns
- **Why headless OpenCV?** → Server environments have no GUI; headless removes those dependencies
- **Why UUID filenames?** → Concurrency safety and security (no filename-based path traversal)
- **Why delete files immediately?** → Privacy compliance (no user data retained), prevents disk bloat

### Metrics You Can Quote
- **20+ image filters** implemented in Python
- **5 supported image formats** (PNG, JPG, JPEG, WEBP, BMP)
- **0 bytes** of user image data stored after processing
- **Full-stack deployment** on two cloud platforms at zero cost

---

## 🔮 Future Roadmap

| Feature | Priority | Complexity |
|---------|----------|------------|
| Before/After comparison slider | High | Medium |
| AI background removal (rembg library) | High | Medium |
| Face detection + enhancement | Medium | High |
| Batch image processing (multiple files) | Medium | Medium |
| Cloud image storage (AWS S3 or Cloudinary) | Low | Medium |
| User authentication (JWT) | Low | High |
| Image processing history | Low | High |
| PWA (Progressive Web App) support | Low | Low |
| Dark/Light mode toggle | Low | Low |

---

## 👨‍💻 Author

<div align="center">

### Snehashis Mandal

*B.Tech Student · Full-Stack Developer · Computer Vision Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-Snehashis87-181717?style=for-the-badge&logo=github)](https://github.com/Snehashis87)

</div>

---

<div align="center">

## ⭐ Support This Project

If this project helped you learn something new, gave you inspiration, or you just liked it —  
**please give it a star on GitHub.** It takes one second and means a lot.

[![Star this repo](https://img.shields.io/github/stars/Snehashis87/Ai-Image-Editor?style=social)](https://github.com/Snehashis87/Ai-Image-Editor)

---

*Made with 🧠 OpenCV · ⚛️ React · 🐍 Flask · ☁️ Vercel & Render*

</div>