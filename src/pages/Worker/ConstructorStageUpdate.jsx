import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Heading from '../../components/Heading';
import SingleDateInput from '../../components/SingleDateInput';
import Button from '../../components/Button';
import SingleInput from '../../components/SingleInput';
import Spinner from '../../components/Spinner';
import { toast } from 'sonner';
import Axios from '../../Axios';
import { useSelector } from 'react-redux';

export default function ConstructorStageUpdate() {
	const {state}=useLocation();
	const accessToken = useSelector((state) => state.user.user);
	const navigate=useNavigate();
	if(!state){
		navigate(-1)
	}
	console.log(state);
	const [targetDate,setTargetDate]=useState(state?.stage?.targetDate??'')
	const [completedDate,setCompletedDate]=useState(state?.stage?.completedDate??'')
	const [percentage,setPercentage]=useState(state?.stage?.percentage??'')
	const [loading,setLoading]=useState(false);

	const handleSubmit=(check)=>{
		// setLoading(true);
		let data={};
		const stageNumber=state?.stage?.stage.slice(state?.stage?.stage.indexOf(" ")+1)
		if(check=='target'){
			const key=`target_date_stage_${stageNumber}`
			if(!targetDate){
				toast.error("Select Target Date before submitting !")
			}
			else{
				data={
					[key]:targetDate
				}
			}
		}
		else if(check=='completed'){
			const key1=`completed_date_stage_${stageNumber}`
			const key2=`completed_stage_${stageNumber}`

			if(!completedDate){
				toast.error("Select Completed Date before submitting !")
			}
			else{
				data={
					[key1]:completedDate,
					[key2]:true,
				}
			}
		}
		else if(check=='percentage'){
			const key=`percentage_stage_${stageNumber}`
			if(!percentage){
				toast.error("Enter percentage before submitting !")
			}
			else{
				data={
					[key]:percentage,
				}
			}
		}
		else if(check=='notcompleted'){
			const key1=`completed_date_stage_${stageNumber}`
			const key2=`completed_stage_${stageNumber}`
			data={
				[key1]:null,
				[key2]:false,
			}
		}

		if(Object.keys(data).length > 0){
			setLoading(true);
			Axios.patch(`/civil-worker/civil-stages/${state?.data?.id}/`,data, {
				headers: {
				  Authorization: `Bearer ${accessToken}`,
				},
			  })
				.then((res) => {
				  toast.success(res.data.message)
				  navigate(-1);
				  setLoading(false)
				})
				.catch((err) => {
				  console.log(err);
				  toast.error(err?.response?.data?.detail??'There was a problem try again later')
				  setLoading(false)
				});
		}		
	}
	
  return (loading?<Spinner/>:
	<div>
      <Heading title={"Stage Details"} />
	  <div className="py-3 w-full mx-auto space-y-5">
        <div className="flex justify-end items-end gap-5 xl:flex-row flex-col">
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-full w-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              Stage Update
            </h2>
          </header>
          <div className="px-5 py-4 w-full flex flex-col 2xl:flex-row flex-wrap gap-12 justify-between items-center">
            <div className='w-full md:p-8 p-4 rounded-md border'>
					<h1 className='text-lg font-semibold'>Set Target Date</h1>
					<div className='flex flex-col md:flex-row items-center justify-evenly w-full gap-5 mt-2'>
						<div className='w-full'>
							<SingleDateInput placeholder={'Select Target Date'} value={targetDate}  onChange={setTargetDate}/>
						</div>
						<Button title={'Submit'} onClick={()=>handleSubmit("target")}/>
					</div>
			</div>
			<div className='w-full md:p-8 p-4 rounded-md border'>
					<h1 className='text-lg font-semibold'>Set Completed Date</h1>
					<div className='flex flex-col items-center justify-evenly w-full gap-5 mt-2'>
						<div className='w-full'>
							<SingleDateInput placeholder={'Select Completed Date'} value={completedDate}  onChange={setCompletedDate}/>
						</div>
						<div className='w-full flex items-center justify-center flex-col gap-5'>
							<Button title={'Submit'} onClick={()=>handleSubmit("completed")}/>
							<Button title={'Mark as Not Completed'} onClick={()=>handleSubmit("notcompleted")}/>
						</div>
						
					</div>
			</div>
			<div className='w-full md:p-8 p-4 rounded-md border'>
					<h1 className='text-lg font-semibold'>Set Stage Percentage</h1>
					<div className='flex flex-col md:flex-row items-center justify-evenly w-full gap-5 mt-2'>
						<div className='w-full'>
							<SingleInput type={'number'} placeholder={"Enter stage percentage"} value={percentage} onChange={(e)=>setPercentage(e.target.value)}/>
						</div>
						<Button title={'Submit'} onClick={()=>handleSubmit('percentage')}/>
					</div>
			</div>
          </div>
        </div>
      </div>
    </div>
  )
}
