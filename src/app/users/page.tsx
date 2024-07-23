import Link from "next/link";
import { auth } from "~/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Link href={`/${session?.user.id}`}>Go to Chats</Link>
    </div>
  );
}
