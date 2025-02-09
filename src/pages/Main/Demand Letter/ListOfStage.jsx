import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import { useLocation, useNavigate } from 'react-router-dom'
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import dateFormat from "dateformat";

export default function ListOfStage() {
	const {state}=useLocation();
	const accessToken=useSelector((state)=>state.user.user);
	const [data,setData]=useState('');
	
	const navigate=useNavigate();

	useEffect(()=>{
		Axios.get(`documentation/demand-letter-personal-details/?personal_details=${state.booking.personal_details_id}`,{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			setData(res.data)
		})
		.catch(err=>{
			console.log(err)
		})
	},[])
  return (
	<div>
      <Heading title={"Demand Letter"}/>
	  <div className=' flex items-end md:items-center justify-end md:gap-5 gap-2 flex-col md:flex-row '>
            <Button title={'Back'} onClick={()=>navigate(-1)}/>
			</div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">
              Demand Letter Stages
            </h2>
          </header>
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 space-x-10">
              <span>Name: {state.applicant_name}</span>
              <span>Project: {state.booking.project_names}</span>
              <span>Unit Number: {state.booking.unit_nos}</span>
              <span>Type: {state.booking.type_names}</span>
            </h2>
          </header>
          <div className="p-3">
		  <div className="overflow-x-auto">
			<table className="table-auto w-full">
				{/* Table header */}
				<thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
				<tr >
				<th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Stages</div>
					</th>
					<th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Due Amount</div>
					</th>
					<th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Demand Till Date</div>
					</th>
					<th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Due Date</div>
					</th>
					<th className="p-2 whitespace-nowrap">
					<div className="font-semibold text-center">Actions</div>
					</th>
				</tr>
				</thead>
				{/* Table body */}
				<tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
				{data.length&&data.map(item=>(
					<tr>
					<td className="p-4 whitespace-nowrap">
						<div className="text-base text-center text-black dark:text-slate-300">{item.payment_stage.stage_name}</div>
					</td>
					<td className="p-4 whitespace-nowrap">
						<div className="text-base text-center">{item.payment_stage.paybale_amount}</div>
					</td>
					<td className="p-4 whitespace-nowrap">
						<div className="text-base text-center">{dateFormat(item.date,'dd-mm-yyyy')}</div>
					</td>
					<td className="p-4 whitespace-nowrap">
						<div className="text-base text-center">{dateFormat(item.payment_stage.payable_date,'dd-mm-yyyy')}</div>
					</td>
					{/* <td className="p-4 whitespace-nowrap">
						<div className="text-base text-center">{item.}</div>
					</td> */}
					<td className="p-4 whitespace-nowrap ">
						<div  className='flex justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='View Demand Letter' onClick={()=>navigate('/main/demandletter/generatedemandletter',{state:item})}>
						<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 384 512">
						<path className=' fill-current ' d="M80 256V320C80 337.672 94.326 352 112 352H272C289.674 352 304 337.672 304 320V256C304 238.328 289.674 224 272 224H112C94.326 224 80 238.328 80 256ZM365.256 93.383L290.627 18.746C278.625 6.742 262.348 0 245.373 0H64C28.654 0 0 28.652 0 64L0.02 448C0.02 483.344 28.674 512 64.02 512H320C355.199 512 384 483.199 384 448V138.641C384 121.664 377.258 105.383 365.256 93.383ZM336.002 448C336.002 456.836 328.838 464 320.002 464H64.018C55.18 464 48.018 456.836 48.018 448L48 64.125C48 55.289 55.164 48.125 64 48.125H224.008V128C224.008 145.672 238.334 160 256.008 160H336.002V448ZM96 128H176C184.844 128 192 120.844 192 112S184.844 96 176 96H96C87.156 96 80 103.156 80 112S87.156 128 96 128ZM96 192H176C184.844 192 192 184.844 192 176S184.844 160 176 160H96C87.156 160 80 167.156 80 176S87.156 192 96 192ZM288 384H208C199.156 384 192 391.156 192 400S199.156 416 208 416H288C296.844 416 304 408.844 304 400S296.844 384 288 384Z"/>
					</svg>
						</div>
					</td>
					</tr>
					))}
				</tbody>
  </table>
</div>
		  </div>
        </div>
      </div>
    </div>
  )
}
