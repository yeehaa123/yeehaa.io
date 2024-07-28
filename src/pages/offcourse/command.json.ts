export const prerender = false;
import type { APIRoute } from 'astro';
import { handleCommand } from '@/offcourse/db/command';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const id = await handleCommand(body);
    return new Response(JSON.stringify(
      { id }
    ), { status: 201 })
  }
  return new Response(null, { status: 400 });
}
