import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../lib/types";

const useLoadSongUrl = (song: Song | undefined) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useLoadSongUrl;
