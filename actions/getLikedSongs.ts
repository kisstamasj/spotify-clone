import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Song } from '../lib/types';
import { cookies } from 'next/headers';

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    [];
  }

  return data.map((item) => ({
    ...item.songs,
  }));
};

export default getLikedSongs;
