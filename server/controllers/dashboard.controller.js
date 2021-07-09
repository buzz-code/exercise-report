import Report from '../models/report.model';
import Student from '../models/student.model';

/**
 * Get stats
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function getStats(req, res) {
    const [reports, students] = await Promise.all([
        getCountFromTable(Report, req.currentUser.id),
        getCountFromTable(Student, req.currentUser.id),
    ]);
    res.json({
        error: null,
        data: { reports, students }
    });
}

function getCountFromTable(table, user_id) {
    return new table({ user_id })
        .count();
}
