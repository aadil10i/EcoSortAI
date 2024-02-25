import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import { supabase } from '~/utils/supabase';

export default function SignOut() {
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
