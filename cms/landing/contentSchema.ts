import { z } from 'zod';

const item = z.object({
  title: z.string(),
  icon: z.string(),
  description: z.string(),
})

const cta = z.object({
  text: z.string(),
  action: z.string().optional()
})

const baseSection = z.object({
  title: z.string(),
})

const contentSection = baseSection.extend({
  description: z.string(),
  cta
})

export const landingContentInput = z.object({
  title: z.string(),
  sections: z.object({
    hero: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      cta: cta
    }),
    challenges: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      items: z.array(item)
    }),
    concepts: baseSection.extend({
      items: z.array(item)
    }),
    approach: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      items: z.array(item)
    }),
    case_study: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      key_points: z.array(z.object({ title: z.string(), description: z.string() })),
      testimonial: z.object({ quote: z.string(), author: z.string() }),
      cta
    }),
    services: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      items: z.array(item.extend({
        features: z.record(z.string(), z.string()),
      })),
      cta
    }),
    products: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      items: z.array(item.extend({
        features: z.record(z.string(), z.string()),
      })),
      cta
    }),
    about: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      key_points: z.array(z.string()),
      cta
    }),
    recent_content: contentSection,
    faq: baseSection.extend({
      items: z.array(z.object({ question: z.string(), answer: z.string() }))
    }),
    main_cta: baseSection.extend({
      subtitle: z.string(),
      cta
    })
  })
})


export const landingContentSchema = landingContentInput.extend({
  courses: z.array(z.string()),
  articles: z.array(z.string()),
})
