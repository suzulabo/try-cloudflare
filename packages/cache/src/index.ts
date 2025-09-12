const html = `
hello world
`;

export default {
  fetch(): Response {
    return new Response(html, {
      headers: { 'content-type': 'text/html; charset=UTF-8' },
    });
  },
};
