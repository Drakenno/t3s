import { auth } from "~/auth";

export default async function SettingsPage() {
  console.log("SettingsPage");
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
}
