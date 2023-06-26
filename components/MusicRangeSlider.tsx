"use client";

import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface MusicRangeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const MusicRangeSlider: React.FC<MusicRangeSliderProps> = ({
  value = 1,
  onChange,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      className="relative flex items-start select-none touch-none w-full h-5 transition"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.000001}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[5px]">
        <RadixSlider.Range className="absolute bg-gradient-to-r from-green-700 via-green-400 to-green-300 hover:bg-green-400 rounded-full h-full transition" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default MusicRangeSlider;
