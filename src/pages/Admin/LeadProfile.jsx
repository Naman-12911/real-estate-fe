import React, { useEffect, useRef, useState } from 'react'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
// import InfoTable from '../../components/InfoTable'
import InfoTable_Big from '../../components/InfoTable_Big'
// import DashboardCard06_Small from '../../partials/dashboard/DashboardCard06_Small'
// import ViewLeadsMain from '../../components/ViewLeadsMain'
// import Modal from '../../components/Modal'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../../Axios'
import Spinner from '../../components/Spinner'
import { useSelector } from 'react-redux'
import dateFormat from "dateformat";
import HorizontalScrollButton from '../../components/HorizontalScrollButton'
import Table from '../../components/Table'
import moment from 'moment'

export default function LeadProfile() {
	const {state}=useLocation();
	const navigate=useNavigate();
	// console.log(state);
	const accessToken=useSelector((state)=>state.user.user);

	const [modalOpen,setModalOpen]=useState(false)
	const [tableData,setTableData]=useState('')
	const [loading,setLoading]=useState(true)

	useEffect(()=>{
		Axios.get(`/social/fb-lead/lead-edit/${state?.id}/`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log("Help",res.data)
			setTableData(res.data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

	const scrollableRef = useRef(null);
	const onScroll = (offset) => {
	  if (scrollableRef && scrollableRef.current) {
		scrollableRef.current.scrollBy({
		  left: offset,
		  behavior: 'smooth'
		});
	  }
	};


	const columns = [
		{
		  id: "slNo",
		  header: "SL No",
		  cell: (info) => {
			return info.row.index + 1;
		  },
		  meta:{
			smallWidth:true,
		  }
		},
		{
		  accessorKey: "createdDate",
		  header: "Date",
			cell:(info)=>{
				const {created_at}=info.row.original;
				return moment(new Date(created_at)).format("DD-MM-YYYY")
			},
			meta:{
				smallWidth:true,
			  }
		},
		{
		  accessorKey: "mode_name",
		  header: "Mode",
		  meta:{
			smallWidth:true,
		  }
		},
		{
		  accessorKey: "description",
		  header: "Feedback",
		  meta:{
			// smallWidth:true,
			textWrap:true,
		  }
		},
		{
		  accessorKey: "status_of_lead_name",
		  header: "Status",
		  meta:{
			smallWidth:true,
		  }
		},
		{
		  accessorKey: "status_of_lead_warm_hot_cold",
		  header: "HOT/WARM/COLD",
		  meta:{
			smallWidth:true,
		  }
		},
		{
		  accessorKey: "visit_number",
		  header: "Visit Number",
		  meta:{
			smallWidth:true,
		  }
		},
		{
			accessorKey: "user_name",
			header: "Disscused By",
			meta:{
			  smallWidth:true,
			}
		  },
		{
		  accessorKey: "next_schedule_mode_name",
		  header: "Next Schedule Mode",
		  meta:{
			smallWidth:true,
		  }
		},
		{
			accessorKey: "next_schedule_date",
			header: "Next Schedule Date",
			cell:(info)=>{
				const {next_schedule_date}=info.row.original;
				return moment(new Date(next_schedule_date)).format("DD-MM-YYYY")
			},
			meta:{
				smallWidth:true,
			  }
		  },
		  {
			accessorKey: "prject_name",
			header: "Booked Project",
			meta:{
			  smallWidth:true,
			}
		  },
		  {
			accessorKey: "date_of_booking",
			header: "Date Of Booking",
			meta:{
			  smallWidth:true,
			}
		  },
	  ];

  return (loading?<Spinner/>:
	<div>
	  <Heading title={"Client Information"}/>
	  <div className='py-3 w-full   mx-auto space-y-7'>
	  <div className=' flex items-end md:items-center justify-end md:gap-5 gap-2 flex-col md:flex-row '>
		<Button title={"Edit Profile"} onClick={()=>navigate('/admin/editprofile',{state:state})}/>
		<Button title={"Add Discussion"} onClick={()=>navigate('/sale/adddiscussion',{state:state?state:data})}/>
		<Button title={"Back"} onClick={()=>navigate(-1)}/>
	  </div>
		<div className="grid grid-cols-12 gap-6">
			<InfoTable_Big title={"Client Information"} data={state}/>
		</div>
	  </div>
	  <Table
        columns={columns}
        data={tableData}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Discussions
          </h2>
        }
      />
	</div>
  )
}
