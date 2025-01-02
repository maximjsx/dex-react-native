import axios from 'axios';
import { GetSwapPriceApiPayload, SwapPriceApiResponse } from '@/types/price';

const headers = {
  '0x-api-key': process.env.EXPO_PUBLIC_0X_API_KEY,
  '0x-version': 'v2',
};

export const getSwapPrice = async (
  params: GetSwapPriceApiPayload
): Promise<SwapPriceApiResponse> => {
  const API_URL = `${process.env.EXPO_PUBLIC_0X_API_DOMAIN}/swap/permit2/price`;
  const response = await axios.get(API_URL, {
    headers,
    params,
  });
  return response.data;
};
