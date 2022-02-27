import express from 'express';
import * as musicReportCtrl from '../controllers/music-report.controller';
import isAuthenticated from '../middlewares/authenticate';
import validate from '../../common-modules/server/config/joi.validate';
import schema from '../../common-modules/server/utils/validator';

const router = express.Router();

router.use(isAuthenticated);

router.route('/')
    .post(validate(schema.storeReport), (req, res) => {
        musicReportCtrl.store(req, res);
    })
    .get((req, res) => {
        musicReportCtrl.findAll(req, res);
    });

router.route('/get-edit-data')
    .get((req, res) => {
        musicReportCtrl.getEditData(req, res);
    });

router.route('/:id')
    .get((req, res) => {
        musicReportCtrl.findById(req, res);
    })
    .put((req, res) => {
        musicReportCtrl.update(req, res);
    })
    .delete((req, res) => {
        musicReportCtrl.destroy(req, res);
    });

router.route('/upload-multiple')
    .post((req, res) => {
        musicReportCtrl.uploadMultiple(req, res);
    });

export default router;