"use client";
import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonProps = {
  href: string;
  label: string;
};
export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button className="flex flex-row justify-center gap-x-2">
      <Link href={href}>{label}</Link>
    </Button>
  );
}
