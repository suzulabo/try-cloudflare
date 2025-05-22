/// <reference types="@cloudflare/workers-types" />

import { WorkflowEntrypoint } from 'cloudflare:workers';

interface Env {
  WORKFLOW1: Workflow;
}

export class Workflow1 extends WorkflowEntrypoint<Env, Params> {
  override async run() {
    console.log('Run Workflow1');
    return Promise.resolve('');
  }
}
