import React, { useCallback, useEffect, useMemo } from 'react';
import MaterialTable from 'material-table';

import { REPORT_TYPES } from '../../constants/entity';
import * as crudAction from '../../actions/crudAction';
import { useDispatch, useSelector } from 'react-redux';
import { materialTableOptions, materialTableLocalizations } from '../../config/config';

const getColumns = () => [{ field: 'name', title: 'סוג צפיה' }];

const ReportTypes = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state[REPORT_TYPES]);

  useEffect(() => {
    dispatch(crudAction.fetchAll(REPORT_TYPES));
  }, []);

  const columns = useMemo(() => getColumns(), []);

  const getSaveItem = (rowData) => {
    const dataToSave = {
      ...rowData,
      tableData: undefined,
    };
    return dispatch(crudAction.submitForm(REPORT_TYPES, dataToSave, dataToSave.id));
  };
  const onRowAdd = useCallback(getSaveItem);
  const onRowUpdate = useCallback(getSaveItem);
  const onRowDelete = useCallback((rowData) =>
    dispatch(crudAction.destroyItem(REPORT_TYPES, rowData.id))
  );

  return (
    <div>
      <h2 style={{ paddingBottom: '15px' }}>סוגי צפיה</h2>

      <MaterialTable
        title="נתונים"
        columns={columns}
        data={data || []}
        isLoading={!data}
        editable={{ onRowAdd, onRowUpdate, onRowDelete }}
        options={materialTableOptions}
        localization={materialTableLocalizations}
      />
    </div>
  );
};

export default ReportTypes;
