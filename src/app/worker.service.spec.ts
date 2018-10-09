import { TestBed, inject } from '@angular/core/testing';

import { WorkerService } from './worker.service';
import { WorkerMessage } from 'src/worker/app-workers/shared/worker-message.model'

describe('WorkerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkerService]
    });
  });

  it('should be created', inject([WorkerService], (service: WorkerService) => {
    expect(service).toBeTruthy();
  }));

  it('doWork should have been called', inject([WorkerService], (service: WorkerService) => {
    spyOn(service, 'doWork');
    service.doWork(new WorkerMessage('cpuIntensive',''));
    expect(service.doWork).toHaveBeenCalled();
  }));
});
