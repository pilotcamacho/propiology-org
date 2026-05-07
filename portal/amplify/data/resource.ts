import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      email: a.string().required(),
      fullName: a.string(),
      languagePreference: a.enum(['en', 'es']),
      subscriptionStatus: a.enum(['active', 'unsubscribed', 'pending']),
      journeyStage: a.enum(['darkness', 'glimpse', 'inner_light', 'mastery', 'illumination']),
      avatarUrl: a.string(),
      practitionerId: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']).to(['read', 'update', 'delete']),
    ]),

  Practitioner: a
    .model({
      userId: a.string().required(),
      name: a.string().required(),
      bio: a.string(),
      bioEs: a.string(),
      languagesOffered: a.string().array(),
      specialties: a.string().array(),
      profileImageUrl: a.string(),
      contactEmail: a.string(),
      website: a.string(),
      rating: a.float(),
      reviewCount: a.integer(),
      availabilityStatus: a.enum(['available', 'busy', 'unavailable']),
      timezone: a.string(),
      isApproved: a.boolean(),
      testimonials: a.hasMany('Testimonial', 'practitionerId'),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.owner(),
      allow.groups(['Admin']).to(['read', 'update', 'delete']),
    ]),

  Testimonial: a
    .model({
      practitionerId: a.string().required(),
      practitioner: a.belongsTo('Practitioner', 'practitionerId'),
      text: a.string().required(),
      authorName: a.string().required(),
      rating: a.integer().required(),
      language: a.enum(['en', 'es']),
      status: a.enum(['pending', 'approved', 'rejected']),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.authenticated().to(['create']),
      allow.groups(['Admin']).to(['read', 'update', 'delete']),
    ]),

  GatedResource: a
    .model({
      title: a.string().required(),
      titleEs: a.string(),
      description: a.string(),
      descriptionEs: a.string(),
      s3FilePath: a.string().required(),
      language: a.enum(['en', 'es', 'both']),
      resourceType: a.enum(['pdf', 'audio', 'quiz', 'worksheet', 'workbook']),
      isActive: a.boolean(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(['read']),
      allow.groups(['Admin']),
    ]),

  NewsletterSubscription: a
    .model({
      email: a.string().required(),
      fullName: a.string(),
      language: a.enum(['en', 'es']),
      status: a.enum(['active', 'unsubscribed', 'bounced']),
      journeyStage: a.enum(['darkness', 'glimpse', 'inner_light', 'mastery', 'illumination']),
      tags: a.string().array(),
      leadSource: a.string(),
    })
    .authorization((allow) => [
      allow.groups(['Admin']),
    ]),

  Booking: a
    .model({
      practitionerId: a.string().required(),
      requesterEmail: a.string().required(),
      requesterName: a.string().required(),
      message: a.string(),
      preferredLanguage: a.enum(['en', 'es']),
      status: a.enum(['pending', 'confirmed', 'cancelled', 'completed']),
      scheduledAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
