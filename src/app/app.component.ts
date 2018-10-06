import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkerService } from './worker.service';
import { WorkerMessage } from 'src/worker/app-workers/shared/worker-message.model';
import { WORKER_TOPIC } from '../worker/app-workers/shared/worker-topic.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'webworker-in-angular6';
  iterations = 0;
  workerTopic = WORKER_TOPIC.cpuIntensive;
  workerServiceSubscription: Subscription;

  constructor(private workerService: WorkerService) { }

  ngOnInit() {
    this.listenForWorkerResponse();
  }

  ngOnDestroy(): void {
    if (this.workerServiceSubscription) {
      this.workerServiceSubscription.unsubscribe();
    }
  }

  processInComponent() {
    this.iterations = this.cpuIntensiveCalc(3000).iteration;
  }

  processInWorker() {
    this.iterations = 0;
    const workerMessage = new WorkerMessage(this.workerTopic, { duration: 3000 });
    this.workerService.doWork(workerMessage);
  }

  private cpuIntensiveCalc(duration: number) {
    const before = new Date();
    let count = 0;
    while (true) {
      count++;
      const now = new Date();
      if (now.valueOf() - before.valueOf() > duration) {
        break;
      }
    }
    return { iteration: count };
  }

  private listenForWorkerResponse() {
    this.workerServiceSubscription = this.workerService.workerUpdate$
      .subscribe(data => this.workerResponseParser(data));
  }

  private workerResponseParser(message: WorkerMessage) {
    if (message.topic === this.workerTopic) {
      this.iterations = message.data.iteration;
    }
  }
}
