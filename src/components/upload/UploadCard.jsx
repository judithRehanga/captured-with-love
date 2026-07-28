import { useRef } from "react";
import { useUpload } from "../../context/UploadContext";
import "./UploadCard.css";
import Button from "../ui/button";
import FilePreview from "./FilePreview";
import { useNavigate } from "react-router-dom";

function UploadCard({ event }) {
  const inputRef = useRef(null);

  const navigate = useNavigate();

  const { files, setFiles } = useUpload();
  const removeFile = (index) => {
    const updatedFiles = [...files];

    URL.revokeObjectURL(updatedFiles[index].preview);

    updatedFiles.splice(index, 1);

    setFiles(updatedFiles);
  };

  const handleFiles = (eventInput) => {
  console.log("Files selected");

  const selectedFiles = Array.from(eventInput.target.files);

  const filesWithPreview = selectedFiles.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  setFiles((previousFiles) => [...previousFiles, ...filesWithPreview]);

  // Save the current event
  localStorage.setItem("eventSlug", event.slug);

  navigate("/review");
};

  const openFilePicker = () => {
    inputRef.current.click();
  };

  return (
    <section id="upload-section" className="upload-section">
      <div className="upload-card">
        <h2>Share Your Memories</h2>

        <p>
          Upload your favourite photos and videos from today's celebration.
          Every memory helps us relive this special day.
        </p>

        <div className="upload-placeholder" onClick={openFilePicker}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={handleFiles}
          />
          <div className="upload-status">
            <div className="status-header">
              <span>Selected Photos</span>

              <span>{files.length} / 20</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(files.length / 20) * 100}%`,
                }}
              />
            </div>

            <small>{20 - files.length} remaining</small>
          </div>
          {files.length > 0 && (
            <FilePreview files={files} removeFile={removeFile} />
          )}
          ......
          <span>Drag & Drop Photos Here</span>
          <small>or click to browse</small>
        </div>
      </div>
    </section>
  );
}

export default UploadCard;
