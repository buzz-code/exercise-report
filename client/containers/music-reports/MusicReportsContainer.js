import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';
import * as crudAction from '../../../common-modules/client/actions/crudAction';

const getColumns = ({ students }) => [
  {
    field: 'student_id',
    title: 'שם תלמידה',
    ...getPropsForAutoComplete('student_id', students),
    columnOrder: 'students.name',
  },
  { field: 'student_group', title: 'התמחות', editable: 'never' },
  { field: 'enter_hour', title: 'שעת כניסה' },
  { field: 'exit_hour', title: 'שעת יציאה' },
  { field: 'report_date', title: 'תאריך הדיווח', type: 'date' },
  { field: 'halilit', title: 'חלילית', type: 'boolean' },
  { field: 'another', title: 'כלי נוסף', type: 'boolean' },
  { field: 'cuebase', title: 'תוכנת קיובייס', type: 'boolean' },
  { field: 'notes', title: 'הקלדת תווים', type: 'boolean' },
];
const getFilters = () => [
  { field: 'students.name', label: 'תלמידה', type: 'text', operator: 'like' },
  { field: 'students.group', label: 'התמחות', type: 'text', operator: 'like' },
  { field: 'enter_hour', label: 'שעת כניסה', type: 'text', operator: 'like' },
  { field: 'exit_hour', label: 'שעת יציאה', type: 'text', operator: 'like' },
  { field: 'report_date', label: 'מתאריך', type: 'date', operator: 'date-before' },
  { field: 'report_date', label: 'עד תאריך', type: 'date', operator: 'date-after' },
];

const MusicReportsContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  const columns = useMemo(() => getColumns(editData || {}), [editData]);
  const filters = useMemo(() => getFilters(), []);

  const manipulateDataToSave = (dataToSave) => ({
    ...dataToSave,
    report_date:
      dataToSave.report_date instanceof Date
        ? dataToSave.report_date.toISOString().substr(0, 10)
        : dataToSave.report_date.substr(0, 10),
    student_group: undefined,
  });

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      manipulateDataToSave={manipulateDataToSave}
    />
  );
};

export default MusicReportsContainer;
