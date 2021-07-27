import { Injectable } from '@angular/core';
import { BUILDINGS, Structure } from '../constants/buildings';
import { RESEARCH } from '../constants/research';
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
    return this.updateQueue(queue, selectedTroop, buildTime);
  }

  prepareResearchItem(queue: QueueItem[], selectedResearch: string) {
    let research: RESEARCH = RESEARCH[selectedResearch];
    let buildTime: number = research.buildTime;
    return this.updateQueue(queue, selectedResearch, buildTime);
  }

  updateQueue(queue: QueueItem[], selected: string, buildTime: number) {
    if (queue.length == 0){
      let currentTime: number = Date.now();
      const newQueueItem: QueueItem = {
        type: selected,
        startTime: currentTime,
        endTime: currentTime + buildTime,
        buildTime: buildTime
      }
      return [newQueueItem];
    } else {
      let mostRecent: QueueItem = queue[queue.length - 1];
      let finishTime: number = mostRecent.endTime;
      const newQueueItem: QueueItem = {
        type: selected,
        startTime: finishTime,
        endTime: finishTime + buildTime,
        buildTime: buildTime
      }
      queue.push(newQueueItem);
      return queue;
    }
  }
}
