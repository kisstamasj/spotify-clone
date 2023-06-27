import { create } from "zustand";

interface SubscibeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscibeModal = create<SubscibeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubscibeModal;
