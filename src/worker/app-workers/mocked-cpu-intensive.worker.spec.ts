import { MockedCpuIntensiveWorker } from './mocked-cpu-intensive.worker';
import { WorkerMessage } from './shared/worker-message.model';

describe('MockedCpuIntensiveWorker', () => {

    it('Should have doWork method defined', () => {
      expect(MockedCpuIntensiveWorker.doWork).toBeDefined();
    });

    it('Should perform doWork operation', () => {
      let workerMessage = {topic:'cpuIntensive', data:{duration:10}};
      expect(MockedCpuIntensiveWorker.doWork(WorkerMessage.getInstance(workerMessage)).data.iteration).toBeGreaterThan(0);
    });

})
