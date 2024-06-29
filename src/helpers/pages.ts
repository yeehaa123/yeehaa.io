import { getCollection } from 'astro:content';
import { getEntry } from "astro:content";

export async function getPosts() {
  const articles = (await getCollection('Posts')).reverse();
  const promises = articles.map(async (article) => {
    const { data, slug } = article;
    const seriesRef = data.series
    if (!seriesRef) { return { ...article, data: { ...data, order: undefined } } }
    const series = await getEntry(seriesRef);
    const order = series.data.articles.findIndex(article => article.slug === slug);
    return {
      ...article,
      data: {
        ...data,
        order
      }
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
    const curatorRef = course.data.curator
    const curator = await getEntry(curatorRef);
    return {
      ...article,
      data: {
        ...data,
        course: {
          ...course.data,
          curator: curator.data
        }
      }
    }
  })
  return await Promise.all(promises)
}
