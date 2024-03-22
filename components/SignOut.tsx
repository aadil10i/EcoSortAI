import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { supabase } from '~/utils/supabase';

export default function SignOut() {
  return (
    <View>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
