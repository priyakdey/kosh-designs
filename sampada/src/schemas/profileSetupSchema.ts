import { z } from "zod";

export const profileSetupSchema = z.object({
  displayName: z.string().trim().min(1, "Display name is required"),
  timezone: z.string().trim().min(1, "Timezone is required"),
  currency: z.string().trim().min(1, "Currency is required"),
});

export type ProfileSetupFormValues = z.infer<typeof profileSetupSchema>;
