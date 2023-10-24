import express from 'express';
const router=express.Router();
import { getPaper,addPaper } from '../controller/paperController.js';

router.get('/get-paper/:paperCreator',getPaper);
router.post('/add-paper',addPaper);

export default router;