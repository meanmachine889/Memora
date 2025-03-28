/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export default function FormDialog({ fetchCourses }: { fetchCourses: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const [instructors, ] = useState<string[]>([address!]);

  const handleAddImage = () => {
    if (newImage.trim()) {
      setImages([...images, newImage.trim()]);
      setNewImage("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmitWrapper = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      title: (e.target as any).title.value,
      instructors,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image: (e.target as any).image.value,
      images,
    };

    try {
      const response = await fetch("/api/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      toast("Success! Your course has been created successfully.");

      setOpen(false);
      if (fetchCourses) {
        await fetchCourses();
      }
    } catch (error) {
      toast("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-medium rounded-sm bg-gray-300 shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Create New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmitWrapper}>
          <DialogHeader>
            <DialogTitle className="font-normal">Add new Course</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left font-normal">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Course Title"
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-left font-normal">
                Thumbnail
              </Label>
              <Input
                id="image"
                name="image"
                placeholder="Image URL"
                className="col-span-3"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <Label className="text-left font-normal">Content</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="Add image URL"
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleAddImage}
                    disabled={isLoading}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm"
                    >
                      {image.substring(0, 20)}...
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="ml-1 rounded-full hover:bg-destructive/20"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="font-normal text-gray-900 bg-gray-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Course"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
