import { QueueHandlerPipe } from './queue-handler.pipe';

describe('QueueHandlerPipe', () => {
  it('create an instance', () => {
    const pipe = new QueueHandlerPipe();
    expect(pipe).toBeTruthy();
  });
});
