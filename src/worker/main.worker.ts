/* <project-root>/src/worker/main.worker.ts */

import { AppWorkers } from './app-workers/app.workers';

export const worker = new AppWorkers(self);

addEventListener('message', ($event: MessageEvent) => {
  worker.workerBroker($event);
});
