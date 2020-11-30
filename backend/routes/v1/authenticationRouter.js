import RouterConfig2 from '../routerConfig.js'
import AuthenticationController  from '../../controllers/AuthenticationController.js'
const authController = RouterConfig2.router


authController.post('/auth/login',AuthenticationController.login)
authController.post('/auth/singup',AuthenticationController.singup)



export default authController;
