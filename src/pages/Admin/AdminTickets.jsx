import React, { useEffect, useRef, useState } from 'react'
import Heading from '../../components/Heading'
import { useSelector } from 'react-redux';
import Axios from '../../Axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import HorizontalScrollButton from '../../components/HorizontalScrollButton';

export default function AdminTickets() {
	const accessToken=useSelector((state)=>state.user.user);
	const navigate=useNavigate();
	
	const [data,setData]=useState('')
	const [loading,setLoading]=useState(true)
  const [del,setDel]=useState(false);

	const [searchModalOpen, setSearchModalOpen] = useState(false);

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

	useEffect(()=>{
		// setLoading(fals)
		Axios.get(`/ticket/ticket-admin/?page=${page}`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
      setTotalPage(res.data.total_pages)
			setData(res.data.results)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			toast.error(<ul>
				{Object.entries(err.response.data).map(([fieldName, fieldErrors]) => (
					<li key={fieldName}>
						<strong>{fieldName}:</strong>
						<ul>
							{fieldErrors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</li>
				))}
			</ul>)
			setLoading(false)
		})
	},[searchModalOpen,del,page])

  const handleDelete=(id)=>{
		setLoading(true)
		Axios.delete(`/ticket/ticket/${id}/`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
			}
		})
		.then(res=>{
			// setData(res.data)
			toast.success(res.data.message)
			setDel(!del)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			toast.error(<ul>
				{Object.entries(err.response.data).map(([fieldName, fieldErrors]) => (
					<li key={fieldName}>
						<strong>{fieldName}:</strong>
						<ul>
							{fieldErrors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</li>
				))}
			</ul>)
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
  return (loading?<Spinner/>:
	<div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Ticket"} />
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2  items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Tickets</h2>
        <HorizontalScrollButton onScroll={onScroll} />
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto max-h-[80vh]"ref={scrollableRef}>
          {data.length>0?<table className="table-auto w-full">
            {/* Table header */}
            <thead className="sticky top-0 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700  ">
              <tr >
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Sl No.</div>
                </th>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Phone Number</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Message</div>
                </th>
				<th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap w-[110px]">
                  <div className="font-semibold text-center w-[110px]">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                data&&data.map((item,index) => {
                  const serialNumber = (page - 1) * 50 + index + 1;
                  return (
                    <tr key={item.id}>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center ">{serialNumber}</div>
                      </td>
                       <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center  text-black dark:text-slate-300">{item.name}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center  text-black dark:text-slate-300">{item.phone_number}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.email}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.query.slice(0,80)}...</div>
                      </td>
					  <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.solved?'Solved':'Not Solved'}</div>
                      </td>
					  
                      <td className="p-4 whitespace-nowrap w-[110px]">
                        <div className="flex items-center justify-evenly">
                          <div aria-controls="search-modal" className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='View' onClick={() => navigate('/admin/viewticket',{state:item})}>
                              <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 512 512">
                                  <path className=' fill-current ' d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                             </svg>
                          </div>
                          {/* <div aria-controls="search-modal" className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Delete' onClick={()=>handleDelete(item.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 448 512"><path className=' fill-current ' d="M424 80H349.625L315.625 23.25C306.875 8.875 291.25 0 274.375 0H173.625C156.75 0 141.125 8.875 132.375 23.25L98.375 80H24C10.745 80 0 90.745 0 104V104C0 117.255 10.745 128 24 128H32L53.25 467C54.75 492.25 75.75 512 101.125 512H346.875C372.25 512 393.25 492.25 394.75 467L416 128H424C437.255 128 448 117.255 448 104V104C448 90.745 437.255 80 424 80ZM173.625 48H274.375L293.625 80H154.375L173.625 48ZM346.875 464H101.125L80.125 128H367.875L346.875 464Z"/></svg>
                          </div>               */}
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>:<div className='w-full flex items-center justify-center'>
		<p className='lg:text-xl text-base font-semibold'>No Tickets Found</p>
	  </div>}

        </div>

      </div>
    </div>
      </div>
      <Pagination handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} page={page} totalPages={totalPage}/>
    </div>
  )
}
