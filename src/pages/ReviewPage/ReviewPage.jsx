import "./ReviewPage.css";
import { useUpload } from "../../context/UploadContext";
import FilePreview from "../../components/upload/FilePreview";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { uploadFiles } from "./uploadService";

export default function ReviewPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const { files, setFiles, currentEvent } = useUpload();

  const totalSize = files.reduce((total, item) => total + item.file.size, 0);

  const sizeMB = (totalSize / (1024 * 1024)).toFixed(2);

  const removeFile = (index) => {
    const updated = [...files];

    URL.revokeObjectURL(updated[index].preview);

    updated.splice(index, 1);

    setFiles(updated);
  };

  const handleUpload = async () => {
    try {
      setUploading(true);

      const eventSlug = localStorage.getItem("eventSlug");

      await uploadFiles(files, eventSlug, (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 95) / progressEvent.total,
        );

        setProgress(percent);
      });

      setProgress(100);

      // Let the user actually see 100%
      setTimeout(() => {
        setFiles([]);
        navigate("/thank-you");
      }, 400);

    } catch (error) {
      console.error(error);

      if (error.response) {
        console.log("Server Response:", error.response.data);
      }

      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="review-page">
      <div className="review-card">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Upload
        </button>

        <div className="review-heart">♡</div>

        <h1>Review Your Upload</h1>

        <p>Please review your selected memories before uploading them.</p>

        <div className="review-status">
          <h3>{files.length} / 20 Photos Selected</h3>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${(files.length / 20) * 100}%`,
              }}
            />
          </div>

          <small>{20 - files.length} Remaining</small>
        </div>

        <FilePreview files={files} removeFile={removeFile} />

        <div className="upload-summary">
          <h3>Ready to Upload?</h3>

          <p>Your memories will be safely added to our Wedding Album.</p>

          <div className="summary-grid">
            <div>
              <span>Photos</span>

              <strong>{files.length}</strong>
            </div>

            <div>
              <span>Total Size</span>

              <strong>{sizeMB} MB</strong>
            </div>
          </div>

          <button
            className="upload-button"
            disabled={files.length === 0 || uploading}
            onClick={handleUpload}
          >
            {uploading ? "Uploading..." : "Upload Memories"}
          </button>

          {uploading && (
            <div className="upload-progress">
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p>{progress}% Uploaded</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
