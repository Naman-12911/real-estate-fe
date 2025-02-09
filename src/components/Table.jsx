import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import 'tailwindcss/tailwind.css';
import HorizontalScrollButton from './HorizontalScrollButton';
import SkeletonLoader from './advanceComponent/SkeletonLoader';
import FilterInput from './advanceComponent/TableComponent/FilterInput';
import TableSelectInput from './advanceComponent/TableComponent/FilterSelectInput';
import FilterSelectInput from './advanceComponent/TableComponent/FilterSelectInput';


const Table = ({ columns, data, pageIndex, pageSize,pageNumber,setPageNumber, totalPageNumber,children,loading,setColumnFilter }) => {

  // const [columnWidths, setColumnWidths] = useState([]);

  // console.log(columnFilter);
  const table = useReactTable({
    columns,
    data,
    rowCount:50,
    onPaginationChange:setPageNumber,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange:setColumnFilter,
    manualPagination: true,
    manualFiltering: true,
  });


  const scrollableRef = useRef(null);
  const tableRef = useRef(null);

  const onScroll = (offset) => {
    if (scrollableRef && scrollableRef.current) {
      scrollableRef.current.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }
  };


  // useEffect(() => {
  //   const headerCells = tableRef.current.querySelectorAll('thead tr th');
  //   const widths = Array.from(headerCells).map(cell => cell.offsetWidth);
  //   setColumnWidths(widths);
  // }, [data, columns]);

  // console.log(columnWidths);

  return (
    <div className="relative py-4">
        <header className=" sticky top-0 px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between bg-white dark:bg-slate-800 z-10">
            {children}
            <HorizontalScrollButton onScroll={onScroll} />
        </header>
        <div className='overflow-x-scroll max-h-screen' ref={scrollableRef}>
        <table className="w-full bg-white dark:bg-slate-800" ref={tableRef}>
            <thead className=''>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="text-center">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className=" sticky z-20 top-0 px-4 py-2 text-center text-sm font-medium whitespace-nowrap bg-gray-50 dark:bg-slate-700 p-5 text-gray-900 dark:text-gray-100 capitalize">
                      <div className={header.column.columnDef.meta?.smallWidth?'':'w-56'}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                      {header?.column?.getCanFilter && header?.column?.getCanFilter() && (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
            {loading ? (
              Array.from({ length: 50 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-t dark:border-gray-600">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-100 text-center">
                      <SkeletonLoader />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t dark:border-gray-600">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={`px-4 py-3 text-sm text-gray-700 dark:text-gray-100 text-center ${cell.column.columnDef.meta?.smallWidth?'':'w-56'} ${cell.column.columnDef.meta?.textWrap ? '' : 'whitespace-nowrap'}`}>
                      {cell.getValue() !== null ? flexRender(cell.column.columnDef.cell, cell.getContext()) : '-'}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          </table>
    </div>
    
      {/* Pagination */}
      {pageNumber>0?data?.length>0?<div className="flex justify-between mt-4 pb-4">
        <button
        title='First Page'
          onClick={() => setPageNumber(1)}
          disabled={pageNumber==1}
          className={`px-4 border border-gray-300 dark:border-gray-400 rounded bg-white dark:bg-slate-700 ${pageNumber==1?'text-gray-200 dark:text-gray-500':'dark:text-white text-black'}`}
        >
          {'<<'}
        </button>
        <button
        title='Previous Page'
          onClick={() => setPageNumber(pageNumber-1)}
          disabled={pageNumber==1}
          className={`px-4 border border-gray-300 dark:border-gray-400 rounded bg-white dark:bg-slate-700 ${pageNumber==1?'text-gray-200 dark:text-gray-500':'dark:text-white text-black'}`}
        >
          {'<'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageNumber} of {totalPageNumber}
          </strong>
        </span>
        <button
        title='Next Page'
          onClick={() => {setPageNumber(pageNumber+1);window.scrollTo(0,0)}}
          disabled={pageNumber==totalPageNumber}
          className={`px-4 border border-gray-300 dark:border-gray-400 rounded bg-white dark:bg-slate-700 ${pageNumber==totalPageNumber?'text-gray-200 dark:text-gray-500':'dark:text-white text-black'}`}
        >
          {'>'}
        </button>
        <button
        title='Last Page'
          onClick={() => setPageNumber(totalPageNumber)}
          disabled={pageNumber==totalPageNumber}
          className={`px-4 border border-gray-300 dark:border-gray-400 rounded bg-white dark:bg-slate-700 ${pageNumber==totalPageNumber?'text-gray-200 dark:text-gray-500':'dark:text-white text-black'}`}
        >
          {'>>'}
        </button>
      </div>:<div className='flex items-center justify-center mt-10'>
            <p className='lg:text-xl text-base font-medium'>No Data Found</p>
          </div>:''}
      
    </div>
  );
};

const Filter = ({ column }) => {
  const columnFilterValue = column?.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const { options } = column.columnDef.meta ?? {};
  const { filterTextType } = column.columnDef.meta ?? {};

  return  filterVariant === 'select' ? (
    <FilterSelectInput
    value={columnFilterValue?.toString()}
    onChange={column.setFilterValue}
    options={options}
    />
  ) : filterVariant === 'text' ? (
    <FilterInput
    onChange={value => column.setFilterValue(value)}
    placeholder={'Search...'}
    value={(columnFilterValue ?? '')}
    type={filterTextType}
    />
  ):'';
};

export default Table;
