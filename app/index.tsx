import 'react-native-url-polyfill/auto';
import { Session } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { supabase } from 'utils/supabase';

import RootLayout from './_layout';

import Auth from '~/components/Auth';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <View style={{ flex: 1 }}>{session && session.user ? <RootLayout /> : <Auth />}</View>;
}
