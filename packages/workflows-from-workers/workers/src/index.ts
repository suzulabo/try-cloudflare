/// <reference types="@cloudflare/workers-types" />

import type { Workflow1Runner } from '../../workflows/src';

interface Env {
  WORKFLOW1_RUNNER: Workflow1Runner;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    switch (url.pathname) {
      case '/workflow1': {
        const wf = await env.WORKFLOW1_RUNNER.createInstance();
        return Response.json(wf);
      }
    }

    return Response.json({}, { status: 404 });
  },
};
