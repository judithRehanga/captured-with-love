import axios from "axios";

const API = "http://172.20.10.3:5000";

export const uploadFiles = async (
  files,
  eventSlug,
  onUploadProgress
) => {
  const formData = new FormData();

  files.forEach((item) => {
    formData.append("files", item.file);
  });

  formData.append("event", eventSlug);

  return axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress,
  });
};