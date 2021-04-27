import React, { useMemo } from 'react';

import Table from '../../components/table/Table';
import { DAILY_REPORTS as entity } from '../../constants/entity';
import { DAILY_REPORTS as title } from '../../constants/entity-title';

const getColumns = () => [
  { field: 'teacher_tz', title: 'תז מורה' },
  { field: 'teacher_name', title: 'שם' },
  { field: 'report_date', title: 'תאריך' },
  { field: 'lesson_count', title: 'מספר שיעורים' },
  { field: 'student_count', title: 'מספר צפיות' },
  { field: 'report_type_name', title: 'סוג שיעור' },
];

const DailyReportsContainer = () => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
      disableFiltering={true}
    />
  );
};

export default DailyReportsContainer;
