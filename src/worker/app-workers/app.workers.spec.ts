import { AppWorkers } from './app.workers';
import { WorkerMessage } from './shared/worker-message.model';
import { WORKER_TOPIC } from './shared/worker-topic.constants';

class MockWorker {
  currentMessage: WorkerMessage;
  constructor() { }
  postMessage(message: any, transfer?: any[]): void {
    this.currentMessage = message;
  }
}

describe('AppWorkers', () => {
  let mockWorker: MockWorker;
  let appWorkers: AppWorkers;

  beforeEach(() => {
    mockWorker = new MockWorker();
    appWorkers = new AppWorkers(mockWorker);
  });

  describe('AppWorkers Interface', () => {

    it('AppWorkers#workerCtx should be defined', () => {
      expect(appWorkers.workerCtx).toBeDefined('Worker context has been defined');
    });

    it('AppWorkers#created should be defined and truthy', () => {
      expect(appWorkers.created).toBeDefined('Worker created has been defined');
      expect(appWorkers.created).toBeTruthy('Worker created time has been set');
    });

    it('AppWorkers#workerBroker should be defined and truthy', () => {
      expect(appWorkers.workerBroker).toBeDefined('Worker broker has been defined');
      expect(appWorkers.workerBroker).toBeTruthy('Worker broker has been set');
    });
  });

  describe('AppWorkers#workerBroker', () => {

    it('AppWorkers with topic cpuIntensive should return a message', () => {
      const workerMessage = new WorkerMessage(WORKER_TOPIC.cpuIntensive, {duration:10});
      const mockEvent = { data: workerMessage } as MessageEvent;
      appWorkers.workerBroker(mockEvent);
      expect(mockWorker.currentMessage.topic.toString()).toEqual('cpuIntensive');
    });

  });

});
