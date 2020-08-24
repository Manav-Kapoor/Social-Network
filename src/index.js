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
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./client/build'));
}
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
})