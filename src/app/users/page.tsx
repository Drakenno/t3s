import { cookies } from "next/headers";
import { ChatLayout } from "~/components/chat/chat-layout";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center gap-4 p-4 py-32 md:px-24">
      <div className="flex w-full max-w-5xl items-center justify-between">
        <Link href="#" className="text-gradient text-4xl font-bold">
          shadcn-chat
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

      <div className="z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>

      <div className="flex w-full max-w-5xl items-start justify-between text-xs text-muted-foreground md:text-sm">
        <p className="max-w-[150px] sm:max-w-lg">
          Built by{" "}
          <a className="font-semibold" href="https://github.com/jakobhoeg/">
            Jakob Hoeg
          </a>
          . To be used with{" "}
          <a className="font-semibold" href="https://ui.shadcn.com/">
            shadcn
          </a>
          .
        </p>
        <p className="max-w-[150px] text-right sm:max-w-lg">
          Source code available on{" "}
          <a
            className="font-semibold"
            href="https://github.com/jakobhoeg/shadcn-chat"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </main>
  );
}
