import express from 'express';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 5070;

const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'http://192.168.215.79:3000'],
    allowedHeaders:
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
}))
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
