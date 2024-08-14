export type FAQItem = {
  question: string,
  answer: string
}

type Props = {
  items: FAQItem[]
}

export function FAQ({ items }: Props) {
  return (
    <dl className="mt-10 space-y-8">
      {items.map((faq, index) => (
        <div key={index} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <dt className="text-base font-semibold leading-7 lg:col-span-5">{faq.question}</dt>
          <dd className="mt-4 lg:col-span-7 lg:mt-0">
            <p className="text-base leading-7 text-offblack">{faq.answer}</p>
          </dd>
        </div>
      ))}
    </dl>
  )
}
