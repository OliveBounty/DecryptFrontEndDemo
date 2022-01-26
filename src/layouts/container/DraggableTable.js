import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled, useTheme } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';

// hooks
// ----------------------------------------------------------------------
// Mokupdata
// -------------------------------------------------------------------------------------
const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2)
  }
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263)
  // createData('China', 'CN', 1403500365, 9596961),
  // createData('Italy', 'IT', 60483973, 301340),
  // createData('United States', 'US', 327167434, 9833520),
  // createData('Canada', 'CA', 37602103, 9984670),
  // createData('Australia', 'AU', 25475400, 7692024),
  // createData('Germany', 'DE', 83019200, 357578),
  // createData('Ireland', 'IE', 4857000, 70273),
  // createData('Mexico', 'MX', 126577691, 1972550),
  // createData('Japan', 'JP', 126317000, 377973),
  // createData('France', 'FR', 67022000, 640679),
  // createData('United Kingdom', 'GB', 67545757, 242495),
  // createData('Russia', 'RU', 146793744, 17098246),
  // createData('Nigeria', 'NG', 200962417, 923768),
  // createData('Brazil', 'BR', 210147125, 8515767)
];
// -------------------------------------------------------------------------------------
function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    // <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    //   <TableContainer sx={{ maxHeight: 440 }}>
    //     <Table stickyHeader aria-label="sticky table">
    //       <TableHead>
    //         <TableRow>
    //           {columns.map((column) => (
    //             <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
    //               {column.label}
    //             </TableCell>
    //           ))}
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
    //           <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
    //             {columns.map((column) => {
    //               const value = row[column.id];
    //               return (
    //                 <TableCell key={column.id} align={column.align}>
    //                   {column.format && typeof value === 'number' ? column.format(value) : value}
    //                 </TableCell>
    //               );
    //             })}
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    //   <TablePagination
    //     rowsPerPageOptions={[10, 25, 100]}
    //     component="div"
    //     count={rows.length}
    //     rowsPerPage={rowsPerPage}
    //     page={page}
    //     onPageChange={handleChangePage}
    //     onRowsPerPageChange={handleChangeRowsPerPage}
    //   />
    // </Paper>
    <TableBody>
      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
          {columns.map((column) => {
            const value = row[column.id];
            return (
              <TableCell key={column.id} align={column.align}>
                {column.format && typeof value === 'number' ? column.format(value) : value}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}
// -----------------------------------------------------------------------------------
const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

// ----------------------------------------------------------------------

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QuoteItem = styled('div')({
  width: '100%',
  border: '1px solid grey',
  marginBottom: `${grid}px`,
  backgroundColor: 'lightblue',
  padding: `${grid}px`
});

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        // <QuoteItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        //   {quote.content}
        // </QuoteItem>
        <StickyHeadTable ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} />
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(({ quotes }) =>
  quotes.map((quote, index) => <Quote quote={quote} index={index} key={quote.id} />)
);

export default function DraggableTable() {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(state.quotes, result.source.index, result.destination.index);

    setState({ quotes });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <QuoteList quotes={state.quotes} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
