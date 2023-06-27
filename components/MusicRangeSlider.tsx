"use client";

import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface MusicRangeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const MusicRangeSlider: React.FC<MusicRangeSliderProps> = ({
  value = 0,
  onChange,
}) => {
  const handleChange = (newValue: number[]) => onChange?.(newValue[0]);

  if (isNaN(value)) value = 0;

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full transition group"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.001}
      aria-label="music range"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[5px]">
        <RadixSlider.Range className="absolute bg-gradient-to-r from-green-700 via-green-400 to-green-300 hover:bg-green-400 rounded-full h-full transition" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        className="hidden bg-white w-[15px] h-[15px] group-hover:block focus:outline-none rounded-full shadow-md transition"
        aria-label="music range"
      />
    </RadixSlider.Root>
  );
};

export default MusicRangeSlider;
