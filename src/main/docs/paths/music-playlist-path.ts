export const musicPlaylistPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Musica'],
    summary: 'API sugerir músicas',
    description: 'Essa rota sugera uma lista de músicas de acordo com a temperatura da cidade ou coordenada informada',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/sugestPlaylistParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/playlist'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
