export type LoadPlaylistByCategoryParams = {
  category: string
  accessToken: string
}

export interface LoadPlaylistRepository {
  loadPlaylistByCategory: (data: LoadPlaylistByCategoryParams) => Promise<string[]>
}
