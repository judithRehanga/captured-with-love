import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadFiles = async (files, eventSlug, onUploadProgress) => {
  const formData = new FormData();

  files.forEach((item) => {
    formData.append("files", item.file);
  });

  formData.append("event", eventSlug);

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    onUploadProgress,
  });
};
