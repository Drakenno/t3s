import { auth } from "~/auth";
import ChatLayout from "./chat-layout";
import {
  getAllUserChatDataExceptCurrentUser,
  getStrippedloggedInUserData,
  getUserChatDataById,
} from "~/server/actions";
import { env } from "~/env";
type ChatLayoutWrapperProps = {
  uid: string;
  defaultLayout: number[] | undefined;
  chatYN: boolean;
};

export default async function ChatLayoutWrapper({
  uid,
  defaultLayout,
  chatYN,
}: ChatLayoutWrapperProps) {
  // const [sID, setSID] = useState<string>("");
  // useEffect(() => {
  //   console.log({ uid: uid });
  //   console.log(window.location.pathname);
  //   setSID(window.location.pathname.split("/")[2]!);
  //   console.log({ currentUser: sID });
  // }, []);
  // const session = useSession();
  // const loginID = session?.data?.user?.id;
  // console.log({ loginID: session?.data?.user?.id });

  const session = await auth();
  const loggedInUserdata = await getAllUserChatDataExceptCurrentUser(
    session?.user.id,
  );
  // console.log({ loggedInUserdata: loggedInUserdata });
  const data = await getUserChatDataById(uid, session?.user.id);
  const strippedLoggedInUserData = await getStrippedloggedInUserData(
    session?.user.id,
  );

  return (
    <div className="z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex">
      <ChatLayout
        defaultLayout={defaultLayout}
        navCollapsedSize={8}
        loggedInUserData={loggedInUserdata}
        chatYN={chatYN}
        currentUserData={data}
        session={session}
        strippedLoggedInUserData={strippedLoggedInUserData}
      />
    </div>
  );
}
