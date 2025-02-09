import React, { useEffect, useRef, useState } from 'react'
// import SingleSelectInput from '../../components/SingleSelectInput'
// import Button from '../../components/Button'
import Heading from '../../components/Heading'
import Axios from '../../Axios'
import { useSelector } from 'react-redux'
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from 'sonner'
import HorizontalScrollButton from '../../components/HorizontalScrollButton'
import Spinner from '../../components/Spinner'
import Button from '../../components/Button';

export default function TransferDumpLeads() {
	const accessToken=useSelector((state)=>state.user.user);
	const navigate=useNavigate();
	const {state}=useLocation();
	const [user,setUser]=useState('');
	const [userData,setUserData]=useState('')
	const [loading, setLoading] = useState(false);

	useEffect(()=>{
		Axios.get('/social/dump-lead-count/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			setUserData(res.data)
		})
		.catch(err=>{
			// console.log(err.resposne.data)
		})
	},[])

	  
	const handleSubmit=(id)=>{
		setLoading(true)
		const data={
			assign_to:id,
			lead_id:state,
		}
		Axios.post('/social/reassign-dump/',data,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// console.log()Failed to reassigned dumped lead 13175
			if(res.data[0].message.slice(0,res.data[0].message.indexOf(' '))=='Failed'){
				toast.error(res.data[0].message)
			}
			else{
				toast.success(res.data[0].message)
			}
			navigate(-1)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.resposne.data)
			setLoading(false)
		})
		
	}
const scrollableRef = useRef(null);
const onScroll = (offset) => {
  if (scrollableRef && scrollableRef.current) {
    scrollableRef.current.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }
};

  return (
	<div>
	<div className="flex justify-between md:flex-row flex-col">
	  <Heading title={"Transfer Leads"} />
	</div>
	<div className="py-3 w-full   mx-auto space-y-5">
	<div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
	  <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
	  <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
	  <h2 className="font-semibold text-slate-800 dark:text-slate-100">Agents</h2>
	  <HorizontalScrollButton onScroll={onScroll} />
	</header>
		<div className="p-3">
		  {/* Table */}
		  <div className="overflow-x-auto max-h-[80vh]"ref={scrollableRef}>
			{loading?<Spinner/>:userData.length>0?<table className="table-auto w-full">
			  {/* Table header */}
			  <thead className="sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700  ">
				<tr>
				  <th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Agent Name</div>
				  </th>
				  <th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Assigned Dump Leads</div>
				  </th>
				  <th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Action</div>
				  </th>
				</tr>
			  </thead>
			  {/* Table body */}
			  <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
				{userData &&
				  userData.map((item,index) => {
					return (
					  <tr key={index}>
						<td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">
							{item.user_name}
						  </div>
						</td>
						<td className="p-4 whitespace-nowrap">
						  <div className="text-base text-center text-black dark:text-slate-300">
							{item.dump_leads_count}
						  </div>
						</td>
						<td className="p-4 whitespace-nowrap w-[110px]">
						  <div className="flex items-center justify-center">
							<div
							  aria-controls="search-modal"
							  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
							  title="Tranfer Lead"
							  onClick={()=>handleSubmit(item.user_id)}
							>
							  <svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5 cursor-pointer"
								viewBox="0 0 448 512"
							  >
								<path
								  className=" fill-current "
								  d="M48.032 424V88C48.032 74.75 37.275 64 24.016 64S0 74.75 0 88V424C0 437.25 10.757 448 24.016 448S48.032 437.25 48.032 424ZM271.743 145.469L363.718 232H120.08C106.821 232 96.064 242.75 96.064 256S106.821 280 120.08 280H363.718L271.743 366.531C266.708 371.25 264.175 377.625 264.175 384C264.175 389.906 266.333 395.812 270.711 400.438C279.779 410.094 294.977 410.562 304.639 401.469L440.73 273.469C450.423 264.406 450.423 247.594 440.73 238.531L304.639 110.531C294.977 101.438 279.779 101.906 270.711 111.563C261.611 121.188 262.049 136.375 271.743 145.469Z"
								/>
							  </svg>
							</div>
						  </div>
						</td>
					  </tr>
					);
				  })}
			  </tbody>
			</table>:<div className='w-full flex items-center justify-center'>
	  <p className='lg:text-xl text-base font-semibold'>No Agents Found</p>
	</div>}
		  </div>
		</div>
	  </div>
	</div>
	
{/* <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} page={page} totalPages={totalPage}/> */}
  </div>
  )
}
