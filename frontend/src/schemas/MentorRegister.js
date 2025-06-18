import { z } from "zod";

export const step1Schema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().min(1, "Phone number is required"),
    timezone: z.string().min(1, "Timezone is required"),
    bio: z.string().max(200, "Max 200 characters").min(1, "Bio is required"),
    photo: z
      .instanceof(File)
      .refine((file) => file.size > 0, "Profile photo is required"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });
