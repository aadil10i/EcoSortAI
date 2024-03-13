import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { supabase } from '~/utils/supabase';

export default function HomeScreen() {
  const [binStatus, setBinStatus] = useState('Checking bin status...');

  useEffect(() => {
    const checkBinStatus = async () => {
      const { data, error } = await supabase.from('bin_status').select('is_full').maybeSingle();

      if (error) {
        console.error('Error fetching bin status:', error);
        setBinStatus('Error checking bin status');
        return;
      }

      if (data) {
        setBinStatus(data.is_full ? 'Bin full' : 'Bin not full');
      }
    };

    checkBinStatus();

    // Create a function to handle inserts
    const handleInserts = (payload: any) => {
      console.log('Change received!', payload);
      setBinStatus(payload.new.is_full ? 'Bin full' : 'Bin not full');
    };

    // Handle inserts
    supabase
      .channel('bin_status')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'bin_status' },
        handleInserts
      )
      .subscribe();

    // const subscription = supabase
    //   .from('bin_status')
    //   .on('UPDATE', (payload) => {
    //     console.log('Bin status updated:', payload);
    //     setBinStatus(payload.new.is_full ? 'Bin full' : 'Bin not full');
    //   })
    //   .subscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>{binStatus}</Text>
    </View>
  );
}
