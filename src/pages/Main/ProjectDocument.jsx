import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import SingleInput from '../../components/SingleInput';
import SingleSelectInput from '../../components/SingleSelectInput';
import Axios from '../../Axios';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import { toast } from 'sonner';
import Spinner from '../../components/Spinner';
import { baseURL } from '../../Constant';
import { useNavigate } from 'react-router-dom';

export default function ProjectDocument() {
	const accessToken=useSelector((state)=>state.user.user);
	const navigate=useNavigate();

	const [projectDocument, setProjectDocument] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [date, setDate] = useState('');
    const [documentFile, setDocumentFile] = useState('');
	const [projectData, setProjectData] = useState('');
    const [documentTypeData, setDocumentTypeData] = useState('');
	const [data,setData]=useState([])
	const [loading,setLoading]=useState(true);

	useEffect(()=>{
		//Projects
		Axios.get('/misc/project/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
					.then(res=>{
						// console.log(res.data)
						const data=res.data.map(item=>(
							{
								label:item.project_name,
								value:item.id
							}
						))
						setProjectData(data);
					
					})
					.catch(err=>{
						console.log(err)
					})

		//Document Type			
		Axios.get('/misc/document-type/',{
			headers:{
				Authorization:`Bearer ${accessToken}`
		}
		})
		.then(res=>{
			// console.log(res.data)
			const data=res.data.map(item=>(
				{
					label:item.document_of,
					value:item.id
				}
			))
			setDocumentTypeData(data);
		})
		.catch(err=>{
			console.log(res.response.data)
		})
	},[])
	const handleSubmit=()=>{
		
			setLoading(true)
			const formData = new FormData();
			formData.append('project_document',projectDocument)
			formData.append('document_type',documentType)
			formData.append('date',date)
			formData.append('document_file',documentFile)

			Axios.post('/misc/upload-document/',formData,{
				headers:{
					Authorization:`Bearer ${accessToken}`
			}
			})
			.then(res=>{
				// console.log(res.data)
				toast.success(res.data.message)
				setLoading(false)
				navigate('/account/myjobdesk')
			})
			.catch(err=>{
				// console.log(err.response.data)
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
	}
	useEffect(()=>{
		Axios.get('/misc/upload-document/',{
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

	// const handleDownload=(item)=>{
	// 	Axios.get(`${item}`,{
	// 		headers:{
	// 			Authorization:`Bearer ${accessToken}`
	// 		}
	// 	})
	// 	.then(res=>res.data.blob())
	// 	.then(blob=>{
	// 		const blobURL=window.URL.createObjectURL(new Blob([blob]))
	// 		const fileName=url.split("/").pop();
	// 		const aTag=document.createElement('a');
	// 		aTag.href=blobURL;
	// 		aTag.setAttribute('download',fileName);
	// 		document.body.appendChild(aTag);
	// 		aTag.click();
	// 		aTag.remove();
	// 	})
	// }
  return (loading?<Spinner/>:
	<div>
	  <Heading title={"Project Document"}/>
	<div className="col-span-full xl:col-span-6 my-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
	<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
	  <h2 className="font-semibold text-slate-800 dark:text-slate-100">Upload Project Document</h2>
	</header>
	  <div className="p-2 w-full   mx-auto">
	  	<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
				<div className='md:w-1/4 w-full'>
					<SingleSelectInput label={"Select Project"} placeholder={"--Select Project--"} option={projectData || []} value={projectDocument} onChange={setProjectDocument} />
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleSelectInput label={"Select Document Type"} placeholder={"--Select Type--"} option={documentTypeData || []} value={documentType} onChange={setDocumentType} />
				</div>
				<div className='md:w-1/4 w-full'>
					<label htmlFor="">Select File</label>
					<input type='file'  placeholder={"Select Document"} onChange={(e)=>setDocumentFile(e.target.files[0])}/>
					{/* <SingleInput label={"Select File"} placeholder={"Enter Payable Amount"} value={documentFile} onChange={e => setDocumentFile(e.target.file[0])} /> */}
				</div>
				<div className='md:w-1/4 w-full'>
					<SingleInput label={"Date"} placeholder={""} type={"date"} value={date} onChange={e => setDate(e.target.value)} />
				</div>
			</div>
			<div className='flex items-center justify-center m-5'>
				<Button title={'Submit'} onClick={handleSubmit}/>
		</div>
		</div>
		{data?<div className="p-3">

{/* Table */}
<div className="overflow-x-auto">
  <table className="table-auto w-full">
	{/* Table header */}
	<thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
	  <tr >
	  <th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Project</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Document Type</div>
		</th>
		<th className="p-2 whitespace-nowrap">
		  <div className="font-semibold text-center">Actions</div>
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
				<div className="text-base text-center text-black dark:text-slate-300">{item.project_document.project_name}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="text-base text-center">{item.document_type.document_of}</div>
			  </td>
			  <td className="p-4 whitespace-nowrap">
				<div className="flex items-center justify-center">
					{item.document_file && <a href={`${baseURL}${item.document_file.slice(1)}`} target='_black'>
						<div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Add Stages'>
						<svg className='w-5 h-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path className=' fill-current ' d="M480 352H346.5L301.25 397.25C289.156 409.344 273.094 416 256 416S222.844 409.344 210.75 397.25L165.5 352H32C14.326 352 0 366.326 0 384V480C0 497.672 14.326 512 32 512H480C497.674 512 512 497.672 512 480V384C512 366.326 497.674 352 480 352ZM432 456C418.801 456 408 445.199 408 432C408 418.799 418.801 408 432 408S456 418.799 456 432C456 445.199 445.199 456 432 456ZM233.375 374.625C239.625 380.875 247.812 384 256 384S272.375 380.875 278.625 374.625L406.629 246.621C419.123 234.125 419.123 213.867 406.629 201.371C394.133 188.875 373.873 188.875 361.379 201.371L288 274.75V32C288 14.326 273.674 0 256 0C238.328 0 224 14.326 224 32V274.75L150.621 201.371C138.127 188.875 117.867 188.875 105.371 201.371C92.877 213.867 92.877 234.125 105.371 246.621L233.375 374.625Z"/>
						</svg>
					</div>
					</a>}
				  
				</div>
			  </td>
			</tr>
		  )
		})
	  }
	</tbody>
  </table>
</div>
</div>:""}
	  </div>
	</div>
  )
}
