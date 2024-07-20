export const prerender = false;
import type { APIRoute } from 'astro';
import queryString from 'query-string';
import { insertCommand, result } from "@/db/queries"
import { userDataQuery } from "@/offcourse/schema";

export const GET: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {

    const { query } = (queryString.parseUrl(request.url))
    const { courseIds } = userDataQuery.parse(query)

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

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    insertCommand(body.action);
    return new Response(JSON.stringify(
      { body }
    ), { status: 200 })
  }


  // return new Response(JSON.stringify({
  //   error: "unauthorized"
  // }), { status: 404 })
  return new Response(null, { status: 400 });
}
