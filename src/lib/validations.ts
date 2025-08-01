import { z } from "zod"

export const linkFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  links: z.array(z.object({
    title: z.string().min(1, "Link title is required"),
    url: z.string().url("Please enter a valid URL"),
  })).min(1, "At least one link is required"),
})

export const themeSchema = z.object({
  name: z.string(),
  primaryColor: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
})

export type LinkFormData = z.infer<typeof linkFormSchema>
export type ThemeData = z.infer<typeof themeSchema> 