import RouterConfig from './routes/routerConfig.js'
import routerV1 from './routes/v1/router.js'

const generalRouter = RouterConfig.router
generalRouter.use('/uploads',RouterConfig.express.static('uploads'))
generalRouter.use('/api',routerV1)

export default generalRouter;