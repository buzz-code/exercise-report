import moment from 'moment';
import bookshelf from '../../common-modules/server/config/bookshelf';
import User from './user.model';

const TABLE_NAME = 'music_reports';

/**
 * MusicReport model.
 */
class MusicReport extends bookshelf.Model {

    /**
     * Get table name.
     */
    get tableName() {
        return TABLE_NAME;
    }

    user() {
        return this.belongsTo(User);
    }

    toJSON() {
        var attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments);
        attrs.report_date = moment(this.get('report_date')).format('YYYY-MM-DD');
        return attrs;
    }
}

export default MusicReport;