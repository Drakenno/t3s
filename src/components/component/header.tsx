import { Poppins } from "next/font/google";

import { cn } from "~/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: "600" });

type HeaderProps = {
  label: string;
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1 className={cn("text-3xl font-semibold", font.className)}>Login</h1>
      <p className="text-primary font-semibold">{label}</p>
    </div>
  );
};
