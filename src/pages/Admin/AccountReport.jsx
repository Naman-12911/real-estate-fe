import React, { useEffect, useMemo, useRef, useState } from 'react'
import Heading from '../../components/Heading'
import Axios from '../../Axios';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import Button from '../../components/Button';
import DateFilter from '../../components/DateFilter';
import dateFormat from "dateformat";
import Pagination from '../../components/Pagination';
import HorizontalScrollButton from '../../components/HorizontalScrollButton';
import moment from 'moment';
import downloadWordExcel from '../../components/advanceComponent/downloadWordExcel';
import { currentDateTime } from '../../components/advanceComponent/currentDateTime';
import Table from '../../components/Table';
import Datepicker from '../../components/Datepicker';






export default function AccountReport() {
  const tableRef = useRef(null);
	const accessToken=useSelector((state)=>state.user.user);

	  const [columnFilter,setColumnFilter]=useState([]);
	const [dateSearchGrt, setdateSearchGrt] = useState("");
	const [dateSearchLess, setdateSearchLess] = useState("");
	const [data,setData]=useState('');
  const [total,setTotal]=useState(0);
  const [totalBooking,setTotalBooking]=useState(0)
	const [loading,setLoading]=useState(true)

  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage]=useState('');

  // Define previous page handler
  const handlePrevPage = () => {
    // window.scroll(0,0)
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Define next page handler
  const handleNextPage = () => {
    // window.scroll(0,0)
    setPage(page + 1);
  };

	const handleSearch=()=>{
		setLoading(true)
		// setData(null);
		const paramObject={
			start_date:dateSearchGrt,
			end_date:dateSearchLess,
      page,
		}

    columnFilter.forEach(filter => {
      paramObject[filter.id] = filter.value;
    });

		const paramArray=[];
		for(const key in paramObject){
			if(paramObject[key]){
				paramArray.push(`${key}=${paramObject[key]}`)
			}
		}
		const queryString = paramArray.join("&");
		Axios.get(`/profile/user-balance/?${queryString}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
		})
		.then(res=>{
			// console.log(res.data.data)
			setData(res.data.results.data)
      setTotalPage(res.data.total_pages)
      setTotalBooking(res.data.results.count)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response)
      setLoading(false)
		})
	}

  // console.log(columnFilter);
	useEffect(()=>{
		handleSearch();
	},[dateSearchGrt,dateSearchLess,page,columnFilter])

  useEffect(()=>{
    // if (Array.isArray(data.data) && data.data.length > 0) {
      const totalam =data&& data?.reduce((acc, curr) => acc + curr.total_received, 0);
      // console.log(totalam);
      setTotal(totalam);
    // }
  },[data])

  const scrollableRef = useRef(null);
const onScroll = (offset) => {
  if (scrollableRef && scrollableRef.current) {
    scrollableRef.current.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }
};


const handleExcel = async (urla) => {
  const paramObject = {
    start_date: dateSearchGrt,
    end_date: dateSearchLess,
  };

  const paramArray = [];
  for (const key in paramObject) {
    if (paramObject[key]) {
      paramArray.push(`${key}=${paramObject[key]}`);
    }
  }

  const queryString = paramArray.join("&");
  
  downloadWordExcel(
    `profile/user-balance-export/?data_filter=${urla}&${queryString}`,
    `${urla}_${dateSearchGrt}_${dateSearchLess}_${currentDateTime()}.xlsx`,
    accessToken,
    'Processing Excel File...',
    'Excel File Saved to your Device Successfully',
    'Excel File Downloaded Successfully',
    'There was a problem with Excel file, please try again'
  )
};


const columns = [
  {
    id: 'slNo',
    header: 'SL No',
    cell: (info) => {
      return (page - 1) * 50 + info.row.index + 1;
    },
    meta:{
      smallWidth:true
    }
  },
  {
    accessorKey: 'customer_name',
    header: 'Customer Name',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'unit_no',
    header: 'Unit Number',
    meta: {
      filterVariant: 'text',
      filterTextType:'number'
    },
  },
  {
    accessorKey: 'sqft',
    header: 'Sqft',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'booking_date',
    header: 'Booking Date',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'basic_charge',
    header: 'Basic Charge',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'other_charges',
    header: 'Other Charges',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'additional_charges',
    header: 'Additional Charges',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'total_cost',
    header: 'Total Cost',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'total_received',
    header: 'Total Received',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'balance',
    header: 'Balance',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'registry_date',
    header: 'Registry Date',
    meta: {
      smallWidth:true,
    },
  },
  {
    accessorKey: 'posession_date',
    header: 'Possession Date',
    meta: {
      smallWidth:true,
    },
  },
];


  return (
	<div className=''>
    {/* <Datepicker/> */}
      <div className="flex justify-between items-center md:flex-row flex-col">
        <Heading title={"All Booking"} />
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="flex justify-between items-end gap-5 flex-col lg:flex-row">
          <div className="flex justify-start items-end flex-col lg:flex-row gap-5 w-full">
              <Button title={'Export Account Report'} onClick={()=>handleExcel('all')}/>
              <Button title={'Export Registry Report'} onClick={()=>handleExcel('registry')}/>
              <Button title={'Export Customer Report'} onClick={()=>handleExcel('customer')}/>
          </div>
          <DateFilter placeholderGRT={'Date Greater then'} placeholderLES={'Date Less then'} valueGRT={dateSearchGrt} valueLES={dateSearchLess} onChangeGRT={setdateSearchGrt} onChangeLES={setdateSearchLess}/>
        </div>
      </div>
      
      <Table
      setColumnFilter={setColumnFilter}  
      columns={columns}
      data={data}
      pageNumber={page}
      setPageNumber={setPage}
      totalPageNumber={totalPage}
      loading={loading}
      children={<h2 className="font-semibold text-slate-800 dark:text-slate-100 flex flex-col md:text-base text-sm">
        <span>Booking</span>
        <span>Total Booking : {totalBooking&&Intl.NumberFormat('en-IN').format(totalBooking)}</span>
        <span>Total Recieved : ₹{total&&Intl.NumberFormat('en-IN').format(total)}</span></h2>}
      />
    </div>
  )
}
