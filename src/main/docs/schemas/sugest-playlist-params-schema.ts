export const sugestPlaylistParamsSchema = {
  type: 'object',
  properties: {
    cityName: {
      type: 'string',
      example: 'Belo Horizonte',
      required: false,
      descripetion: 'Obrigatório se as coordenadas(lat, lon) não forem enviadas na requisição'
    },
    lat: {
      type: 'number',
      example: -19.8157,
      required: false,
      descripetion: 'Obrigatório se as coordenadas(lat, lon) não forem enviadas na requisição'
    },
    lon: {
      type: 'number',
      example: -43.9542,
      required: false,
      descripetion: 'Obrigatório se a cidade não for enviada na requisição'
    }
  }
}
