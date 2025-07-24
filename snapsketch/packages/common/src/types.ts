import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
  name: z.string(),
});

export const signinSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const CreateRoomSchema = z.object({
  roomname: z.string().min(3).max(20),
});
