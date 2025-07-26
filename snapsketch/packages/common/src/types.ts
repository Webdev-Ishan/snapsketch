import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(3).max(20),
  password: z.string(),
  email: z.string(),
});

export const signinSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  roomname: z.string().min(3).max(20),
  slug:z.string()
});
