import type { Meta } from "../meta/schema"
import { Status } from "../meta/schema"

type SeriesMap = Map<string, Meta[]>

export function group(tableData: Meta[]) {
  return tableData.reduce(
    (acc: SeriesMap, tableRow: Meta) => {
      const { series, status } = tableRow;
      if (status !== Status.DRAFT && series) {
        const oldEntries = acc.get(series);
        const entries = oldEntries ? [...oldEntries, tableRow] : [tableRow];
        acc.set(series, entries);
      }
      return acc
    }, new Map)
}

export function order(seriesMap: SeriesMap) {
  return Array.from(seriesMap).flatMap(([_, series]) => {
    return series.sort((a, b) => {
      if (a.publicationData?.publishedAt && b.publicationData?.publishedAt) {
        return a.publicationData.publishedAt.getTime() - b.publicationData.publishedAt.getTime();
      } else {
        return -1
      }
    }).map((tableRow, order) => {
      return { ...tableRow, order }
    })
  })
}
