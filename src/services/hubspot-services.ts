import { protectedAPIRequest } from '@/lib/queryClient';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const hubspotAuthorize = async () => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/hubspot/authorize`
  );
  return response.json();
};

const hubspotCallback = async (code: string) => {
  const response = await protectedAPIRequest(
    'POST',
    `${BASE_URL}/hubspot/callback?code=${code}`
  );
  return response.json();
};

const getHubspotAccessToken = async (): Promise<{
  hubspot_access_token: string;
}> => {
  const response = await protectedAPIRequest(
    'GET',
    `${BASE_URL}/hubspot/access-token`
  );
  return response.json();
};
export { hubspotAuthorize, hubspotCallback, getHubspotAccessToken };
