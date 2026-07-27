import { createContext, useContext, useState } from "react";

const UploadContext = createContext();

export function UploadProvider({ children }) {
  const [files, setFiles] = useState([]);

  const [currentEvent, setCurrentEvent] = useState(null);

  return (
    <UploadContext.Provider
      value={{
        files,
        setFiles,
        currentEvent,
        setCurrentEvent,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  return useContext(UploadContext);
}