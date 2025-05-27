/// <reference types="@cloudflare/workers-types" />

import {
  WorkerEntrypoint,
  WorkflowEntrypoint,
  type WorkflowEvent,
  WorkflowStep,
} from 'cloudflare:workers';

interface Env {
  WORKFLOW1: Workflow;
}

let globalValue = 0;

export class Workflow1 extends WorkflowEntrypoint<Env, Params> {
  override async run(_event: WorkflowEvent<Params>, step: WorkflowStep) {
    console.log('Run Workflow1');
    await step.do('increment global', async () => {
      globalValue++;
      console.log({ globalValue });
      return Promise.resolve(globalValue);
    });
  }
}

export class Workflow1Runner extends WorkerEntrypoint<Env> {
  async createInstance() {
    console.log('Create Workflow1');
    const res = await this.env.WORKFLOW1.create();
    return Promise.resolve(Response.json(res));
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    switch (url.pathname) {
      case '/workflow1': {
        const wf = await env.WORKFLOW1.create();
        return Response.json(wf);
      }
    }

    return Response.json({}, { status: 404 });
  },
};
