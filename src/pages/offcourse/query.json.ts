export const prerender = false;

import { handleQuery } from '@/offcourse/db/query';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {

  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const data = await handleQuery(body);
    return new Response(JSON.stringify(
      data
    ), { status: 200 })
  }
  return new Response(null, { status: 400 });
}
