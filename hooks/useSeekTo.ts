import { roundTo3Dec } from "@/libs/helpers";
import { Howl } from "howler";

const useSeek = (audio: Howl, setRangeValue: (num: number) => void) => {
  const onSeekTo = (rangeValue: number) => {
    if (!audio) return;
    let seek = audio.duration() * rangeValue;
    audio.seek(seek);
    updateRangeValue();
  };

  const updateRangeValue = () => {
    if (!audio) return 0;
    setRangeValue(roundTo3Dec(audio.seek() / audio.duration()));
  };

  const getSeek = () => {
    if (!audio) return 0;
    return audio.seek();
  };

  const getDuration = () => {
    if (!audio) return 0;
    return audio.duration();
  };

  return { onSeekTo, updateRangeValue, getSeek, getDuration };
};

export default useSeek;
