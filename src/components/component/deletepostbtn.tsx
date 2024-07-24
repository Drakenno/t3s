"use client";
import { deletePost } from "~/server/actions";
import { Button } from "../ui/button";
import { UserPost } from "./dashboard";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ userPost }: { userPost: UserPost }) {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-auto"
      onClick={async () => {
        await deletePost(userPost.id);
        router.refresh();
      }}
    >
      <Trash2Icon className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}
