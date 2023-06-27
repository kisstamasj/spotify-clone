"use client";

import React, { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song } from "@/libs/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import useSound from "use-sound";
import useMediaSession from "@/hooks/useMediaSession";
import usePlayNext from "@/hooks/usePlayNext";
import usePlayPrevious from "@/hooks/usePlayPrevious";
import MusicRangeSlider from "./MusicRangeSlider";
import { convertMsToTime, roundTo3Dec } from "@/libs/helpers";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  imageUrl?: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
  imageUrl,
}) => {
  const onPlayNext = usePlayNext();
  const onPlayPrevious = usePlayPrevious();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rangeValue, setRangeValue] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const { onMediaSession, setPlaybackStatePause, setPlaybackStatePlay } =
    useMediaSession(song, imageUrl, onPlayNext, onPlayPrevious);

  const PlayPauseIcon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound: audio, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => {
      setRangeValue(0);
      setPlaybackStatePlay();
      setIsPlaying(true);
    },
    onend: () => {
      onPlayNext();
    },
    onpause: () => {
      setPlaybackStatePause();
      setIsPlaying(false);
    },
    format: ["mp3"],
    html5: true,
  });

  onMediaSession(audio);

  useEffect(() => {
    audio?.play();
    return () => {
      audio?.unload();
    };
  }, [audio, play]);

  useEffect(() => {
    if (!isPlaying || !duration) return;
    const interval = setInterval(() => {
      setTimeSpent((prev) => prev + 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    // if the music is paused then we also can change the range value
    setRangeValue(roundTo3Dec(timeSpent / duration!));
    if (!isPlaying || !duration) return;
    const interval = setInterval(() => {
      setRangeValue(roundTo3Dec(timeSpent / duration));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, timeSpent, duration]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const handleSeek = (value: number) => {
    if (!duration) return;
    let timeSpent = duration * value;
    audio.seek(timeSpent / 1000);
    setTimeSpent(timeSpent);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onClick={() => {}} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      {/* Mobile controls */}
      <div className="flex md:hidden col-auto w-full justify-end items-center gap-x-3">
        <AiFillStepBackward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayPrevious}
        />
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex justify-center items-center rounded-full bg-white p-1 cursor-pointer"
        >
          <PlayPauseIcon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayNext}
        />
      </div>
      {/* Desktop controls */}
      <div className="hidden h-full md:flex items-center justify-center flex-col gap-y-0.5">
        <div className="h-full flex justify-center items-center w-full max-w-[722px] gap-x-6">
          <AiFillStepBackward
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayPrevious}
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer hover:scale-110 transition"
          >
            <PlayPauseIcon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            size={30}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onPlayNext}
          />
        </div>
        <div className="w-full flex items-center justify-center flex-row gap-x-2 pb-2 grow-0 shrink-0">
          <div className="text-xs text-neutral-400 w-[50px] flex justify-end">
            {convertMsToTime(timeSpent)}
          </div>
          <div className="w-full">
            <MusicRangeSlider value={rangeValue} onChange={handleSeek} />
          </div>
          <div className="text-xs text-neutral-400 w-[50px] flex justify-start">
            {convertMsToTime(duration!)}
          </div>
        </div>
      </div>
      {/* Only on desktop */}
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={25}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
