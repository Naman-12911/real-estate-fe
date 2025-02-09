import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
// import DashboardCard10_ViewLeads from "../../partials/dashboard/DashboardCard10_ViewLeads";
// import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
// import FilterButton from "../../components/FilterButton";
import Datepicker from "../../components/Datepicker";
import ViewLeadsMain from "../../components/ViewLeadsMain";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

export default function DelayedLeads() {
	const accessToken=useSelector((state)=>state.user.user);
	const [data,setData]=useState('');
	const [loading,setLoading]=useState(true);
	const [nameSearch,setNameSearch]=useState('')
	const [dateSearchGrt,setdateSearchGrt]=useState('');
	const [dateSearchLess,setdateSearchLess]=useState('');

	// const filterData=[
	// 	{title:"All",value:23},
	// 	{title:"Paid",value:23},
	// 	{title:"Due",value:23},
	// 	{title:"Overdue",value:23},
	// ]
	const [selectedFilter,setSelectedFilter]=useState(null)

	useEffect(()=>{
		Axios.get('/social/fb/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			setData(res.data)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err.response.data)
			setLoading(false)
		})
	},[])

	const handleSearch=()=>{
		setLoading(true)
		// setData(null);
		const paramObject={
			full_name:nameSearch,
			created_at__gte:dateSearchGrt,
			created_at__lte:dateSearchLess,
		}
		const paramArray=[];
	
		for(const key in paramObject){
			if(paramObject[key]){
				paramArray.push(`${key}=${paramObject[key]}`)
			}
		}
		const queryString = paramArray.join("&");
		Axios.get(`/social/fb-lead/filter/?${queryString}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			  },
		})
		.then(res=>{
			// console.log(res.data)
			setData(res.data)
		})
		.catch(err=>{
			console.log(err.response)
		})
		setLoading(false)
	}

	useEffect(()=>{
		handleSearch();
	},[nameSearch,dateSearchGrt,dateSearchLess])
  return (loading?<Spinner/>:
    <div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Delayed Leads"} />
		<SearchInput placeholder={"Search by Name"} value={nameSearch} onChange={(e)=>setNameSearch(e.target.value)}/>
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="flex justify-between items-center">
			<div className="flex space-x-4">
				{/* {filterData.map((item)=>(
					<FilterButton isActive={selectedFilter===item?true:false} onClick={()=>setSelectedFilter(item)} title={item.title} value={item.value}/>
				))} */}
			</div>
			<Datepicker setdateSearchGrt={setdateSearchGrt} setdateSearchLess={setdateSearchLess}/>
		</div>
        <ViewLeadsMain tableData={data}/>
      </div>
    </div>
  );
}
