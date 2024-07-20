import { getUserChatData } from "~/server/actions";

export default async function Page() {
  const userChatData = await getUserChatData(
    "d02bc17e-e84f-4cf6-b318-ca6f9bd85e13",
  );
  console.log(JSON.stringify(userChatData, null, 2));
  return <div>{JSON.stringify(userChatData, null, 2)}</div>;
}
