
import Router from 'express';
import { uploadFile } from '../controllers/filesupload.controller.js';
import { Router } from 'express';

const app = express();
const PORT = 5000;

const router = Router();

router.post('/upload', uploadFile, (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

