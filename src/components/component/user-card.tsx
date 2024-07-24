import { UserRole } from "~/server/actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserCard({
  user,
}: {
  user: {
    email: string;
    password: string | null;
    id: string;
    name: string;
    role: UserRole;
    emailVerified: Date | null;
    image: string;
  };
}) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={user?.image} />
        <AvatarFallback>Aa</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-semibold">{user?.name}</div>
        <div className="text-sm text-muted-foreground">@{user?.name}</div>
      </div>
    </div>
  );
}
