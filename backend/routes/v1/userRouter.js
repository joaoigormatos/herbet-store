import RouterConfig1 from '../routerConfig.js'
import UserController from '../../controllers/UserController.js'
const userRouter = RouterConfig1.router

userRouter.get('/user',UserController.find);


export default userRouter;
