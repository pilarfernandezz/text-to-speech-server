import express from 'express';
import fs from 'fs';
import controller from './controller.js';
const router = express.Router();

router.post('/createAudio', async (req, res) => {
  const text = req.query.text;
  const tool = req.query.tool;
  const response = await controller.create(text, tool);

  console.log(typeof response)
  console.log('response',response)

  // fs.writeFileSync('./buffer.wav', response)

  // res.sendFile('/Users/pilarfernandez/ProjetosPUC/server/file/audio.wav');

  // res.json(response)
  res.json(new Buffer(response, 'base64'));

});
export default router;
