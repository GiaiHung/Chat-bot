import homeRouter from './homeRouter'

const initRouter = (app) => {
  app.use('/', homeRouter)
}

export default initRouter
