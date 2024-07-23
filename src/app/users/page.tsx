import Link from "next/link";
import { auth } from "~/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Link href={`/users/${session?.user.id}`}>Go to Chats</Link>
    </div>
  );
}
