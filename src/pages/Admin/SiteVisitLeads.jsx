import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading';
// import dateFormat from "dateformat";
import Axios from '../../Axios';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import HorizontalScrollButton from '../../components/HorizontalScrollButton';
import Button from '../../components/Button';

export default function SiteVisitLeads() {
	const {state}=useLocation();
  const navigate=useNavigate()
  const accessToken=useSelector((state)=>state.user.user);
  const [loading,setLoading]=useState(true)
  const [data,setData]=useState();

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
    setLoading(true)
    //Lead Source Type
    Axios.get(`/social/agent-site-visit-fb/?site_visits=${state.key}&page=${page}&user_id=${state.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setTotalPage(res.data.total_pages)
        setData(res.data.results);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false)
      });
},[page])

const scrollableRef = useRef(null);
const onScroll = (offset) => {
  if (scrollableRef && scrollableRef.current) {
    scrollableRef.current.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }
};


	console.log(state);
  return (
	<div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Agent Site Visit"} />
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
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leads</h2>
        <HorizontalScrollButton onScroll={onScroll} />
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
         {loading?<Spinner/>:data?.length>0? <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr >
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Site Visit Date/Time</div>
                </th> */}
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
                  <div className="font-semibold text-center">Project Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Project Type</div>
                </th>
				        <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lead Source</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Feedback</div>
                </th>
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center w-[110px]">Marketing</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center w-[110px]">Actions</div>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                data&&data.map((item,index) => {
                  const serialNumber = (page - 1) * 50 + index + 1;
                  return (
                    <tr key={item.id}>
                      {/* <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{dateFormat(item.item.updated_at,'dd-mm-yyyy')}{dateFormat(item.item.updated_at,'HH-MM')}</div>
                      </td> */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center text-black dark:text-slate-300">{serialNumber}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center text-black dark:text-slate-300">{item.full_name}</div>
                      </td>
					  <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.phone_number}</div>
                      </td>
					              <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.project_name}</div>
                      </td>
                     
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item?.project_type_name}</div>
                      </td>
					            <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.lead_source}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.feedback?.slice(0,60)}...</div>
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
