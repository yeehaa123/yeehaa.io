export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  console.log(request);

  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const { courseIds } = body;

    console.log(courseIds);


    return new Response(JSON.stringify({
      error: "unauthorized"
    }), { status: 404 })
  }
  return new Response(null, { status: 400 });
}
