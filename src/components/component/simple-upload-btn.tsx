"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadThing } from "~/lib/uploadthing";
import { Button } from "../ui/button";
import { ImageIcon, SmileIcon, VideoIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { createPost } from "~/server/actions";
import { set } from "zod";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

export default function SimpleUploadBtn({ userID }: { userID: string }) {
  const router = useRouter();
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const { inputProps } = useUploadThingInputProps("imageUploader", {
    onClientUploadComplete(req) {
      req.forEach((file) => {
        setUrl(file.url);
      });
      setUploaded(true);
      router.refresh();
    },
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Textarea
          placeholder="What's on your mind?"
          className="w-full rounded-lg border border-input bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        <div className="flex flex-grow-0 flex-row items-center gap-2 p-2">
          {!uploaded ? (
            <Button variant="ghost" size="icon">
              <label htmlFor="upload-button" className="cursor-pointer">
                <ImageIcon className="h-4 w-4" />
                <span className="sr-only">Add image</span>
              </label>
              <input
                id="upload-button"
                type="file"
                className="sr-only"
                {...inputProps}
              />
            </Button>
          ) : (
            <Button variant="destructive" size="icon">
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Image uploaded</span>
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <VideoIcon className="h-4 w-4" />
            <span className="sr-only">Add video</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SmileIcon className="h-4 w-4" />
            <span className="sr-only">Add emoji</span>
          </Button>
          <Button
            onClick={async () => {
              await createPost(url, caption, userID);
              setCaption("");
              setUrl("");
              setUploaded(false);
              router.refresh();
            }}
            className="ml-auto inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Post
          </Button>
        </div>
      </div>
    </>
  );
}

// function ImageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
//       <circle cx="9" cy="9" r="2" />
//       <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
//     </svg>
//   );
// }
