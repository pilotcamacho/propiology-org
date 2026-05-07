import { defineFunction } from '@aws-amplify/backend';

export const downloadFunction = defineFunction({
  name: 'download',
  entry: './handler.ts',
  timeoutSeconds: 30,
  memoryMB: 256,
});
