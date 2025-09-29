export default {
  async fetch(request: Request, _env, ctx) {
    const url = new URL(request.url);

    const cacheKey = `http://my-data/${url.pathname}`;

    const data = await (async () => {
      const res = await caches.default.match(cacheKey);
      if (res) {
        console.log(`CacheHit: [${request.url}]`);
        if (res.ok) {
          return res.json();
        } else {
          return { status: 'ng' };
        }
      }

      console.log(`CacheMiss: [${request.url}]`);

      return { date: new Date().toISOString() };
    })();

    const age = url.searchParams.get('age') ?? '10';
    const ng = url.searchParams.has('ng');

    const headers = { 'cache-control': `s-maxage=${age}` };

    if (ng) {
      console.log('Set NG Cache');
      ctx.waitUntil(caches.default.put(cacheKey, new Response(null, { status: 404, headers })));
    } else {
      ctx.waitUntil(caches.default.put(cacheKey, Response.json(data, { headers })));
    }

    const res = new Response(JSON.stringify(data, undefined, 2));

    return res;
  },
} satisfies ExportedHandler<object>;
