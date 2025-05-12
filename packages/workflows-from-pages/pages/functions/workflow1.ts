/// <reference types="@cloudflare/workers-types" />

import type { Workflow1Runner } from '../../workflows/src';

// https://developers.cloudflare.com/workflows/build/call-workflows-from-pages/

interface Env {
  WORKFLOW1_RUNNER: Workflow1Runner;
}

export const onRequest = async (context: EventContext<Env, string, unknown>) => {
  const res = await context.env.WORKFLOW1_RUNNER.createInstance();

  return Response.json(res);
};
