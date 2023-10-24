import express from 'express';
const router=express.Router();
import { submitMark,getMark } from '../controller/studentController.js';

router.post('/submit-mark',submitMark);
router.get('/get-mark/:paperCreator',getMark);

export default router;