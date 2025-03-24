import React, { useState } from "react";
import { Button } from "./ui/button";
import { AddIpfs } from "@/app/helpers/helpers";

export default function NFTUploadForm({ id }: { id: string }) {
  const [isUploading, setIsUploading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    attributes: {
      contentId: id,
      duration: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      const fileInput = document.getElementById("file") as HTMLInputElement;
      const file = fileInput.files?.[0];

      if (!file) {
        throw new Error("Please select an image file");
      }

      if (!formData.name || !formData.description) {
        throw new Error("Name and description are required");
      }

      const data = new FormData();
      data.append("file", file);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("attributes", JSON.stringify(formData.attributes));

      const response = await fetch("/api/image-ipfs", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload to IPFS");
      }

      setUploadResult(result);
      console.log(result);
      const resIpfs = await AddIpfs({ courseId: id, uri: result.metadata.url });
      if (!resIpfs.ok) {
        alert("Failed to add to IPFS");
      }
      else {
        alert("Added to IPFS");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Upload NFT to IPFS</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            Image File
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="duration">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.attributes.duration}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({
                ...prev,
                attributes: { ...prev.attributes, [name]: value },
              }));
            }}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 px-4 rounded bg-black ${
            isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
        >
          {isUploading ? "Uploading..." : "Upload to IPFS"}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {uploadResult && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="font-bold text-lg mb-2">Upload Successful!</h2>

          <div className="mb-2">
            <strong>Image IPFS Hash:</strong> {uploadResult.image.ipfsHash}
          </div>

          <div className="mb-2">
            <strong>Image URL:</strong>{" "}
            <a
              href={uploadResult.image.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {uploadResult.image.url}
            </a>
          </div>

          <div className="mb-2">
            <strong>Metadata IPFS Hash:</strong>{" "}
            {uploadResult.metadata.ipfsHash}
          </div>

          <div className="mb-2">
            <strong>Metadata URL:</strong>{" "}
            <a
              href={uploadResult.metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {uploadResult.metadata.url}
            </a>
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">
              View Metadata JSON
            </summary>
            <pre className="mt-2 p-3 bg-gray-100 rounded overflow-auto text-sm">
              {JSON.stringify(uploadResult.nftData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}
