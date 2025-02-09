import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import Heading from '../../components/Heading'
import Axios from '../../Axios'
import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
import SingleSelectInput from '../../components/SingleSelectInput';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function EmailMessage() {
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();
	const navigate=useNavigate();

	const [projectData,setProjectData]=useState('');
	const [project,setProject]=useState('');
	const [allButton,setAllButton]=useState('')
	const [projectTypesData,setProjectTypesData]=useState('');

	
	useEffect(()=>{
		Axios.get("/misc/project/", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			})
			.then((res) => {
				const data=res.data.map(item=>({
					value:item.id,
					label:item.project_name,
				}))
				setProjectData(data);
			})
			.catch((err) => {
				// console.log(err);
			});
	},[])

	useEffect(()=>{
		Axios.get(`/misc/project-type-filter/?project_id=${project}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			})
			.then((res) => {
				const data=res.data.map(item=>({
					value:item.id,
					label:item.property_type,
				}))
				setProjectTypesData(data);
			})
			.catch((err) => {
				// console.log(err);
			});
	},[project])

	// useEffect(()=>{
	// 	Axios.get("/whats-app/message/all/", {
	// 		headers: {
	// 			Authorization: `Bearer ${accessToken}`,
	// 		},
	// 		})
	// 		.then((res) => {
	// 			// console.log(res.data);
	// 			setAllButton(res.data[0]);
	// 		})
	// 		.catch((err) => {
	// 			// console.log(err);
	// 		});
	// },[])

	const getWhatsAppMessageProject = (name,type) => {
		const data={
			email_list:state,
			project_name:name?name:'',
			project_type:type?type:'',
		}
			Axios.post(`/mail/mass-email/`,data, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				})
				.then((res) => {
					console.log(res.data);
					navigate(-1);
				})
				.catch((err) => {
					// console.log(err);
				});
	  }
  return (
	<div>
      <Heading title={"Email Marketing"} />
	  <div className="py-3 w-full  mx-auto space-y-5">
	  <div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
	  </div>
	  
      <div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Click on button to send Email
          </h2>
        </header>
        <div className="p-8 w-full   mx-auto">
          <div className="flex justify-center items-center space-y-10 flex-col">
			<div className='flex gap-5 items-center justify-center flex-col'>
				<div className='flex items-center justify-center gap-5 lg:flex-row flex-col'>
				{projectData&&projectData.map(item=>(
								<Button title={item.label} onClick={()=>getWhatsAppMessageProject(item.value,"")}/>
							))}
				</div>
				<Button title={'All Projects'} onClick={()=>getWhatsAppMessageProject("All","")}/>
			</div>
			{projectData.length>0&&<SingleSelectInput
				value={project}
				onChange={setProject}
				label={'Select Project to get More Types:'}
				placeholder={'Select Project'}
				option={projectData}
			/>}
			<div className='flex items-center justify-center gap-5 lg:flex-row flex-col'>
			{project&&projectTypesData&&projectTypesData.map(item=>(
								<Button title={item.label} onClick={()=>getWhatsAppMessageType("",item.value)}/>
							))}
			</div>
          </div>
        </div>
      </div>
    </div>
  )
}
