import HttpStatus from 'http-status-codes';
import { query } from 'winston';
import bookshelf from '../../common-modules/server/config/bookshelf';
import knex from '../../common-modules/server/config/knex';
import Report from '../models/report.model';
import Student from '../models/student.model';
import { getListFromTable } from '../../common-modules/server/utils/common';
import genericController, { applyFilters, fetchPage } from '../../common-modules/server/controllers/generic.controller';

export const { findById, store, update, destroy, uploadMultiple } = genericController(Report);

/**
 * Find all the items
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function findAll(req, res) {
    const dbQuery = new Report({ user_id: req.currentUser.id })
        .query(qb => {
            qb.innerJoin('students', 'students.id', 'reports.student_id')
            qb.select('reports.*')
            qb.select({ student_group: 'students.group' })
        });
    applyFilters(dbQuery, req.query.filters);
    fetchPage({ dbQuery }, req.query, res);
}

/**
 * Get edit data
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getEditData(req, res) {
    const [students] = await Promise.all([
        getListFromTable(Student, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { students }
    });
}
