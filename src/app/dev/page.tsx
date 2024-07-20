import { getUserChatDataById } from "~/server/actions";

export default async function Page() {
  const userChatData = await getUserChatDataById(
    "d02bc17e-e84f-4cf6-b318-ca6f9bd85e13",
  );
  return <div>{JSON.stringify(userChatData, null, 2)}</div>;
}
