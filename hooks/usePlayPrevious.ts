import { PlayerStore } from "./usePlayer";

const usePlayPrevious = (player: PlayerStore) => {
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const previousSong = player.ids[currentIndex - 1];
    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  return onPlayPrevious;
};

export default usePlayPrevious;
