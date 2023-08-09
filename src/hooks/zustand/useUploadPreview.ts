import { create } from 'zustand'

type UploadPreviewStore = {
  previewImage: string
  setPreviewImage: (path: string) => void
  previewAudio: string
  setPreviewAudio: (path: string) => void
}

const useUploadPreview = create<UploadPreviewStore>((set) => ({
  previewImage: '',
  previewAudio: '',
  setPreviewImage: (path) => set({ previewImage: path }),
  setPreviewAudio: (path) => set({ previewAudio: path })
}))

export default useUploadPreview
