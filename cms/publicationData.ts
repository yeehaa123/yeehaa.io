import { z } from 'zod';

export const schema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
})

export const initSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().optional(),
})

export type InitPublicationData = z.infer<typeof initSchema>
export type PublicationData = z.infer<typeof schema>

export function init(publicationData?: InitPublicationData) {
  if (publicationData) {
    const { createdAt, publishedAt, updatedAt } = publicationData;
    return {
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      publishedAt: publishedAt ? new Date(publishedAt) : new Date,
    }
  } else {
    return {
      createdAt: new Date,
      updatedAt: new Date,
      publishedAt: new Date,
    };
  }
}
