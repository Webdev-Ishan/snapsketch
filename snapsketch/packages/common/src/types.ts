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
  slug: z.string().min(3).max(35),
});

export const CreateReviewSchema = z.object({
  Title: z.string().min(3).max(50),
  message: z.string().min(20).max(300),
});

export const CreateEnquirySchema = z.object({
  Title: z.string().min(3).max(50),
  message: z.string().max(300),
});

export const SearchRoomSchema = z.object({
  roomname: z.string().min(3).max(20),
});
