import backendAPI from '../../../utils/backendAPI';
import errorHandler from '../../../utils/errorHandler';
import { logToDataDogServer } from '../../../utils/logToDatadog';

//
export default async (req, res) => {
  const emailToken = req.cookies?.['email-token'];
  try {
    let body = req.body;
    if (typeof body === 'string') {
      // Needed because some existing code calls this using content-type=text/plain
      // (instead of application/json)
      body = JSON.parse(req.body);
    }

    const { email } = body;

    if (!email) {
      res.send(false);
    }

    console.log('generate nonce here');

    const response = await backendAPI.post(
      '/v1/api/admin/order/checkByEmail',
      { email },
      { headers: { 'X-Email-Token': emailToken } },
    );
    if (response.status === 404) {
      // Email wasn't found, but don't expose this fact to the frontend.
      return res.send(200);
    } else if (response.status === 403) {
      return res.send(403); //this is used to indicate 'not eligible' state to show frontend proper messaging
    }
    if (!response) throw new Error('Unexpected error checking order by email');

    if (response.code && response.code >= 400) {
      const errorMessage = response.message || 'Error checking order by email';
      throw new Error(errorMessage);
    }

    return res.send(response.status);
  } catch (error) {
    logToDataDogServer(
      'my_account',
      'Error checking order by email on My Order.',
      {
        emailToken,
        error,
      },
    );
    errorHandler({
      error,
      crumb: {
        category: 'check-email api',
        message: 'Error checking order by email for my account',
        data: error,
      },
    });
    res.status(500).send({ error });
  }
};
