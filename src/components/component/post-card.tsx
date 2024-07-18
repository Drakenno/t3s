/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/w77HnzqZgkm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Image from "next/image";

export function PostCard() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <Card className="group w-full max-w-md">
      <CardContent className="p-0">
        <Image
          src="/placeholder.svg"
          alt="Post image"
          width={800}
          height={600}
          className="aspect-video w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <div className="font-medium">Shadcn</div>
              <div className="text-sm text-muted-foreground">@shadcn</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={`text-muted-foreground ${isLiked ? "text-red-500" : ""}`}
            >
              <HeartIcon className="h-5 w-5" />
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-sm font-medium">120</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          This is a sample caption for the post. It can contain text, emojis,
          and other content.
        </p>
      </CardFooter>
    </Card>
  );
}

function HeartIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

// function XIcon() {
//   return (
//     <svg
//       // {...props}
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
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
