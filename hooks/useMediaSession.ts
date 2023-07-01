import { Song } from "@/libs/types";
import { Howl } from "howler";

type ActionHandlersType = {
  action: MediaSessionAction;
  handler: (data: any | undefined) => void;
};

const skipTime = 5;

const useMediaSession = (
  audio: Howl,
  song: Song,
  imageUrl: string | undefined,
  onPlayNext: () => void,
  onPlayPrevious: () => void,
  onSeekTo: (num: number) => void
) => {
  const MEDIA_SESSION_ENABLED = "mediaSession" in navigator;
  const setMediaSession = async () => {
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
      {
        action: "seekto",
        handler: (details: any) => {
          onSeekTo(details.seekTime / audio.duration());
          updateMediaPosition();
        },
      },
      {
        action: "seekforward",
        handler: () => {
          onSeekTo(Math.min((audio.seek() + skipTime) / audio.duration(), 1));
          updateMediaPosition();
        },
      },
      {
        action: "seekbackward",
        handler: () => {
          onSeekTo(Math.max((audio.seek() - skipTime) / audio.duration(), 0));
          updateMediaPosition();
        },
      },
    ];

    let imageSrc: { src: string; sizes: string; type: string }[] = [];
    if (imageUrl) {
      imageSrc = [
        {
          src: imageUrl,
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: imageUrl,
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: imageUrl,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: imageUrl,
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: imageUrl,
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: imageUrl,
          sizes: "512x512",
          type: "image/png",
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

      updateMediaPosition();

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

  const updateMediaPosition = () => {
    if (!audio) return;
    console.log({
      duration: audio.duration(),
      playbackRate: audio.rate(),
      position: audio.seek(),
    });
    navigator.mediaSession.setPositionState({
      duration: audio.duration(),
      playbackRate: audio.rate(),
      position: audio.seek(),
    });
  };

  const setPlaybackStatePlay = () => {
    navigator.mediaSession.playbackState = "playing";
  };

  const setPlaybackStatePause = () => {
    navigator.mediaSession.playbackState = "paused";
  };

  return {
    setMediaSession,
    setPlaybackStatePlay,
    setPlaybackStatePause,
    updateMediaPosition,
  };
};

export default useMediaSession;
