'use client';

import { configureAmplify } from '@/lib/amplify';

// Configure Amplify once on the client side using amplify_outputs.json
configureAmplify();

export default function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
