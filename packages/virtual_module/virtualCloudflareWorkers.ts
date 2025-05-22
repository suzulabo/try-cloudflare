/// <reference types="@cloudflare/workers-types" />

export interface WorkflowEvent<T> {
  payload: Readonly<T>;
  timestamp: Date;
  instanceId: string;
}

export type WorkflowDurationLabel =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';
export type WorkflowSleepDuration = `${number} ${WorkflowDurationLabel}${'s' | ''}` | number;
export type WorkflowDelayDuration = WorkflowSleepDuration;
export type WorkflowTimeoutDuration = WorkflowSleepDuration;
export type WorkflowBackoff = 'constant' | 'linear' | 'exponential';

export interface WorkflowStepConfig {
  retries?: {
    limit: number;
    delay: WorkflowDelayDuration | number;
    backoff?: WorkflowBackoff;
  };
  timeout?: WorkflowTimeoutDuration | number;
}

export class WorkflowStep {
  constructor() {
    this.sleep = () => {
      throw new Error('Method not implemented.');
    };
  }

  do<T extends Rpc.Serializable<T>>(name: string, callback: () => Promise<T>): Promise<T>;
  do<T extends Rpc.Serializable<T>>(
    name: string,
    config: WorkflowStepConfig,
    callback: () => Promise<T>,
  ): Promise<T>;
  async do<T extends Rpc.Serializable<T>>(
    _name: string,
    configOrCallback: WorkflowStepConfig | (() => Promise<T>),
    maybeCallback?: () => Promise<T>,
  ): Promise<T> {
    if (maybeCallback) {
      return maybeCallback();
    }
    if (typeof configOrCallback === 'function') {
      return configOrCallback();
    }

    throw new Error('No callback');
  }

  sleep: (name: string, duration: WorkflowSleepDuration) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export class WorkflowEntrypoint<Env = unknown, T extends Rpc.Serializable<T> | unknown = unknown> {
  protected ctx: ExecutionContext;
  protected env: Env;
  constructor(ctx: ExecutionContext, env: Env) {
    this.ctx = ctx;
    this.env = env;
  }
  run(event: Readonly<WorkflowEvent<T>>, step: WorkflowStep): Promise<unknown> {
    console.log(event, step);
    return Promise.resolve();
  }
}
