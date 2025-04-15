import { create } from 'zustand'

type TProfileStore = {
    modalSetupOpen: boolean;
    setModalSetupOpen: (value: boolean) => void;
}

const useProfileStore = create<TProfileStore>((set) => ({
  modalSetupOpen: false,
  setModalSetupOpen: (value) => set({ modalSetupOpen: value }),
}))

export default useProfileStore;