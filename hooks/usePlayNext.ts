import usePlayer from "./usePlayer";

const usePlayNext = () => {
  const player = usePlayer();
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const nextSong = player.ids[currentIndex + 1];
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  return onPlayNext;
};

export default usePlayNext;
