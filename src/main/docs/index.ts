import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Big Bang Challenge',
    description: 'Bib Bang Shop Backend Challenge API',
    version: '1.0.0',
    contact: {
      name: 'Wagner Junior',
      email: 'wagner.junior30@gmail.com',
      url: 'https://www.linkedin.com/in/wagner-j-junior/'
    }
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal'
    }
  ],
  tags: [
    {
      name: 'Musica',
      description: 'APIs relacionadas a Musica'
    }
  ],
  paths,
  schemas,
  components
}
