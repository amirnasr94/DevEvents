import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const validateCreateEventForm = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "Title is required." })
    .max(100, { error: "Title must not exceed 100 characters." }),

  date: z.string().min(1, { error: "Date is required." }),

  time: z.string().min(1, { error: "Time is required." }),

  venue: z
    .string()
    .trim()
    .min(1, { error: "Venue is required." })
    .max(200, { error: "Venue must not exceed 200 characters." }),

  mode: z.string().min(1, { error: "Please select an event mode." }),

  audience: z
    .string()
    .trim()
    .min(1, { error: "Audience is required." })
    .max(100, { error: "Audience must not exceed 100 characters." }),

  image: z
    .instanceof(File, { error: "Please upload an image." })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      error: "Only PNG, JPG, and JPEG images are allowed.",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: "Image size must be less than 5 MB.",
    }),

  tags: z
    .array(z.string().trim().min(1))
    .min(1, { error: "Please add at least one tag." }),
  agenda: z
    .array(z.string().trim().min(1))
    .min(1, { error: "Please add at least one tag." }),

  description: z
    .string()
    .trim()
    .min(10, { error: "Description must be at least 10 characters." })
    .max(1000, {
      error: "Description must not exceed 1000 characters.",
    }),
  overview: z
    .string()
    .trim()
    .min(10, { error: "Overview must be at least 10 characters." })
    .max(1000, {
      error: "Overview must not exceed 1000 characters.",
    }),
  organizer: z
    .string()
    .trim()
    .min(10, { error: "Organizer must be at least 10 characters." })
    .max(1000, {
      error: "Organizer must not exceed 1000 characters.",
    }),
});

export type CreateEventForm = z.infer<typeof validateCreateEventForm>;
