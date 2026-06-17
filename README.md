# 🎨 AI Image Editor

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/Flask-Backend-black?logo=flask" />
  <img src="https://img.shields.io/badge/OpenCV-Image%20Processing-green?logo=opencv" />
  <img src="https://img.shields.io/badge/Vite-Fast%20Frontend-purple?logo=vite" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" />
</p>

<p align="center">
  <b>Professional Web-Based Image Processing Application</b><br>
  Built with React, Flask and OpenCV for real-time photo enhancement and artistic image transformation.
</p>

---

## 🚀 Overview

AI Image Editor is a full-stack image processing web application that allows users to upload images, apply professional-grade enhancement filters, adjust filter intensity, preview results instantly, and download processed images.

The project combines the power of **React** for a responsive user interface, **Flask** for backend API services, and **OpenCV** for advanced image processing.

---

## ✨ Features

### 📷 Image Enhancement

* Brightness Adjustment
* Contrast Enhancement
* Saturation Control
* Sharpen
* Super Sharpen
* Clarity Enhancement

### 🎭 Artistic Effects

* Cartoon Effect
* Pencil Sketch
* Watercolor Painting
* Oil Painting
* Comic Style Filter

### 🎨 Color Grading

* Warm Tone
* Cool Tone
* Sepia
* Vintage Effect

### 🔥 Advanced Processing

* HDR Effect
* Dehaze
* Edge Enhancement
* Detail Enhancement

### 💻 User Experience

* Modern Responsive Interface
* Drag & Drop Image Upload
* Real-Time Filter Preview
* Adjustable Intensity Slider
* Instant Image Download
* Fast Processing Pipeline

---

## 🏗️ System Architecture

```text
User Uploads Image
        │
        ▼
 React Frontend (Vite)
        │
        ▼
 Flask REST API
        │
        ▼
 OpenCV Processing Engine
        │
        ▼
 Processed Image Generated
        │
        ▼
 Download Result
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose           |
| ---------- | ----------------- |
| React      | UI Development    |
| Vite       | Build Tool        |
| Axios      | API Communication |
| CSS        | Styling           |

### Backend

| Technology | Purpose           |
| ---------- | ----------------- |
| Flask      | REST API          |
| OpenCV     | Image Processing  |
| NumPy      | Matrix Operations |
| Pillow     | Image Handling    |

### Deployment

| Platform | Service          |
| -------- | ---------------- |
| Vercel   | Frontend Hosting |
| Render   | Backend Hosting  |
| GitHub   | Version Control  |

---

## 📂 Project Structure

```text
AI-Image-Editor
│
├── backend
│   ├── app.py
│   ├── filters.py
│   ├── requirements.txt
│   ├── uploads/
│   └── processed/
│
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚡ Getting Started

### Clone Repository

```bash
git clone https://github.com/Snehashis87/Ai-Image-Editor.git

cd Ai-Image-Editor
```

---

## 🔧 Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

Backend runs on:

```text
http://localhost:5000
```

---

## 🎨 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🌐 API Endpoint

### Apply Filter

```http
POST /apply-filter
```

### Form Data

| Parameter | Type    | Description    |
| --------- | ------- | -------------- |
| file      | Image   | Uploaded image |
| filter    | String  | Filter name    |
| intensity | Integer | 0-100          |

### Response

Returns processed image.

---

## 📈 Key Highlights

✅ Full Stack Application

✅ REST API Architecture

✅ OpenCV-Based Image Processing

✅ Dynamic Filter Intensity

✅ File Validation & Error Handling

✅ UUID-Based Secure File Handling

✅ Temporary File Cleanup

✅ Production Ready Deployment

---

## 🔮 Future Improvements

* Before/After Comparison Slider
* AI Background Removal
* Face Enhancement
* Batch Image Processing
* Cloud Image Storage
* User Authentication
* Image History Tracking

---

## 📸 Screenshots

Add screenshots here after deployment.

### Home Page

```text
Insert Screenshot
```

### Filter Application

```text
Insert Screenshot
```

### Processed Output

```text
Insert Screenshot
```

---

## 🎯 Learning Outcomes

This project helped strengthen practical knowledge of:

* Full Stack Development
* React Ecosystem
* Flask REST APIs
* OpenCV Image Processing
* Client-Server Architecture
* Deployment & Cloud Hosting
* Git & GitHub Workflow

---

## 👨‍💻 Author

### Snehashis Mandal

B.Tech Student | Full Stack Developer | Machine Learning Enthusiast

GitHub: https://github.com/Snehashis87

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps the project gain visibility and motivates future improvements.
