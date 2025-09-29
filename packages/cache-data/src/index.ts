export default {
  async fetch(request: Request, _env, ctx) {
    const url = new URL(request.url);

    const cacheKey = `http://my-data/${url.pathname}`;
    const age = url.searchParams.get('age') ?? '10';
    const ng = url.searchParams.has('ng');

    const data = await (async () => {
      const res = await caches.default.match(cacheKey);
      if (res) {
        console.log(`CacheHit: [${request.url}]`);
        if (res.ok) {
          const json: Record<string, string> = await res.json();
          return { ...json, status: 'hit' };
        } else {
          return { status: 'ng' };
        }
      }

      console.log(`CacheMiss: [${request.url}]`);

      return { date: new Date().toISOString(), status: 'miss', age, ng };
    })();

    const headers = { 'cache-control': `s-maxage=${age}` };

    if (data.status !== 'hit') {
      if (ng) {
        console.log('Set NG Cache');
        ctx.waitUntil(caches.default.put(cacheKey, new Response(null, { status: 404, headers })));
      } else {
        ctx.waitUntil(caches.default.put(cacheKey, Response.json(data, { headers })));
      }
    }

    const res = new Response(JSON.stringify(data, undefined, 2));

    return res;
  },
} satisfies ExportedHandler<object>;
