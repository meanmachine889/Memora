"use client";

import { useState } from "react";
import { Plus} from "lucide-react";

import { Button } from "@/components/ui/button";
import UploadForm from "./image-upload";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AddNftDialog({id} : {id: string}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-medium rounded-sm w-fit bg-[#101010] border-2 text-gray-400 shadow-md"><Plus/>Add New NFT</Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[500px]">
        <UploadForm id={id} />
      </DialogContent>
    </Dialog>
  );
}
