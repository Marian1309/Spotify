import { create } from 'zustand'

type PlayerStore = {
  ids: string[]
  activeId?: string
  setId: (id: string) => void
  setIds: (ids: string[]) => void
  reset: () => void
  volume: number
  setVolume: (volume: number) => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  songLoaded: boolean
  setSongLoaded: (songLoaded: boolean) => void
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: '',
  volume: 0.7,
  isPlaying: false,
  songLoaded: false,
  setId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids }),
  reset: () => set({ ids: [] }),
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSongLoaded: (songLoaded) => set({ songLoaded })
}))

export default usePlayer
