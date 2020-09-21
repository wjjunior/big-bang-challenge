import { Router } from 'express'

export default (router: Router): void => {
  router.post('/sugest-musics', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
