import { CoinIcon } from './CoinIcon';
import React, { useState } from 'react';
import { SvgUri } from 'react-native-svg';

type Props = {
  uri: string | undefined;
};

export default function TokenIcon({ uri }: Props) {
  const [error, setError] = useState(false);

  if (!uri || error) {
    return <CoinIcon />;
  }

  return (
    <SvgUri
      width={25}
      height={25}
      uri={uri}
      fallback={<CoinIcon />}
      onError={() => {
        setError(true);
      }}
    />
  );
}
