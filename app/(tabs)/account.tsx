import { View, StyleSheet } from 'react-native';

import SignOut from '~/components/SignOut';
export default function AccountTab() {
  return (
    <View style={styles.container}>
      <SignOut />
    </View>
  );
}

// Convert your styles to a StyleSheet, which is the recommended way to style components in React Native
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
