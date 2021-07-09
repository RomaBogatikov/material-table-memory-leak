import MaterialTable from '@material-table/core';
import React, { useContext, useMemo, forwardRef, useState, useEffect, useRef } from 'react';
import axios from 'axios';

import TableContextProvider, { TableContext } from './TableContext';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


function App() {
  return (
    <>
      <TableContextProvider>
        <TableContainer />
        {/* <TableContainer />
        <TableContainer />
        <TableContainer />
        <TableContainer /> */}
      </TableContextProvider>
    </>
  )
}

// TableContainer is needed for the sole purpose of providing individual instance of data from context to table
function TableContainer() {
  const tableData = useContext(TableContext);
  //! the commented out code below was needed when 'tableData' was appended to every object(row)
  // We want to set context to state (and create a copy of an object in useEffect hook) to apply different filters when tables are rendered on the screen
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (tableData) {
  //     let newData = tableData.map(rowData => Object.assign({}, rowData))
  //     setData(newData);
  //   }
  // }, [tableData])

  return <Table data={tableData} />
}

function Table({ data }) {
  const columnsUsers = useMemo(() => ([
    { title: "Title", field: "title" },
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "Birth Year", field: "birthYear" },
  ]), [])

  return useMemo(() => {
    return (
      <>
        <MaterialTable
          data={data}
          icons={tableIcons}
          columns={columnsUsers}
          options={{ maxBodyHeight: '150px' }}
        />
      </>
    )

  }, [data, columnsUsers])
}

export default App;
