import { unstable_startWorker } from 'wrangler';

const worker1 = await unstable_startWorker({
  config: '../workflows-from-workers/workflows/wrangler.jsonc',
});

const worker2 = await unstable_startWorker({
  config: '../workflows-from-workers/workers/wrangler.jsonc',
});

console.log(worker1.config.bindings);
console.log(worker2.config.bindings);
