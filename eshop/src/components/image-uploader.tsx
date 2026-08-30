"use client";

import { useRef, useState } from "react";
import { useToast } from "@/components/toast-provider";

type ImageUploaderProps = {
  images: string[];
  onChange: (images: string[]) => void;
};

// Uploads a file straight from the browser to Cloudinary using a signature
// minted by the admin-only /api/upload route — the API secret never leaves
// the server, only the (non-secret) signed request parameters do.
export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const signRes = await fetch("/api/upload");
        const signData = await signRes.json();
        if (!signRes.ok) throw new Error(signData.error || "Unable to start upload.");
        const { timestamp, signature, cloudName, apiKey, folder } = signData;

        const body = new FormData();
        body.append("file", file);
        body.append("api_key", apiKey);
        body.append("timestamp", String(timestamp));
        body.append("signature", signature);
        body.append("folder", folder);

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body,
        });
        const data = await uploadRes.json();
        if (!uploadRes.ok || !data.secure_url) {
          throw new Error(data.error?.message || "Upload failed.");
        }
        onChange([...images, data.secure_url]);
      }
      toast.notify("Image uploaded", "success");
    } catch (error) {
      toast.notify(error instanceof Error ? error.message : "Upload failed.", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {images.length ? (
        <div className="flex flex-wrap gap-3">
          {images.map((image, i) => (
            <div key={image + i} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin-managed mixed real/data-uri/Cloudinary URLs */}
              <img src={image} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-black/20 bg-black/[0.02] px-4 py-6 text-sm text-black/50 transition hover:border-flame-500 hover:text-flame-500">
        {uploading ? "Uploading…" : "Click to upload image(s), or drag & drop"}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>
      <p className="text-xs text-black/40">
        Needs Cloudinary configured (see .env.example) — without it this returns a clear error instead of a broken upload.
      </p>
    </div>
  );
}
