import { useRef, useState } from "react";
import "./UploadBox.css";

export default function UploadBox() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  return (
    <section className="upload-box">
      <h2>Share Your Moments</h2>

      <p>Upload your favourite photos and videos from today.</p>

      <button onClick={() => inputRef.current.click()}>Select Photos</button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        hidden
        onChange={(e) => {
          const selected = Array.from(e.target.files);

          if (selected.length > 20) {
            alert("Please select up to 20 files.");
            return;
          }

          setFiles(selected);
        }}
      />

      {files.length > 0 && (
        <p className="selected-files">{files.length} file(s) selected</p>
      )}
    </section>
  );
}
