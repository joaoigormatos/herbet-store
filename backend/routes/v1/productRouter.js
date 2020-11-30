import RouterConfig2 from '../routerConfig.js'
import ProductController from '../../controllers/ProductController.js'
const productRouter = RouterConfig2.router
import {checkHeaderToken, checkAuthorization} from '../../util/jwtHandler.js'
import FileUpload from '../../config/fileupload.js';

 productRouter.use('/product',checkHeaderToken)
 productRouter.use('/product',checkAuthorization)
productRouter.get('/product/:id',ProductController.index)
productRouter.get('/product',ProductController.find);
productRouter.post('/product',FileUpload.upload.single('image'),ProductController.save)
productRouter.get('/product/:id/qrcode',ProductController.qrcode)
productRouter.delete('/product/:id',FileUpload.upload.single('image'),ProductController.remove)



export default productRouter;
