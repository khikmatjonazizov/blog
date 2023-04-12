import express from 'express';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import cors from 'cors';

const PORT = process.env.PORT || 8070;

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', postRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
