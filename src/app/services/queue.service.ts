import { Injectable } from '@angular/core';
import { BUILDINGS, Structure } from '../constants/buildings';
import { TROOPS, TROOP_MODEL } from '../constants/troops';
import { StructureType } from '../interfaces/structure-type';

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

  prepareStructureItem(selectedStructure: StructureType) {
    const structure = selectedStructure.toString();
    let build: Structure = BUILDINGS[structure];
    let buildTime: number = build.buildTime;
    let currentTime: number = Date.now();

    const newQueueItem = {
      type: selectedStructure.toString(),
      startTime: currentTime,
      endTime: currentTime + buildTime,
      buildTime: buildTime
    }

    return newQueueItem;
  }

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
