import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default function AmountInput() {
  const [number, setNumber] = useState('');

  const handleInputChange = (input: string) => {
    // Allow only numbers
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    setNumber(sanitizedInput);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={number}
        style={styles.input}
        keyboardType='numeric'
        placeholder='Enter amount'
        onChangeText={handleInputChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    width: '100%',
    height: 45,
    fontSize: 20,
    fontWeight: 500,
    color: '#333',
  },
});
