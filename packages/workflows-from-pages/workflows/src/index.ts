/// <reference types="@cloudflare/workers-types" />

import {
  WorkerEntrypoint,
  WorkflowEntrypoint,
  type WorkflowEvent,
  WorkflowStep,
} from 'cloudflare:workers';

interface Env {
  workflow1: Workflow;
}

export class Workflow1 extends WorkflowEntrypoint<Env, Params> {
  override async run(_event: WorkflowEvent<Params>, step: WorkflowStep) {
    console.log('Run Workflow1');
    await step.do('hello', async () => {
      for (let i = 1; i <= 5; i++) {
        //
      }
      await step.do('nested1', () => {
        console.log('nested');
        return Promise.resolve('nested1');
      });
      return Promise.resolve('world');
    });
  }
}

export class Workflow1Runner extends WorkerEntrypoint<Env> {
  async createInstance() {
    console.log('Create Worker1');
    const res = await this.env.workflow1.create();
    return Promise.resolve(Response.json(res));
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    switch (url.pathname) {
      case '/workflow1': {
        const wf = await env.workflow1.create();
        return Response.json(wf);
      }
    }

    return Response.json({}, { status: 404 });
  },
};
