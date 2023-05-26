import homeRouter from './homeRouter'
import reserveRouter from './reserveRouter'

const initRouter = (app) => {
  app.use('/', homeRouter)
  app.use('/reserve', reserveRouter)
}

export default initRouter
