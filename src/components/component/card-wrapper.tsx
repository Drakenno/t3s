"use client";
import { Card, CardContent, CardFooter } from "../ui/card";
import BackButton from "./back-btn";
import { Header } from "./header";
import Social from "./social-btn";
type CardWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial: boolean;
};

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] p-4 shadow-md">
      <Header label={headerLabel} />
      <CardContent>{children}</CardContent>
      {/* <CardFooter>
        <a href={backButtonHref} className="text-primary-foreground">
          {backButtonLabel}
        </a>
      </CardFooter> */}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex flex-row justify-center gap-x-2">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
}
