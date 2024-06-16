interface Props {
  courseId: string,
  onClick: () => void
}

export default function CardMeta({ courseId, onClick, }: Props) {
  return (
    <dl className="px-2 grid grid-cols-[10%_90%] text-gray-500 text-xs" onClick={onClick} >
      <dt>ID</dt>
      <dd>{courseId}</dd>
      <dt>Site URL</dt>
      <dd>{courseId}</dd>
    </dl>
  )
}
