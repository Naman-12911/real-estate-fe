import React, { useEffect, useState } from 'react'
import Heading from '../../../components/Heading'
import SingleInput from '../../../components/SingleInput'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button';
import Axios from '../../../Axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import SingleSelectInput from '../../../components/SingleSelectInput';
import SingleTextArea from '../../../components/SingleTextArea';
import { baseURL } from '../../../Constant';

export default function SingleFAQ() {
	const navigate=useNavigate();
	const accessToken=useSelector((state)=>state.user.user);
	const {state}=useLocation();

	const [project, setProject] = useState(state?.project_faq.id || "");
	const [projectData, setProjectData] = useState([]);
	const [question, setQuestion] = useState(state?.questions || "");
	const [answer, setAnswer] = useState(state?.answer || "");
	const [image, setImage] = useState(state?.image || "");
	const [video, setVideo] = useState(state?.video || "");

	const [loading,setLoading]=useState(false);


	const handleSubmit=()=>{
		setLoading(true);
		const formData=new FormData();
		formData.append('project_faq',project)
		formData.append('questions',question)
		formData.append('answer',answer)
		{(typeof image==='string') ?"":formData.append("image", image);}
		{(typeof video==='string') ?"":formData.append("video", video);}

		const axiosRequest = state
		? Axios.patch(`/admin-pannel/faq/${state.id}/`,formData, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  })
		: Axios.post('/admin-pannel/faq/',formData, {
			headers: {
			  Authorization: `Bearer ${accessToken}`
			}
		  });

		axiosRequest
		.then(res=>{
			// console.log(res.data)
			toast.success(res.data.message)
			navigate(-1)
		})
		.catch(err=>{
			console.log(err)
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
		setLoading(false);
	}

	useEffect(() => {
		Axios.get("/admin-pannel/project/", {
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		})
		  .then((res) => {
			// console.log(res.data)
			const data = res.data.map((item) => ({
			  value: item.id,
			  label: item.project_name,
			}));
			setProjectData(data);
			setLoading(false);
		  })
		  .catch((err) => {
			console.log(err.response.data);
			setLoading(false);
		  });
	  }, []);

  return (
	<div>
	  <Heading title={"FAQ"} />
	  <div className="py-3 w-full   mx-auto space-y-5">
	  <div className="w-full flex justify-end items-end">
          <Button title={'Back'} onClick={()=>navigate(-1)}/>
        </div>
		<div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
			<header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
				<h2 className="font-semibold text-slate-800 dark:text-slate-100">{state?'Edit':'Add'} FAQ</h2>
			</header>
			<div className='px-5 py-4 flex items-center justify-evenly gap-5 flex-wrap'>
			<div className="md:w-1/2 w-full">
              <SingleSelectInput
                label={"Project"}
                option={projectData}
                placeholder={"Select Project"}
                value={project}
                onChange={setProject}
              />
            </div>
				<div className='md:w-1/2 w-full'>
					<SingleInput label={"Question"} placeholder={"Enter Question"} value={question} onChange={e => setQuestion(e.target.value)} />
				</div>
				<div className='md:w-1/2 w-full'>
					<SingleTextArea label={"Answer"} placeholder={"Enter Answer"} value={answer} onChange={e => setAnswer(e.target.value)} />
				</div>
				<div className='md:w-1/2 w-full'>
					<SingleInput type={'file'} label={"Image"} onChange={e => setImage(e.target.files[0])} />
				</div>
				<div className='md:w-1/2 w-full'>
					<SingleInput type={'file'} label={"Video"} onChange={e => setVideo(e.target.files[0])} />
				</div>

				{(state?.image||state?.video)&&<div className='md:w-1/2 w-full flex items-center justify-between flex-col'>
					<p className='w-full'>Preview</p>
					{state?.image&&<a href={baseURL+image.slice(1)} className='mt-5' target='_blank'><Button title={'Image'}/></a>}
					{state?.video&&<a href={baseURL+video.slice(1)} className='mt-5' target='_blank'><Button title={'Video'}/></a>}
				</div>}
			</div>
			<div className='flex items-center justify-center m-5 gap-5'>
				<Button title={state?"Update":"Submit"} onClick={handleSubmit}/>
		</div>
		</div>
	  </div>
	</div>
  )
}
