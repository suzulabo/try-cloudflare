export default {
  async fetch(request: Request, _env, ctx) {
    {
      const res = await caches.default.match(request);
      if (res) {
        console.log(`CacheHit: [${request.url}]`);
        return res;
      }
    }

    console.log(`CacheMiss: [${request.url}]`);
    const res = new Response(JSON.stringify({ date: new Date().toISOString() }));

    ctx.waitUntil(caches.default.put(request, res.clone()));

    return res;
  },
} satisfies ExportedHandler<object>;
