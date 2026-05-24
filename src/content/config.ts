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
    cardLayout: z.enum(['default', 'wide']).optional(),
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

// A link is either a live URL or the literal "coming-soon" sentinel,
// which the renderer turns into a disabled "Coming Soon" badge.
const appLink = z.union([z.string().url(), z.literal('coming-soon')]);

const apps = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    status: z.enum(['live', 'beta', 'coming-soon']),
    icon: z.string().optional(),
    platforms: z
      .array(z.enum(['iOS', 'iPadOS', 'Android', 'Web', 'macOS', 'Windows', 'Linux']))
      .default([]),
    license: z.string().optional(),
    order: z.number(),
    date: z.string(), // YYYY-MM
    links: z
      .object({
        appStore: appLink.optional(),
        googlePlay: appLink.optional(),
        web: z.string().url().optional(),
        github: z.string().url().optional(),
      })
      .optional(),
  }),
});

export const collections = { projects, work, certifications, apps };
