import { getCollection } from 'astro:content';
import { getEntry } from "astro:content";

export async function getPosts() {
  const articles = (await getCollection('Posts')).reverse();
  const promises = articles.map(async (article) => {
    const { data } = article;
    const seriesRef = data.series
    if (!seriesRef) { return { ...article, data: { ...data, order: undefined } } }
    return {
      ...article,
      data
    }
  })
  return await Promise.all(promises)
}

export async function getPostsWithCourse() {
  const articles = await getPosts();
  const promises = articles.map(async (article) => {
    const { data } = article;
    const coursesRef = data.course
    if (!coursesRef) { return { ...article, data: { ...data, course: undefined } } }
    const course = await getEntry(coursesRef);
    return {
      ...article,
      data: {
        ...data,
        course: {
          ...course.data,
        }
      }
    }
  })
  return await Promise.all(promises)
}
