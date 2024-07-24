import Link from "next/link";
import { CommentType } from "~/server/db/schema";

export default function CommentLayout({
  userComments,
}: {
  userComments: CommentType[];
}) {
  return (
    <div className="grid w-full gap-1.5 px-2 text-sm">
      {userComments?.map((comment) => (
        <div key={comment.id}>
          <Link href="#" className="font-medium" prefetch={false}>
            {comment.userID}
          </Link>
          {comment.content}
        </div>
      ))}
    </div>
  );
}
