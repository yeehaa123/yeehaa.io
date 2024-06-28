export enum OGType {
  WEBSITE = "website",
  ARTICLE = "article"
}

type Props = {
  title: string,
  url: URL,
  type: "website" | "article",
  description: string,
  author?: string | undefined,
  publishedAt?: Date | undefined,
  updatedAt?: Date | undefined,
  tags?: string[]
}

export function BaseHead({
  url,
  title,
  type,
  description,
  author,
  publishedAt,
  updatedAt,
  tags,
}: Props) {
  const ogImageURL = `${url}og.png`
  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:site_name" content="YEEHAA" />

      <meta property="og:url" content={url.toString()} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageURL} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={url.pathname} />
      <meta property="twitter:url" content={url.toString()} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageURL} />

      {type === OGType.ARTICLE &&
        <>
          <meta name="author" content={author} />
          <meta property="article:published_time" content={publishedAt?.toISOString()} />
          <meta property="article:modified_time" content={updatedAt?.toISOString()} />
          <meta property="article:tag" content={tags?.join(" ")} />
        </>}
    </>
  )
}
