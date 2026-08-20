import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || /^[0-9+\-\s]{7,}$/.test(v),
      "Enter a valid phone number (7+ digits) or leave it blank"
    ),
  openingBalance: z.coerce
    .number({ invalid_type_error: "Opening balance must be a number" })
    .refine((v) => Number.isFinite(v), "Opening balance must be a valid number"),
  notes: z.string().trim().max(200, "Notes must be under 200 characters").optional().or(z.literal("")),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
