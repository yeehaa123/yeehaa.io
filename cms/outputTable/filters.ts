import type { AnalyzedTable } from "./"
import { isArticle, isCourse, isSeries } from "../entity/filters";
export function findCourseForArticle(table: AnalyzedTable, title: string) {
  return table
    .filter(isCourse)
    .find(other => other.meta.habitat === title ||
      other.meta.title === title)
}

export function findArticleforCourse(table: AnalyzedTable, habitat: string) {
  return table
    .filter(isArticle)
    .find(other => other.meta.title === habitat)
}

export function findArticlesForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isArticle)
    .filter(other => other.meta.author === author)
}

export function findCoursesForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isCourse)
    .filter(other => other.meta.author === author)
}

export function findSeriesForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isSeries)
    .filter(other => other.meta.author === author)
}


export function findSeriesForArticle(table: AnalyzedTable, series: string) {
  return table
    .filter(isArticle)
    .filter(other => other.meta.series === series)
}
