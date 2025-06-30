"use client";

import { useState } from "react";

type FileData = { url: string; name: string; type: string; size: number };

export default function UploadField({ setFiles }: { setFiles: (files: FileData[]) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    setFiles([{ url: data.url, name: data.name, type: data.type, size: data.size }]);
  };

  return (
    <div className="border-2 border-dashed p-4 rounded-xl shadow-sm">
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading}
        className="file-input"
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}