import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { subscribeFunction } from './functions/subscribe/resource';
import { downloadFunction } from './functions/download/resource';

defineBackend({
  auth,
  data,
  subscribeFunction,
  downloadFunction,
});
