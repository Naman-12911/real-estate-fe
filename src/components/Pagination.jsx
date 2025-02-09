import React from 'react';

export default function Pagination({ handlePrevPage, handleNextPage, page, totalPages }) {
  return (
    <div className="flex items-end justify-end ">
      <div className='flex items-center justify-center gap-2'>
        {/* Previous button */}
        <button
                className={`flex items-center justify-center px-4 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === 1 ? 'cursor-not-allowed text-gray-300 dark:text-gray-500' : 'cursor-pointer'
                }`}
                onClick={page === 1 ? null : handlePrevPage}
                disabled={page === 1}
              >
                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                Previous
              </button>
                {totalPages>0&&<p className='text-sm font-semibold w-20 flex items-center justify-center'>{page} / {totalPages}</p>}
              {/* Next button */}
              <button
                className={`flex items-center justify-center px-4 h-10 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-slate-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                  page === totalPages ? 'cursor-not-allowed text-gray-300 dark:text-gray-500' : 'cursor-pointer'
                }`}
                onClick={page === totalPages ? null : handleNextPage}
                disabled={page === totalPages}
              >
                Next
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
      </div>
    </div>
  );
}