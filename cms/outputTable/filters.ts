import type { AnalyzedTable } from "./"
import { isArticle, isCourse, isProfile, isSeries } from "../entity/filters";

export function findCourseForArticle(table: AnalyzedTable, title: string) {
  return table
    .filter(isCourse)
    .find(other => {
      return other.meta.habitat === title ||
        other.meta.title === title
    })
}

export function findArticleForCourse(table: AnalyzedTable, habitat: string) {
  return table
    .filter(isArticle)
    .find(other => other.meta.title === habitat)
}

export function findArticlesForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isArticle)
    .filter(other => other.meta.author === author)
}

export function findArticlesForTag(table: AnalyzedTable, tag: string) {
  return table
    .filter(isArticle)
    .filter(other => other.analysis.tags.find(t => t === tag))
}

export function findCoursesForTag(table: AnalyzedTable, tag: string) {
  return table
    .filter(isCourse)
    .filter(other => other.analysis.tags.find(t => t === tag))
}

export function findProfilesForTag(table: AnalyzedTable, tag: string) {
  return table
    .filter(isProfile)
    .filter(other => other.analysis.tags.find(t => t === tag))
}

export function findProfileForAuthor(table: AnalyzedTable, author: string) {
  return table
    .filter(isProfile)
    .find(other => other.meta.author === author)
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


export function findArticlesForSeries(table: AnalyzedTable, series: string) {
  return table
    .filter(isArticle)
    .filter(other => other.meta.series === series)
}

export function findCoursesForSeries(table: AnalyzedTable, series: string) {
  return table
    .filter(isCourse)
    .filter(other => other.meta.series === series)
}
