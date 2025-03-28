"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, FileImage } from "lucide-react";
import { toast } from "sonner";
import { AddIpfs } from "@/app/helpers/helpers";

export default function NFTUploadForm({ id }: { id: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast("Missing file", {
        description: "Please select an image file",
      });
      return;
    }

    if (!formData.name || !formData.description) {
      toast("Missing name or description", {
        description: "Name and description are required",
      });
      return;
    }

    setIsUploading(true);

    try {
      const data = new FormData();
      data.append("file", selectedFile);
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

      const resIpfs = await AddIpfs({ courseId: id, uri: result.metadata.url });

      if (!resIpfs.ok) {
        toast("Upload failed", {
          description: "Failed to add to IPFS database",
        });
      } else {
        toast("NFT uploaded", {
          description: "NFT has been uploaded to IPFS",
        });

        setFormData({
          name: "",
          description: "",
          attributes: {
            contentId: id,
            duration: "",
          },
        });
        setSelectedFile(null);

        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (err) {
      toast("Upload failed", {
        description:
          err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto shadow-md border-none">
      <CardHeader>
        <CardTitle className="md:text-2xl font-medium flex items-center gap-2">
          <Upload className="h-5 w-5" /> Upload NFT to IPFS
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file" className="font-medium">
              Image File
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                className="flex-1"
                required
              />
              {selectedFile && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <FileImage className="h-4 w-4" />
                  <span className="truncate max-w-[100px]">
                    {selectedFile.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="font-medium">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="font-medium">
              Duration
            </Label>
            <Input
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
              required
            />
          </div>

          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? "Uploading..." : "Upload to IPFS"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
