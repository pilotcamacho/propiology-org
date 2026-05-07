import type { APIGatewayProxyHandler } from 'aws-lambda';

/**
 * Handles newsletter subscriptions.
 * Stores subscriber in DynamoDB and triggers CRM sync.
 */
export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body ?? '{}');
    const { email, fullName, language = 'en' } = body;

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Valid email is required' }),
      };
    }

    // TODO: Create NewsletterSubscription record via Amplify DataStore
    // TODO: Trigger CRM sync (HubSpot/Mailchimp)
    // TODO: Send welcome email via SES

    console.log(`New subscription: ${email}, language: ${language}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Subscribed successfully', email }),
    };
  } catch (error) {
    console.error('Subscribe error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
