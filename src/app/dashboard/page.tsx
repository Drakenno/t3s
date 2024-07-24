import Dashboard from "~/components/component/dashboard";
import {
  getloggedInUserData,
  getSuggestedUsers,
  getUserPosts,
} from "~/server/actions";
import { auth } from "~/auth";
export default async function HomePage() {
  const session = await auth();
  const userPosts = await getUserPosts(session?.user.id);
  const userDeets = await getloggedInUserData(session?.user.id);
  const suggestedUsers = await getSuggestedUsers(session?.user.id);
  return (
    <main className="flex min-h-screen flex-col px-4 py-12 sm:px-6 lg:px-8">
      <Dashboard
        userPosts={userPosts}
        userDeets={userDeets}
        suggestedUsers={suggestedUsers}
      />
    </main>
  );
}
