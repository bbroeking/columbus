import { Pipe, PipeTransform } from '@angular/core';

export interface QueueItem {
  startTime: any; // timestamp
  endTime: any; // timestamp
  type: string;
}
@Pipe({
  name: 'queueHandler'
})
export class QueueHandlerPipe implements PipeTransform {

  transform(value: QueueItem, ...args: unknown[]) {
    const now = Date.now() / 1000;
    const startTime = new Date(value.startTime.seconds);
    const endTime = new Date(value.endTime.seconds);
    const percentage = (now - startTime.valueOf()) / (endTime.valueOf() - startTime.valueOf());
    return Math.round(percentage * 100)
  }

}
