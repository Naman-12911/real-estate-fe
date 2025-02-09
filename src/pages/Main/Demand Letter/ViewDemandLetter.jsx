import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SearchInput from '../../../components/SearchInput'
import Axios from '../../../Axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dateFormat from "dateformat";
// import Button from '../../../components/Button'
import Pagination from '../../../components/Pagination'
import Spinner from '../../../components/Spinner'

export default function ViewDemandLetter() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const[data,setData]=useState('')
	const [unitNumber,setUnitNumber]=useState('');
	const [loading,setLoading]=useState(true);
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
			unit_no:unitNumber,
      		page,
		}
		const paramArray=[];
	
		for(const key in paramObject){
			if(paramObject[key]){
				paramArray.push(`${key}=${paramObject[key]}`)
			}
		}
		const queryString = paramArray.join("&");
		Axios.get(`/documentation/demand-letter/?${queryString}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
		})
		.then(res=>{
			// console.log(res.data)
      setTotalPage(res.data.total_pages)
			setData(res.data.results)
      setLoading(false)
		})
		.catch(err=>{
			console.log(err.response)
      setLoading(false)
		})
	}

	useEffect(()=>{
		handleSearch();
	},[page,unitNumber])


  return (
	<div>
	<div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Demand Letter"} />
		<SearchInput placeholder={"Search By Unit Number"} value={unitNumber} onChange={(e)=>setUnitNumber(e.target.value)} type={'number'}/>
      </div>
	<div className="py-3 w-full   mx-auto space-y-5">
	<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
	<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
	  <h2 className="font-semibold text-slate-800 dark:text-slate-100">Demand Letter</h2>
	</header>
<div className="p-3">

{/* Table */}
<div className="overflow-x-auto">
{loading?<Spinner/>:data?.length>0?<table className="table-auto w-full">
  {/* Table header */}
  <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
	<tr >
	<th className="p-2 whitespace-nowrap">
		<div className="font-semibold text-center">Project Name</div>
	  </th>
	  <th className="p-2 whitespace-nowrap">
		<div className="font-semibold text-center">Unit Number</div>
	  </th>
	  <th className="p-2 whitespace-nowrap">
		<div className="font-semibold text-center">Unit Type</div>
	  </th>
	  <th className="p-2 whitespace-nowrap">
		<div className="font-semibold text-center">Stage Name</div>
	  </th>
	  <th className="p-2 whitespace-nowrap">
		<div className="font-semibold text-center">Date</div>
	  </th>
	  <th className="p-2 whitespace-nowrap">
		<div className="font-semibold text-center">Action</div>
	  </th>
	</tr>
  </thead>
  {/* Table body */}
  <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
	{
	  data.map(item => {
		return (
		  <tr key={item.id}>
			<td className="p-4 whitespace-nowrap">
			  <div className="text-base text-center text-black dark:text-slate-300">{item.project_name?.project_name}</div>
			</td>
			<td className="p-4 whitespace-nowrap">
			  <div className="text-base text-center">{item.unit_number?.unit_no}</div>
			</td>
			<td className="p-4 whitespace-nowrap">
			  <div className="text-base text-center">{item.project_type?.property_type}</div>
			</td>
			<td className="p-4 whitespace-nowrap">
			  <div className="text-base text-center">{item.payment_stage?.stage_name}</div>
			</td>
			<td className="p-4 whitespace-nowrap">
			  <div className="text-base text-center">{dateFormat(item.created_at,'dd-mm-yyyy')}</div>
			</td>
			<td className="p-4 whitespace-nowrap">
			  <div className="flex items-center justify-center">
				<div className='flex justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='View and Download Demand Letter' onClick={()=>navigate('/main/demandletter/generatedemandletter',{state:item})}>
				  <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 576 512">
					  <path className=' fill-current ' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"/>
				  </svg>
				</div>
			  </div>
			</td>
		  </tr>
		)
	  })
	}
  </tbody>
</table>:<div className='w-full flex items-center justify-center'>
		<p className='lg:text-xl text-base font-semibold'>No Leads Found</p>
	  </div>}
</div>
</div>
		  
	</div>
	</div>
	<Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} page={page} totalPages={totalPage}/>
  </div>
  )
}
