// import Link from "next/link";
import { PostCard } from "~/components/component/post-card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col px-4 py-12 sm:px-6 lg:px-8">
      <PostCard />
    </main>
  );
}
