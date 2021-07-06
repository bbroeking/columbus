import { Injectable } from '@angular/core';
import { TROOPS, TROOP_MODEL } from '../constants/troops';

export interface QueueItem {
  type: string,
  startTime: number,
  endTime: number,
  buildTime: number
}

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor() { }

  prepareBarracksItem(queue: QueueItem[], selectedTroop: string) {
    let build: TROOP_MODEL = TROOPS[selectedTroop];
    let buildTime: number = build.buildTime;

    if (queue.length == 0){
      let currentTime: number = Date.now();
      const newQueueItem: QueueItem = {
        type: selectedTroop,
        startTime: currentTime,
        endTime: currentTime + buildTime,
        buildTime: buildTime
      }
      return [newQueueItem];
    } else {
      let mostRecent: QueueItem = queue[queue.length - 1];
      let finishTime: number = mostRecent.endTime;
      const newQueueItem: QueueItem = {
        type: selectedTroop,
        startTime: finishTime,
        endTime: finishTime + buildTime,
        buildTime: buildTime
      }
      queue.push(newQueueItem);
      return queue;
    }
  }
}
