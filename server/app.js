import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
export const app = express()
import cookieParser from 'cookie-parser'

import { userRouter } from './routes/userRoutes.js'
import { productRouter } from './routes/productRoutes.js'

const corsOption = {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use('/user',userRouter)
app.use('/product',productRouter)


