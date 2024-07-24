import { get } from "http";
import Link from "next/link";
import { getNameById, UserRole } from "~/server/actions";
import { CommentType } from "~/server/db/schema";

export default async function CommentLayout({
  userComments,
  userDeets,
}: {
  userComments: CommentType[];
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
  const getUserNameFromComment = async (comment: CommentType) => {
    const userName = await getNameById(comment.userID);
    return userName;
  };
  return (
    <div className="grid w-full gap-1.5 gap-x-5 px-2 text-sm">
      {userComments?.map((comment) => (
        <div key={comment.id} className="flex items-center gap-2">
          <Link href="#" className="font-medium" prefetch={false}>
            {getUserNameFromComment(comment)}
          </Link>
          {comment.content}
        </div>
      ))}
    </div>
  );
}
