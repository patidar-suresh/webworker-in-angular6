/* <project-root>/src/worker/app-workers/app.workers.ts */

import { MockedCpuIntensiveWorker } from './mocked-cpu-intensive.worker';
import { WorkerMessage } from './shared/worker-message.model';
import { WORKER_TOPIC } from './shared/worker-topic.constants';

export class AppWorkers {
  workerCtx: any;
  created: Date;

  constructor(workerCtx: any) {
    this.workerCtx = workerCtx;
    this.created = new Date();
  }

  workerBroker($event: MessageEvent): void {
    const { topic, data } = $event.data as WorkerMessage;
    const workerMessage = new WorkerMessage(topic, data);

    switch (topic) {
      case WORKER_TOPIC.cpuIntensive:
        this.returnWorkResults(MockedCpuIntensiveWorker.doWork(workerMessage));
        break;
      default:  // Add support for other workers here
        console.error('Topic Does Not Match');
    }
  }

  private returnWorkResults(message: WorkerMessage): void {
    this.workerCtx.postMessage(message);
  }
}
