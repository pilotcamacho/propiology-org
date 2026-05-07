import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: 'CODE',
      verificationEmailSubject: 'Welcome to Propiology - Verify your email',
      verificationEmailBody: (createCode) =>
        `Your verification code is: ${createCode()}`,
    },
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
    'custom:language_preference': {
      dataType: 'String',
      mutable: true,
    },
    'custom:journey_stage': {
      dataType: 'String',
      mutable: true,
    },
    'custom:is_practitioner': {
      dataType: 'String',
      mutable: true,
    },
  },
  groups: ['Admin', 'Practitioners'],
  multifactor: {
    mode: 'OPTIONAL',
    totp: true,
  },
});
