import { create } from 'zustand'


export interface BearStore {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void
    updateBears: (newBears: number) => void
    // ... and other actions and state
}

export const useStore = create<BearStore>((set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
}))