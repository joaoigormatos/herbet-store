//Depedencies
import RouterConfig from '../routerConfig.js'
import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import authenticationRouter from './authenticationRouter.js'

import {checkHeaderToken} from '../../util/jwtHandler.js'

//Config
const v1Router = RouterConfig.router

const basePath = "v1";
v1Router.use(`/${basePath}`, authenticationRouter)

v1Router.use(`/${basePath}`,productRouter)

v1Router.use(`/${basePath}`,userRouter)



export default v1Router;


