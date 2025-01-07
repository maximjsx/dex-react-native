import { useSendTransaction } from 'wagmi';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Address } from 'viem';
import { Transaction } from '@/types/quoteTypes';
import { Fragment } from 'react';
import { Link } from 'expo-router';

type Props = {
  transaction: Transaction;
};

export default function OrderButton({ transaction }: Props) {
  const { data, sendTransaction } = useSendTransaction();

  console.log('TX', data);

  const handleSendTransaction = () => {
    sendTransaction({
      to: transaction.to as Address,
      value: BigInt(transaction.value),
      data: transaction.data as Address,
    });
  };

  return (
    <Fragment>
      {data ? (
        <Link
          style={styles.button}
          href={`https://polygonscan.com/tx/${data}`} // Pass scan dynamicly based on network
        >
          Check transaction
        </Link>
      ) : (
        <Pressable onPress={handleSendTransaction} style={styles.button}>
          <Text style={styles.text}>Confirm order</Text>
        </Pressable>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
});
