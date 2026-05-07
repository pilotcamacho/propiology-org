import { defineFunction } from '@aws-amplify/backend';

export const subscribeFunction = defineFunction({
  name: 'subscribe',
  entry: './handler.ts',
  timeoutSeconds: 30,
  memoryMB: 256,
});
