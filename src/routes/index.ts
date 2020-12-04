import HttpError from '../lib/errors/http-error'
import AuthController from '../controllers/AuthController'
import router from '../lib/router'

function test() {
  throw new HttpError(500, 'Testing test')
}

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/test', test)

export default router
