import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
export const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())


