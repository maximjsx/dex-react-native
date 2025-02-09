import axios from 'axios';

const headers = {
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_1INCH_API_KEY}`,
};

export const getTokens = async ({
  chainId,
}: {
  chainId: number | undefined;
}): Promise<any> => {
  const API_URL = `${process.env.EXPO_PUBLIC_1INCH_API_DOMAIN}/token/v1.2/${chainId}/token-list`;
  const response = await axios.get(API_URL, {
    headers,
  });
  return response.data;
};
