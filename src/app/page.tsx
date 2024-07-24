// import Link from "next/link";
// import PostCard from "~/components/component/post-card";
// import OpeningPage from "~/components/component/opening-page";
// import Dashboard, { UserPost } from "~/components/component/dashboard";
// import {
//   getloggedInUserData,
//   getStrippedloggedInUserData,
//   getUserPosts,
// } from "~/server/actions";
// import { auth } from "~/auth";
// import { redirect } from "next/dist/server/api-utils";
import { permanentRedirect } from "next/navigation";
export default async function HomePage() {
  // const session = await auth();
  // const userPosts = await getUserPosts(session?.user.id);
  // const userDeets = await getloggedInUserData(session?.user.id);
  permanentRedirect("/dashboard");
  return (
    // <main className="flex min-h-screen flex-col px-4 py-12 sm:px-6 lg:px-8">
    //   {/* <PostCard /> */}
    //   {/* <OpeningPage /> */}
    //   <Dashboard userPosts={userPosts} userDeets={userDeets} />
    // </main>
    <></>
  );
}
