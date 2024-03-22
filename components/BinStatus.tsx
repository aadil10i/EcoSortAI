import { useEffect, useState } from 'react';

import { supabase } from '~/utils/supabase';

export const useBinStatus = () => {
  const [binStatus, setBinStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchBinStatus = async () => {
      const { data, error } = await supabase.from('bin_status').select('is_full').maybeSingle();

      if (error) {
        console.error('Error fetching bin status:', error);
        return;
      }

      if (data) {
        setBinStatus(data.is_full);
      }
    };

    fetchBinStatus();

    // Subscribe to table updates
    const subscription = supabase
      .channel('bin_status')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bin_status' },
        (payload) => setBinStatus(payload.new.is_full)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return binStatus;
};
