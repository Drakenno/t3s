"use client";
import { FcGoogle } from "react-icons/fc";
// import {FaGithub} from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Social() {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => {}}
      >
        <FaDiscord className="h-5 w-5" />
      </Button>
    </div>
  );
}
