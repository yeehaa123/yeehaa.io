import { Status, type Meta } from "../meta"

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
      if (a.publishedAt && b.publishedAt) {
        return a.publishedAt.getTime() - b.publishedAt.getTime();
      } else {
        return -1
      }
    }).map((tableRow, order) => {
      return { ...tableRow, order }
    })
  })
}

