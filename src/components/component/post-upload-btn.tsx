"use client";
import { SVGProps } from "react";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { UploadButton } from "~/lib/uploadthing";
import SimpleUploadBtn from "./simple-upload-btn";

export default function PostUploadButton() {
  const router = useRouter();

  return (
    // <Button variant="ghost" size="icon">
    //   <ImageIcon className="h-4 w-4" />
    // <UploadButton
    //   endpoint="imageUploader"
    //   onClientUploadComplete={() => {
    //     router.refresh();
    //   }}
    // />
    //   <span className="sr-only">Add image</span>
    // </Button>
    <SimpleUploadBtn />
  );
}
