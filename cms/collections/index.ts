import type { AnalyzedTable } from "cms/outputTable";
import * as ss from "../series"
import * as t from "../tag"

export function deriveSeries(table: AnalyzedTable) {
  const seriesMap = table.filter(({ meta }) => meta.series && meta.author).reduce(
    (acc, item) => {
      acc.set(item.meta.series!, item.meta.author!);
      return acc;
    }, new Map<string, string>
  )
  return Array.from(seriesMap).map(([series, author]) => {
    return ss.init({ series, author })
  })
}
export function deriveTags(table: AnalyzedTable) {
  const allTags = table.flatMap(({ analysis }) => analysis.tags);
  return [...new Set([...allTags])].map(tagName => t.init({ tagName }));
}
