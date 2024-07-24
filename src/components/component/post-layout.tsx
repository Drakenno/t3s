import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  MoveHorizontalIcon,
  BookmarkIcon,
  StarIcon,
  FileWarningIcon,
  HeartIcon,
  MessageCircleIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Link from "next/link";
import { UserPost } from "./dashboard";
import CommentLayout from "./comment-layout";
import { UserRole } from "~/server/actions";
import Image from "next/image";
import DeleteButton from "./deletepostbtn";
import { Separator } from "@radix-ui/react-separator";

export default function PostLayout({
  userPost,
  userDeets,
}: {
  userPost: UserPost;
  userDeets: {
    email: string;
    password: string | null;
    id: string;
    name: string;
    role: UserRole;
    emailVerified: Date | null;
    image: string;
  };
}) {
  return (
    <Card className="max-w-md border-0 shadow-none">
      <CardHeader className="flex flex-row items-center p-4">
        <Link
          href="#"
          className="flex items-center gap-2 text-sm font-semibold"
          prefetch={false}
        >
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={userDeets?.image} />
            <AvatarFallback>Aa</AvatarFallback>
          </Avatar>
          {userDeets?.name ?? "Anonymous"}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8 rounded-full"
            >
              <MoveHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <BookmarkIcon className="mr-2 h-4 w-4" />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem>
              <StarIcon className="mr-2 h-4 w-4" />
              Add to favorites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileWarningIcon className="mr-2 h-4 w-4" />
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <Image
          src={userPost?.url ?? "/placeholder.svg"}
          width={400}
          height={400}
          alt="Image"
          className="p-4"
          // priority={true}
        />
        <div className="flex flex-col items-start px-4">
          <p className="text-md">{userPost?.caption}</p>
          <Separator className="h-px bg-primary/20" />
        </div>
      </CardContent>
      <CardFooter className="grid gap-2 p-2 pb-4">
        <div className="flex w-full items-center justify-evenly">
          <Button variant="ghost" size="icon">
            <HeartIcon className="h-4 w-4" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircleIcon className="h-4 w-4" />
            <span className="sr-only">Comment</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <DeleteButton userPost={userPost} />
        </div>
        <CommentLayout
          userComments={userPost?.comments}
          userDeets={userDeets}
        />
      </CardFooter>
    </Card>
  );
}
