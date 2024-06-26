
export function SeriesHero({ }) {
  return <div class="flex flex-col lg:flex-row-reverse gap-x-8 w-full lg:w-11/12 xl:w-9/12 2xl:w-8/12 mx-auto">
    <Image class="w-full lg:w-1/2" src={data.profileImageURL} alt={title} loading="eager" />
    <div class="px-8 w-full flex flex-col justify-center gap-y-5 md:py-8 py-8 md:py-12">
      <h1 class="font-sans hover:font-serif md:text-5xl text-white dark:text-black text-4xl font-extrabold">
        {title}
      </h1>
      <p class="font-serif text-white dark:text-black">{description}</p>
    </div>
  </div>
  </div >
  }
