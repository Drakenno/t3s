import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});
