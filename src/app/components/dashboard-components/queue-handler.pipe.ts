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
    if(value){
      const now = Date.now();
      const percentage = (now - value.startTime) / (value.endTime - value.startTime);
      if (percentage < 0)
        return 0;
      if (percentage > 1)
        return 100;
      return Math.round(percentage * 100);  
    }
    return
  }

}
