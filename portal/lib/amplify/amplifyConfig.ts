import { Amplify } from 'aws-amplify';

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
        identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID!,
        loginWith: {
          email: true,
        },
        signUpVerificationMethod: 'code',
        userAttributes: {
          email: { required: true },
          preferred_username: { required: false },
        },
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: false,
        },
      },
    },
    API: {
      GraphQL: {
        endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
        region: process.env.NEXT_PUBLIC_AWS_REGION ?? 'us-east-1',
        defaultAuthMode: 'userPool',
      },
    },
    Storage: {
      S3: {
        bucket: process.env.NEXT_PUBLIC_S3_BUCKET!,
        region: process.env.NEXT_PUBLIC_AWS_REGION ?? 'us-east-1',
      },
    },
  });
}
