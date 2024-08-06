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

export const landingContentInput = z.object({
  title: z.string(),
  sections: z.object({
    hero: baseSection.extend({
      subtitle: z.string(),
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
    about: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      key_points: z.array(z.string())
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
    case_study: baseSection.extend({
      subtitle: z.string(),
      description: z.string(),
      key_points: z.array(z.string()),
      cta
    }),
    main_cta: baseSection.extend({
      subtitle: z.string(),
      cta
    })
  })
})


export const landingContentSchema = landingContentInput;
