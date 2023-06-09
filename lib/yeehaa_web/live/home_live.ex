defmodule YeehaaWeb.HomeLive do
  use YeehaaWeb, :live_view
  import YeehaaWeb.HomepageHelperComponents

  def render(assigns) do
    ~H"""
    <div>
      <.inner_section class="md:py-12 lg:py-24 xl:py-48 text-white mx-8">
        <.heading>Innovation does not begin</.heading>
        <.heading>with radical, structural transformation</.heading>
        <.heading class="mt-24">It starts with barely perceptible shifts</.heading>
      </.inner_section>
      <.outer_section class="bg-sun text-curtains">
        <.inner_section>
          <.heading>THIS IS YEEHAA</.heading>
          <h2 class="text-6xl">Creating the sound that brings harmony to dissonant structures</h2>
          <p class="text-4xl">By doing</p>
          <div class="flex justify-between text-4xl">
            <p>THIS</p>
            <p>THIS</p>
            <p>THIS</p>
          </div>
        </.inner_section>
      </.outer_section>
      <div class="bg-sun">
        <.outer_section class="bg-fire text-dark">
          <.inner_section>
            <h1 class="text-6xl">WITHOUT ONGOING ALIGNMENT ALL CLOSED SYSTEMS FALL INTO ENTROPY</h1>
          </.inner_section>
        </.outer_section>
      </div>
      <div class="bg-fire">
        <.outer_section class="bg-purp text-white">
          <.inner_section>
            <h1 class="text-6xl">Our solutions are based on</h1>
            <div class="flex justify-between text-4xl">
              <p>THIS</p>
              <p>THIS</p>
              <p>THIS</p>
            </div>
          </.inner_section>
        </.outer_section>
      </div>
      <div class="bg-purp">
        <.outer_section class="bg-sun text-curtains">
          <.inner_section>
            <h1 class="text-6xl">THE PROOF IS IN THE PUDDING</h1>
            <div class="flex justify-between text-4xl">
              <p>Case + Testimonial</p>
              <p>Case + Testimonial</p>
              <p>Case + Testimonial</p>
            </div>
          </.inner_section>
        </.outer_section>
      </div>
      <div class="bg-sun">
        <.outer_section class="bg-curtains text-white">
          <.inner_section>
            <h1 class="text-6xl">Contact Info</h1>
          </.inner_section>
        </.outer_section>
      </div>
    </div>
    """
  end
end
