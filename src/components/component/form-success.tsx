import { FaCheckCircle } from "react-icons/fa";

type FormSuccessProps = {
  message?: string;
};

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500 p-3 text-sm text-accent-foreground">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
