import HttpError from '../lib/errors/http-errors'
import AuthController from '../controllers/auth.controller'
import router from '../lib/router'

function test() {
  throw new HttpError(500, 'Testing test')
}

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/test', test)

export default router
