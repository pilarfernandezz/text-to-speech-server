import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express()
const port = 3000

import routes from './routes.js';

// app.use(function (req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080/');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
app.use(cors())

app.use('/', routes);

// const corsOptions = {
//     origin:'http://localhost:8080/', 
//     credentials:true,            //access-control-allow-credentials:true 
//     optionSuccessStatus:200
// }
// app.use(cors({
//     ...corsOptions
//   }));

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
