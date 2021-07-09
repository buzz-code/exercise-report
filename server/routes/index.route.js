import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import yemotRoutes from './yemot.route';
import reportRoutes from './report.route';
import studentRoutes from './student.route';
import textRoutes from './text.route';
import dashboardRoutes from './dashboard.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/yemot', yemotRoutes);
router.use('/reports', reportRoutes);
router.use('/students', studentRoutes);
router.use('/texts', textRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;