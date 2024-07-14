import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
export const app = express()
import cookieParser from 'cookie-parser'

import { userRouter } from './routes/userRoutes.js'
import { productRouter } from './routes/productRoutes.js'

app.use(express.json())
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use(helmet())
app.use(cors())
app.use(cookieParser())


