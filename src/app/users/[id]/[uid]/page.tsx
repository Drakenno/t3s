import { cookies } from "next/headers";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { auth } from "~/auth";
import ChatLayout from "~/components/chat/chat-layout";
import ChatLayoutWrapper from "~/components/chat/chat-layout-wrapper";

export default async function Home({ params }: { params: { uid: string } }) {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const session = await auth();

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center gap-4 p-4 py-32 md:px-24">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <Link href="#" className="text-gradient text-4xl font-bold">
          chat-trial
        </Link>
        <Link
          href="https://github.com/jakobhoeg/shadcn-chat"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-10 w-10",
          )}
        >
          <GitHubLogoIcon className="h-7 w-7 text-muted-foreground" />
        </Link>
      </div>

      <ChatLayoutWrapper
        uid={params.uid}
        defaultLayout={defaultLayout}
        chatYN={true}
      />

      <div className="flex w-full max-w-5xl items-start justify-between text-xs text-muted-foreground md:text-sm">
        <p className="max-w-[150px] sm:max-w-lg">
          Built by{" "}
          <a className="font-semibold" href="https://github.com/Drakenno/">
            Drakenno
          </a>
          . To be used with{" "}
          <a className="font-semibold" href="https://ui.shadcn.com/">
            shadcn
          </a>
          .
        </p>
        <p className="max-w-[150px] text-right sm:max-w-lg">
          Source code available on{" "}
          <a className="font-semibold" href="https://github.com/Drakenno/">
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
