export default {
  async fetch(request: Request, _env, ctx) {
    {
      const res = await caches.default.match(request);
      if (res) {
        console.log(`CacheHit: [${request.url}]`);
        return res;
      }
    }

    const url = new URL(request.url);
    const age = url.searchParams.get('age') ?? '10';

    console.log(`CacheMiss: [${request.url}]`);
    const res = new Response(JSON.stringify({ date: new Date().toISOString() }, undefined, 2), {
      headers: { 'cache-control': `s-maxage=${age}` },
    });

    ctx.waitUntil(caches.default.put(request, res.clone()));

    return res;
  },
} satisfies ExportedHandler<object>;
