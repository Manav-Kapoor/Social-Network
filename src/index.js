const express = require('express');
require('../db/mongoose');
const userRouter = require('../routers/users');
const postRouter = require('../routers/posts');
const cors = require('cors');

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})