/* <project-root>/src/worker/app-workers/mocked-cpu-intensive.worker.ts */

import { WorkerMessage } from './shared/worker-message.model';

export class MockedCpuIntensiveWorker {

  public static doWork(value: WorkerMessage): WorkerMessage {
    const before = new Date();
    let count = 0;
    while (true) {
      count++;
      const now = new Date();
      if (now.valueOf() - before.valueOf() > value.data.duration) {
        break;
      }
    }
    return new WorkerMessage(value.topic, { iteration: count });
  }
}
