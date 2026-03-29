import { z, defineCollection } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tagline: z.string().optional(),
    icon: z.string().optional(),
    tags: z.array(z.string()),
    status: z.enum(['active', 'completed', 'archived']),
    category: z.enum(['sysadmin', 'coding', 'hobby']),
    featured: z.boolean().default(false),
    date: z.string(), // YYYY-MM
    links: z
      .object({
        github: z.string().url().optional(),
        live: z.string().url().optional(),
      })
      .optional(),
    award: z
      .object({
        name: z.string(),
        badge: z.string().optional(),
      })
      .optional(),
    milestones: z
      .array(
        z.object({
          text: z.string(),
          state: z.enum(['done', 'active', 'upcoming']),
        })
      )
      .optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    order: z.number(), // 1 = most recent
  }),
});

const certifications = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    issued: z.string().optional(),
    expires: z.string().optional(),
    credly_url: z.string().url().optional(),
    badge_image: z.string().optional(),
    status: z.enum(['active', 'in-progress']),
    order: z.number(),
  }),
});

export const collections = { projects, work, certifications };
