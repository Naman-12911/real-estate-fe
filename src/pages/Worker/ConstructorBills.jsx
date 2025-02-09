import React, { useEffect, useState } from 'react'
import Heading from '../../components/Heading'
import Button from '../../components/Button'
import Axios from '../../Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from '../../components/Table';
import moment from 'moment';
import SingleTextArea from '../../components/SingleTextArea';
import SingleDateInput from '../../components/SingleDateInput';
import { toast } from 'sonner';
import ModalConstructorDelete from '../../components/ModalConstructorDelete';
import Spinner from '../../components/Spinner';
import SingleInput from '../../components/SingleInput';
import SingleFileInput from '../../components/SingleFileInput';
import { baseURL } from '../../Constant';

export default function ConstructorBills() {
	const navigate=useNavigate();
	const {state}=useLocation();
	if(!state){
		navigate(-1)
	}
	const accessToken = useSelector((state) => state.user.user);
	const [id,setId]=useState('');
	const [image,setImage]=useState('');
	const [title,setTitle]=useState('');
	const [patch,setPatch]=useState(false);
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(true);
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [submitLoading,setSubmitLoading]=useState(false);


	useEffect(() => {
		Axios.get(`/civil-worker/bill/?unit=${state}`, {
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		})
		  .then((res) => {
			setData(res.data);
			setLoading(false)
		  })
		  .catch((err) => {
			console.log(err);
			setLoading(false)
		  });
	  }, [submitLoading]);



	const columns = [
		{
		  id: "slNo",
		  header: "SL No",
		  cell: (info) => {
			return info.row.index + 1;
		  },
		  meta: {
			smallWidth: true,
		  },
		},
		{
		  id: "date",
		  accessorKey: "created_at",
		  header: "Date",
		  cell: (info) => {
			const { created_at } = info.row.original;
			return moment(created_at).format("DD-MM-YYYY")
		  },
		  meta: {
			smallWidth: true,
		  },
		},
		{
		  id: "title",
		  header: "Title",
		  accessorKey: "title",
		  meta: {
			textWrap:true
		  },
		},
		{
			id: "image",
			header: "image",
			meta: {
			  textWrap:true
			},
			cell: (info) => {
				const {image}=info.row.original;
				return <a href={`${baseURL+image.slice(1)}`} target='_blank' className='text-blue-600'>Preview</a>
			}
		  },
		{
			header: "Action",
			cell: (info) => {
			  const data = info.row.original;
			  return (
				<div className="flex items-center justify-center gap-6">
				  <div
					className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
					title="Edit"
					onClick={() => {
						setPatch(true)
						setId(data?.id)
						setTitle(data?.title)
						setImage(data?.image)
					}}
				  >
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  className="w-5 h-5 cursor-pointer"
					  viewBox="0 0 512 512"
					>
					  <path
						className=" fill-current "
						d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
					  />
					</svg>
				  </div>
				  <div
					className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
					title="Delete"
					onClick={(e) => {
						e.stopPropagation();
						setId(data?.id)
						setSearchModalOpen(true);
					}}
				  >
					<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer" viewBox="0 0 448 512">
					<path className=" fill-current " d="M424 80H349.625L315.625 23.25C306.875 8.875 291.25 0 274.375 0H173.625C156.75 0 141.125 8.875 132.375 23.25L98.375 80H24C10.745 80 0 90.745 0 104V104C0 117.255 10.745 128 24 128H32L53.25 467C54.75 492.25 75.75 512 101.125 512H346.875C372.25 512 393.25 492.25 394.75 467L416 128H424C437.255 128 448 117.255 448 104V104C448 90.745 437.255 80 424 80ZM173.625 48H274.375L293.625 80H154.375L173.625 48ZM346.875 464H101.125L80.125 128H367.875L346.875 464Z"/></svg>
				  </div>
				</div>
			  );
			},
			meta: {
			  smallWidth: true,
			},
		  },
	  ];

	  const handleSubmit=()=>{
		if(!title || !image){
			toast.error("Please fill up the  Image/Title fields")
			return
		}
		setSubmitLoading(true)
		let request;

		const formData=new FormData();
		formData.append("unit",state)
		formData.append("title",title)
		{(typeof image==='string') ?"":formData.append("image", image)}

		if(patch){
			request=Axios.patch(`/civil-worker/bill/${id}/`,formData,{
				headers: {
				  Authorization: `Bearer ${accessToken}`,
				},
			  })
		}
		else{
			request=Axios.post("/civil-worker/bill/",formData,{
				headers: {
				  Authorization: `Bearer ${accessToken}`,
				},
			  })
		}
		request
		.then((res) => {
			  toast.success(res.data.message);
			  setTitle("");
			  setImage("");
			  setPatch(false)
			  setSubmitLoading(false)
			})
			.catch((err) => {
			  console.log(err);
			  setSubmitLoading(false)
			});
	  }

  return (submitLoading?<Spinner/>:
	<div>
	<Heading title={"Bills"} />
      <div className="py-3 w-full mx-auto space-y-5">
		<div className="flex justify-end items-end gap-5 xl:flex-row flex-col">
			<Button
				title={"Back"}
				onClick={() =>
				navigate(-1)
				}
			/>
		</div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full w-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
          <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
             Bills
            </h2>
          </header>
		  <div className='w-full flex justify-center items-center flex-col p-4 gap-5'>
			<div className='md:w-1/2 w-full'>
				<SingleInput placeholder={'Enter title'} label={'Title'} value={title} onChange={(e)=>setTitle(e.target.value)}/>
			</div>
			<div className='md:w-1/2 w-full'>
				<SingleFileInput label={'Image'}  onChange={(e)=>setImage(e.target.files[0])}/>
			</div>
			<Button title={patch?'Update':'Submit'} onClick={handleSubmit}/>
		  </div>
        </div>
      </div>
	  <ModalConstructorDelete
	  	 id="search-modal"
		   searchId="search"
		   modalOpen={searchModalOpen}
		   setModalOpen={setSearchModalOpen}
		   url={`/civil-worker/bill/${id}/`}
		   setLoading={setSubmitLoading}
	  />
	  <Table
        columns={columns}
        data={data}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Miscellaneous List
          </h2>
        }
      />
	</div>
  )
}
