import { sugestPlaylistParamsSchema, playlistSchema, errorSchema } from './schemas/'

export default {
  playlist: playlistSchema,
  error: errorSchema,
  sugestPlaylistParams: sugestPlaylistParamsSchema
}
