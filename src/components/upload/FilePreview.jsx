import "./FilePreview.css";

export default function FilePreview({ files, removeFile }) {
  return (
    <div className="preview-grid">
      {files.map((item, index) => (
        <div className="preview-card" key={index}>
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation();
              removeFile(index);
            }}
          >
            ✕
          </button>

          {item.file.type.startsWith("image/") ? (
            <img src={item.preview} alt={item.file.name} />
          ) : (
            <div className="video-preview">🎥</div>
          )}
        </div>
      ))}
    </div>
  );
}
