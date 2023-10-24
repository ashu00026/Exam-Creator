import express from 'express'
const router=express.Router()

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controller/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.post('/',registerUser);
router.post('/login',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile); // needs to go through the protect middleware
// router.get('/profile',getUserProfile);
// router.put('/profile',updateUserProfile);

export default router;