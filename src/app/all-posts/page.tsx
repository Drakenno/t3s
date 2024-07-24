import PostCard from "~/components/component/post-card";
import { getAllPosts } from "~/server/actions";

export default async function AllPostsPage() {
  const allPosts = await getAllPosts();
  return (
    <main className="flex flex-row flex-wrap gap-4">
      {allPosts.map((post) => (
        <div className="flex flex-col gap-4" key={post.posts.id}>
          {post.posts.id}
          <PostCard post={post} />
        </div>
      ))}
    </main>
  );
}
