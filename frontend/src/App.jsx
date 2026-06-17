import { useState, useRef, useCallback, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

// ── FILTER CATALOGUE ──────────────────────────────────────────────────────────
const FILTER_CATEGORIES = [
  {
    id: "adjustments",
    label: "Adjustments",
    icon: "⚙️",
    filters: [
      { id: "sharpen",      label: "Sharpen",       icon: "🔪", desc: "Crisp edges & fine detail" },
      { id: "super_sharpen",label: "Super Sharpen", icon: "⚡", desc: "Maximum edge clarity" },
      { id: "clarity",      label: "Clarity",       icon: "🔭", desc: "Local contrast boost" },
      { id: "brightness",   label: "Bright Boost",  icon: "☀️", desc: "Lift exposure" },
      { id: "contrast",     label: "Contrast",      icon: "◑",  desc: "Deep blacks, bright whites" },
      { id: "saturation",   label: "Vibrance",      icon: "🎨", desc: "Rich, punchy colours" },
      { id: "dehaze",       label: "Dehaze",        icon: "🌤️", desc: "Remove haze & fog" },
    ],
  },
  {
    id: "tone",
    label: "Colour Tone",
    icon: "🌈",
    filters: [
      { id: "warm",    label: "Warm",    icon: "🔥", desc: "Golden hour feel" },
      { id: "cool",    label: "Cool",    icon: "❄️", desc: "Crisp, icy tones" },
      { id: "sepia",   label: "Sepia",   icon: "📜", desc: "Classic brown tint" },
      { id: "vintage", label: "Vintage", icon: "📷", desc: "Faded retro look" },
    ],
  },
  {
    id: "artistic",
    label: "Artistic",
    icon: "🖼️",
    filters: [
      { id: "pencil",       label: "Pencil Sketch",  icon: "✏️", desc: "B&W hand-drawn look" },
      { id: "pencil_color", label: "Colour Sketch",  icon: "🖊️", desc: "Coloured pencil drawing" },
      { id: "cartoon",      label: "Cartoon",        icon: "💬", desc: "Bold outlines & flat colour" },
      { id: "watercolor",   label: "Watercolour",    icon: "💧", desc: "Soft painterly wash" },
      { id: "oil_painting", label: "Oil Painting",   icon: "🖌️", desc: "Thick impasto texture" },
      { id: "comic",        label: "Comic Book",     icon: "📚", desc: "Halftone print style" },
      { id: "emboss",       label: "Emboss",         icon: "🏛️", desc: "3D relief effect" },
    ],
  },
  {
    id: "effects",
    label: "Effects",
    icon: "✨",
    filters: [
      { id: "hdr",          label: "HDR",           icon: "🌅", desc: "High dynamic range" },
      { id: "vignette",     label: "Vignette",      icon: "🔦", desc: "Dark edge focus" },
      { id: "grayscale",    label: "Greyscale",     icon: "⬛", desc: "Timeless B&W" },
      { id: "invert",       label: "Invert",        icon: "🔄", desc: "Negative colours" },
      { id: "edge",         label: "Edge Detect",   icon: "📐", desc: "Structural outlines" },
      { id: "blur",         label: "Soft Focus",    icon: "🌫️", desc: "Dreamy blur" },
      { id: "night_vision", label: "Night Vision",  icon: "🌙", desc: "Green NV goggles" },
      { id: "pixelate",     label: "Pixelate",      icon: "🟩", desc: "8-bit pixel art" },
      { id: "glitch",       label: "Glitch",        icon: "📺", desc: "RGB channel shift" },
    ],
  },
];

const ALL_FILTERS = FILTER_CATEGORIES.flatMap((c) => c.filters);

// ── HELPERS ───────────────────────────────────────────────────────────────────
function getFilterMeta(id) {
  return ALL_FILTERS.find((f) => f.id === id) ?? { label: id, icon: "🖼️", desc: "" };
}

export default function App() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  const [originalFile, setOriginalFile] = useState(null);
  const [originalURL, setOriginalURL]   = useState(null);
  const [filteredURL, setFilteredURL]   = useState(null);

  const [activeFilter,   setActiveFilter]   = useState("sharpen");
  const [intensity,      setIntensity]      = useState(100);
  const [activeCategory, setActiveCategory] = useState("adjustments");

  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Split slider
  const [splitPos,   setSplitPos]   = useState(50);
  const [dragging,   setDragging]   = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const splitRef     = useRef(null);
  const isDraggingRef = useRef(false);

  const dropRef = useRef(null);

  // ── FILE HANDLING ──────────────────────────────────────────────────────────
  const loadFile = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, JPEG, WEBP).");
      return;
    }
    setError(null);
    setFilteredURL(null);
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalURL(url);
  }, []);

  const handleFileInput = (e) => {
    if (e.target.files[0]) loadFile(e.target.files[0]);
  };

  // Drag-and-drop
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) loadFile(file);
  };

  // ── APPLY FILTER ──────────────────────────────────────────────────────────
  const applyFilter = async () => {
    if (!originalFile) { setError("Upload an image first."); return; }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", originalFile);
    formData.append("filter", activeFilter);
    formData.append("intensity", intensity);

    try {
      const res = await fetch(`${API_URL}/apply-filter`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Server error");
      }

      const blob = await res.blob();
      if (filteredURL) URL.revokeObjectURL(filteredURL);
      setFilteredURL(URL.createObjectURL(blob));
      setSplitPos(50);
    } catch (err) {
      setError(err.message === "Failed to fetch"
        ? "Cannot reach the server. Is the Flask backend running on port 5000?"
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── DOWNLOAD ──────────────────────────────────────────────────────────────
  const download = () => {
    if (!filteredURL) return;
    const a = document.createElement("a");
    a.href = filteredURL;
    const meta = getFilterMeta(activeFilter);
    a.download = `pixelcraft_${meta.label.toLowerCase().replace(/\s+/g, "_")}.png`;
    a.click();
  };

  // ── SPLIT SLIDER DRAG ─────────────────────────────────────────────────────
  const startDrag = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setDragging(true);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!isDraggingRef.current || !splitRef.current) return;
      const rect = splitRef.current.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      setSplitPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    };
    const onUp = () => { isDraggingRef.current = false; setDragging(false); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  // Track the split container's actual rendered pixel width, so the clipped
  // "original" image can be sized to match the full image exactly (a plain
  // 100% width would scale to the shrinking clip box instead, distorting it).
  useEffect(() => {
    if (!splitRef.current) return;
    const el = splitRef.current;
    const update = () => setContainerWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [filteredURL]);

  // ── CURRENT FILTER META ───────────────────────────────────────────────────
  const currentMeta = getFilterMeta(activeFilter);

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={styles.root}>
      {/* ── HEADER ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>✦</span>
            <span style={styles.logoText}>PixelCraft</span>
            <span style={styles.logoBadge}>Studio</span>
          </div>
          <p style={styles.tagline}>Professional image filters, right in your browser</p>
        </div>
      </header>

      <main style={styles.main}>
        {/* ── UPLOAD ZONE ── */}
        {!originalURL && (
          <div
            ref={dropRef}
            style={{ ...styles.dropzone, ...(isDragging ? styles.dropzoneActive : {}) }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div style={styles.dropIcon}>📂</div>
            <p style={styles.dropTitle}>Drop your image here</p>
            <p style={styles.dropSub}>or click to browse — PNG, JPG, WEBP supported</p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
          </div>
        )}

        {/* ── WORKSPACE ── */}
        {originalURL && (
          <div style={styles.workspace}>
            {/* LEFT: controls */}
            <aside style={styles.sidebar}>
              <div style={styles.sidebarHeader}>
                <button
                  style={styles.changeImageBtn}
                  onClick={() => {
                    setOriginalURL(null);
                    setOriginalFile(null);
                    setFilteredURL(null);
                    setError(null);
                  }}
                >
                  ← Change Image
                </button>
              </div>

              {/* Category tabs */}
              <div style={styles.categoryTabs}>
                {FILTER_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    style={{
                      ...styles.catTab,
                      ...(activeCategory === cat.id ? styles.catTabActive : {}),
                    }}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span style={styles.catTabLabel}>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Filter grid */}
              {FILTER_CATEGORIES.filter((c) => c.id === activeCategory).map((cat) => (
                <div key={cat.id} style={styles.filterGrid}>
                  {cat.filters.map((f) => (
                    <button
                      key={f.id}
                      style={{
                        ...styles.filterCard,
                        ...(activeFilter === f.id ? styles.filterCardActive : {}),
                      }}
                      onClick={() => setActiveFilter(f.id)}
                      title={f.desc}
                    >
                      <span style={styles.filterCardIcon}>{f.icon}</span>
                      <span style={styles.filterCardLabel}>{f.label}</span>
                    </button>
                  ))}
                </div>
              ))}

              {/* Intensity slider */}
              <div style={styles.intensityBox}>
                <div style={styles.intensityHeader}>
                  <span style={styles.intensityLabel}>Intensity</span>
                  <span style={styles.intensityValue}>{intensity}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  style={styles.slider}
                />
                <div style={styles.intensityHints}>
                  <span>Subtle</span><span>Full</span>
                </div>
              </div>

              {/* Apply button */}
              <button
                style={{ ...styles.applyBtn, ...(loading ? styles.applyBtnDisabled : {}) }}
                onClick={applyFilter}
                disabled={loading}
              >
                {loading
                  ? <><span style={styles.spinner} /> Processing…</>
                  : <><span>{currentMeta.icon}</span> Apply {currentMeta.label}</>
                }
              </button>

              {/* Download */}
              {filteredURL && (
                <button style={styles.downloadBtn} onClick={download}>
                  ⬇ Download Result
                </button>
              )}

              {/* Error */}
              {error && <div style={styles.errorBox}>{error}</div>}
            </aside>

            {/* RIGHT: preview */}
            <section style={styles.preview}>
              {!filteredURL ? (
                /* Original only */
                <div style={styles.singlePreview}>
                  <div style={styles.previewLabel}>Original</div>
                  <img src={originalURL} alt="Original" style={styles.previewImg} />
                </div>
              ) : (
                /* Split view */
                <div style={styles.splitOuter}>
                  <div style={styles.splitLabels}>
                    <span style={styles.splitLabelLeft}>Original</span>
                    <span style={styles.splitLabelRight}>{currentMeta.label}</span>
                  </div>

                  <div
                    ref={splitRef}
                    style={{ ...styles.splitContainer, cursor: dragging ? "ew-resize" : "col-resize" }}
                  >
                    {/* Filtered (full) */}
                    <img src={filteredURL} alt="Filtered" style={styles.splitImgBase} />

                    {/* Original (clipped) */}
                    <div
                      style={{ ...styles.splitClip, width: `${splitPos}%` }}
                    >
                      <img
                        src={originalURL}
                        alt="Original"
                        style={{ ...styles.splitImgTop, width: containerWidth || "100%" }}
                      />
                    </div>

                    {/* Drag handle */}
                    <div
                      style={{ ...styles.splitHandle, left: `${splitPos}%` }}
                      onMouseDown={startDrag}
                      onTouchStart={startDrag}
                    >
                      <div style={styles.splitLine} />
                      <div style={styles.splitPill}>
                        <span style={styles.splitArrow}>◀</span>
                        <span style={styles.splitArrow}>▶</span>
                      </div>
                    </div>
                  </div>

                  <p style={styles.splitHint}>Drag the handle to compare before &amp; after</p>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ── FEATURE PILLS (shown on landing) ── */}
        {!originalURL && (
          <div style={styles.featurePills}>
            {["25+ Filters", "Intensity Control", "Before/After Slider", "One-Click Download", "No account needed"].map((f) => (
              <span key={f} style={styles.pill}>{f}</span>
            ))}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <p>PixelCraft Studio · Powered by OpenCV · Built with React + Flask</p>
      </footer>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0f;
          color: #e8e8f0;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111118; }
        ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #7c5cfc; }

        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(to right, #7c5cfc 0%, #7c5cfc ${intensity}%, #2a2a3a ${intensity}%, #2a2a3a 100%);
          outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7c5cfc;
          box-shadow: 0 0 8px rgba(124,92,252,0.6);
          cursor: pointer;
          border: 2px solid #fff;
        }
        input[type=range]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7c5cfc;
          box-shadow: 0 0 8px rgba(124,92,252,0.6);
          cursor: pointer;
          border: 2px solid #fff;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #0a0a0f 0%, #10101c 100%)",
  },

  // Header
  header: {
    borderBottom: "1px solid rgba(124,92,252,0.2)",
    background: "rgba(10,10,15,0.8)",
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  logoIcon: {
    fontSize: 22,
    color: "#7c5cfc",
    filter: "drop-shadow(0 0 8px rgba(124,92,252,0.8))",
  },
  logoText: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: "-0.02em",
  },
  logoBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: "#7c5cfc",
    background: "rgba(124,92,252,0.15)",
    border: "1px solid rgba(124,92,252,0.35)",
    borderRadius: 20,
    padding: "2px 8px",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  tagline: {
    fontSize: 13,
    color: "#6b6b8a",
    marginLeft: "auto",
  },

  // Main
  main: {
    flex: 1,
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
    padding: "32px 24px",
  },

  // Drop zone
  dropzone: {
    border: "2px dashed rgba(124,92,252,0.35)",
    borderRadius: 20,
    padding: "80px 40px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.25s ease",
    background: "rgba(124,92,252,0.04)",
    animation: "fadeIn 0.4s ease",
  },
  dropzoneActive: {
    border: "2px dashed #7c5cfc",
    background: "rgba(124,92,252,0.12)",
    transform: "scale(1.01)",
  },
  dropIcon: { fontSize: 52, marginBottom: 16 },
  dropTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: 8,
    fontFamily: "'Space Grotesk', sans-serif",
  },
  dropSub: { fontSize: 14, color: "#6b6b8a" },

  // Feature pills
  featurePills: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    marginTop: 36,
  },
  pill: {
    fontSize: 12,
    fontWeight: 500,
    color: "#a896fc",
    background: "rgba(124,92,252,0.1)",
    border: "1px solid rgba(124,92,252,0.25)",
    borderRadius: 20,
    padding: "6px 14px",
  },

  // Workspace
  workspace: {
    display: "flex",
    gap: 24,
    animation: "fadeIn 0.4s ease",
  },

  // Sidebar
  sidebar: {
    width: 280,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  sidebarHeader: { marginBottom: 2 },
  changeImageBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#8888aa",
    fontSize: 13,
    padding: "7px 14px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "all 0.2s",
    width: "100%",
    textAlign: "left",
  },

  // Category tabs
  categoryTabs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 6,
  },
  catTab: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#8888aa",
    fontSize: 11,
    fontWeight: 500,
    padding: "8px 6px",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    transition: "all 0.2s",
  },
  catTabActive: {
    background: "rgba(124,92,252,0.2)",
    border: "1px solid rgba(124,92,252,0.5)",
    color: "#c4b5fd",
  },
  catTabLabel: { fontSize: 11 },

  // Filter grid
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 7,
    maxHeight: 320,
    overflowY: "auto",
  },
  filterCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "10px 8px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    transition: "all 0.18s ease",
    color: "#c0c0d8",
  },
  filterCardActive: {
    background: "rgba(124,92,252,0.22)",
    border: "1px solid rgba(124,92,252,0.6)",
    color: "#ffffff",
    boxShadow: "0 0 12px rgba(124,92,252,0.25)",
  },
  filterCardIcon: { fontSize: 18 },
  filterCardLabel: { fontSize: 11, fontWeight: 500, textAlign: "center", lineHeight: 1.3 },

  // Intensity
  intensityBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "14px 16px",
  },
  intensityHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  intensityLabel: { fontSize: 13, fontWeight: 500, color: "#c0c0d8" },
  intensityValue: { fontSize: 13, fontWeight: 700, color: "#7c5cfc" },
  slider: { width: "100%", marginBottom: 6 },
  intensityHints: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#6b6b8a",
  },

  // Buttons
  applyBtn: {
    width: "100%",
    padding: "13px 0",
    background: "linear-gradient(135deg, #7c5cfc, #a78bfa)",
    border: "none",
    borderRadius: 12,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(124,92,252,0.4)",
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "-0.01em",
  },
  applyBtnDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
  },
  downloadBtn: {
    width: "100%",
    padding: "12px 0",
    background: "rgba(34,197,94,0.12)",
    border: "1px solid rgba(34,197,94,0.4)",
    borderRadius: 12,
    color: "#4ade80",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "all 0.2s ease",
  },

  // Spinner
  spinner: {
    display: "inline-block",
    width: 14,
    height: 14,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },

  // Error
  errorBox: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.35)",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 12,
    color: "#f87171",
    lineHeight: 1.5,
  },

  // Preview panel
  preview: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },

  // Single image
  singlePreview: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  previewLabel: {
    position: "absolute",
    top: 14,
    left: 14,
    fontSize: 11,
    fontWeight: 600,
    color: "#fff",
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    borderRadius: 20,
    padding: "4px 12px",
    zIndex: 2,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  previewImg: {
    width: "100%",
    height: "auto",
    maxHeight: "75vh",
    objectFit: "contain",
    display: "block",
  },

  // Split view
  splitOuter: { display: "flex", flexDirection: "column", gap: 10 },
  splitLabels: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 4px",
  },
  splitLabelLeft: {
    fontSize: 11,
    fontWeight: 600,
    color: "#8888aa",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  splitLabelRight: {
    fontSize: 11,
    fontWeight: 600,
    color: "#a896fc",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  splitContainer: {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.08)",
    userSelect: "none",
    touchAction: "none",
  },
  splitImgBase: {
    width: "100%",
    height: "auto",
    maxHeight: "72vh",
    objectFit: "contain",
    display: "block",
  },
  splitClip: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    overflow: "hidden",
  },
  splitImgTop: {
    height: "100%",
    objectFit: "contain",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
  },
  splitHandle: {
    position: "absolute",
    top: 0,
    height: "100%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },
  splitLine: {
    width: 2,
    flex: 1,
    background: "rgba(255,255,255,0.85)",
    boxShadow: "0 0 8px rgba(124,92,252,0.6)",
  },
  splitPill: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(10,10,15,0.85)",
    border: "2px solid rgba(124,92,252,0.7)",
    borderRadius: 20,
    padding: "6px 10px",
    display: "flex",
    gap: 6,
    backdropFilter: "blur(8px)",
    cursor: "ew-resize",
    boxShadow: "0 0 14px rgba(124,92,252,0.4)",
  },
  splitArrow: { fontSize: 11, color: "#c4b5fd" },
  splitHint: {
    fontSize: 12,
    color: "#6b6b8a",
    textAlign: "center",
  },

  // Footer
  footer: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "16px 24px",
    textAlign: "center",
    fontSize: 12,
    color: "#4a4a6a",
  },
};