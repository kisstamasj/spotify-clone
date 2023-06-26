import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../libs/types";

const useLoadImage = (song: Song | undefined) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return undefined;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
