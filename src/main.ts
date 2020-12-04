import router from './routes'
import initApp from './lib/setup/init-app'
import { PORT } from './config'

async function main() {
  const app = await initApp()
  app.use(router.getExpressRouter())
  app.listen(PORT, () => console.log('App listening on port', PORT))
}
main()
