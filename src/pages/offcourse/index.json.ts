export const prerender = false;
import type { APIRoute } from 'astro';
import { result } from "@/db/queries"

export const POST: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { courseIds } = body;

    const courseData = courseIds.map((courseId: string) => {
      return {
        courseId,
        isBookmarked: !!result.find(record => courseId === record.courseId)
      }
    })
    return new Response(JSON.stringify(
      courseData
    ), { status: 200 })
  }


  // return new Response(JSON.stringify({
  //   error: "unauthorized"
  // }), { status: 404 })
  return new Response(null, { status: 400 });
}
