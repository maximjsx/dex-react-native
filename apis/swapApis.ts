import axios from 'axios';
import { SwapPriceApiResponse, SwapPriceApiPayload } from '@/types/priceTypes';
import { SwapQuoteApiPayload, SwapQuoteApiResponse } from '@/types/quoteTypes';

const headers = {
  '0x-api-key': process.env.EXPO_PUBLIC_0X_API_KEY,
  '0x-version': 'v2',
};

export const getSwapPrice = async (
  params: SwapPriceApiPayload
): Promise<SwapPriceApiResponse> => {
  const API_URL = `${process.env.EXPO_PUBLIC_0X_API_DOMAIN}/swap/permit2/price`;
  const response = await axios.get(API_URL, {
    headers,
    params,
  });
  return response.data;
};

export const getSwapQuote = async (
  params: SwapQuoteApiPayload
): Promise<SwapQuoteApiResponse> => {
  const API_URL = `${process.env.EXPO_PUBLIC_0X_API_DOMAIN}/swap/permit2/quote`;
  const response = await axios.get(API_URL, {
    headers,
    params,
  });
  return response.data;
};
