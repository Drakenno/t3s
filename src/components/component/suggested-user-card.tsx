import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function SugesstedUserCard({
  suggestedUser,
}: {
  suggestedUser: {
    id: string;
    name: string;
    avatar: string;
  };
}) {
  return (
    <Link href="#" className="flex items-center gap-2" prefetch={false}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={suggestedUser.avatar} />
        <AvatarFallback>Aa</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{suggestedUser.name}</div>
        <div className="text-sm text-muted-foreground">
          @{suggestedUser.name}
        </div>
      </div>
    </Link>
  );
}
