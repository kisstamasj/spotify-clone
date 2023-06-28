import { Song } from "@/libs/types";
import { Howl } from "howler";

type ActionHandlersType = {
  action: MediaSessionAction;
  handler: () => void;
};

const useMediaSession = (
  song: Song,
  imageUrl: string | undefined,
  onPlayNext: () => void,
  onPlayPrevious: () => void
) => {
  const MEDIA_SESSION_ENABLED = "mediaSession" in navigator;
  const onMediaSession = async (audio: Howl) => {
    const actionHandlers: ActionHandlersType[] = [
      {
        action: "play",
        handler: () => {
          audio.play();
        },
      },
      {
        action: "pause",
        handler: () => {
          audio.pause();
        },
      },
      {
        action: "nexttrack",
        handler: () => {
          onPlayNext();
        },
      },
      {
        action: "previoustrack",
        handler: () => {
          onPlayPrevious();
        },
      },
    ];

    let imageSrc: { src: string; sizes: string; type: string }[] = [];
    if (imageUrl) {
      imageSrc = [
        {
          src: imageUrl,
          sizes: "96x96",
          type: "image/jpg",
        },
      ];
    }

    if (MEDIA_SESSION_ENABLED) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: song.author,
        album: "",
        artwork: imageSrc,
      });

      navigator.mediaSession.setPositionState({
        duration: audio.duration(),
        playbackRate: audio.rate(),
        position: audio.pos()[0],
      });

      for (const { action, handler } of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(
            `The media session action "${action}" is not supported yet.`
          );
        }
      }
    }
  };

  const setMediaPosition = (audio: Howl) => {
    navigator.mediaSession.setPositionState({
      duration: audio.duration(),
      playbackRate: audio.rate(),
      position: audio.pos()[0],
    });
  };

  const setPlaybackStatePlay = () => {
    navigator.mediaSession.playbackState = "playing";
  };

  const setPlaybackStatePause = () => {
    navigator.mediaSession.playbackState = "paused";
  };

  return {
    onMediaSession,
    setPlaybackStatePlay,
    setPlaybackStatePause,
    setMediaPosition,
  };
};

export default useMediaSession;
