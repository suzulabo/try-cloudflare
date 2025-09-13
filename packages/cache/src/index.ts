export default {
  fetch() {
    const data = { message: 'Hello at ' + new Date().toISOString() };
    const res = new Response(JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
        'Cache-Control': 'public, s-maxage=86400, immutable',
      },
    });
    return res;
  },
};
