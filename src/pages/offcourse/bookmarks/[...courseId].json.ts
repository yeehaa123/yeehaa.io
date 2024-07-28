export const prerender = false;
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ params, request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const { courseId } = params;

    console.log(courseId);

    return new Response(JSON.stringify(
      { courseId }
    ), { status: 201 })
  }


  // return new Response(JSON.stringify({
  //   error: "unauthorized"
  // }), { status: 404 })
  return new Response(null, { status: 400 });
}

export const DELETE: APIRoute = async ({ params, request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const { courseId } = params;

    console.log(courseId);

    return new Response(JSON.stringify(
      { courseId }
    ), { status: 202 })
  }


  // return new Response(JSON.stringify({
  //   error: "unauthorized"
  // }), { status: 404 })
  return new Response(null, { status: 400 });
}
