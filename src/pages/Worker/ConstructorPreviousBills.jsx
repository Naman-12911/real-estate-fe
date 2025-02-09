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
import { baseURL } from '../../Constant';
export default function ConstructorPreviousBills() {
	const navigate=useNavigate();
	const {state}=useLocation();
	if(!state){
		navigate(-1)
	}
	const accessToken = useSelector((state) => state.user.user);
	const [id,setId]=useState('');
	const [amount,setAmount]=useState('');
	const [title,setTitle]=useState('');
	const [patch,setPatch]=useState(false);
	const [data, setData] = useState("");
	const [loading, setLoading] = useState(true);
	const [dateSearchGrt, setdateSearchGrt] = useState("");
	const [dateSearchLess, setdateSearchLess] = useState("");


	useEffect(() => {
		setLoading(true);
		const paramObject = {
			constructor_profile: state.id,
			created_at_lte: dateSearchLess,
			created_at_gte: dateSearchGrt,
		};
	
		const paramArray = [];
		for (const key in paramObject) {
		  if (paramObject[key]) {
			paramArray.push(`${key}=${paramObject[key]}`);
		  }
		}
	
		const queryString = paramArray.join("&");
	
		Axios.get(`/excel-files/download-prev-bill/?${queryString}`, {
		  headers: {
			Authorization: `Bearer ${accessToken}`,
		  },
		})
		  .then((res) => {
			setData(res.data);
			setLoading(false);
		  })
		  .catch((err) => {
			console.log(err);
			setLoading(false);
		  });
	  }, [state.id, dateSearchGrt, dateSearchLess]);

const handleExcel=()=>{

}

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
		  header: "Bill No.",
		  accessorKey: "bill_no",
		},
		{
			header: "Action",
			cell: (info) => {
			  const {file} = info.row.original;
			  
			  return (
				<div className="flex items-center justify-center gap-6">
					<a href={`${baseURL}${file.slice(1)}`} target='_blank'>
						<div
					className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
					title="Download"
				  >
					<svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 448 512">
                                <path className=' fill-current ' d="M448 416V352C448 334.326 433.672 320 416 320S384 334.326 384 352V416C384 433.674 369.672 448 352 448H96C78.328 448 64 433.674 64 416V352C64 334.326 49.672 320 32 320S0 334.326 0 352V416C0 469.02 42.98 512 96 512H352C405.02 512 448 469.02 448 416ZM246.625 342.625L374.625 214.625C387.133 202.117 387.117 181.867 374.625 169.375C362.125 156.875 341.875 156.875 329.375 169.375L256 242.75V32C256 14.312 241.688 0 224 0S192 14.312 192 32V242.75L118.625 169.375C106.125 156.875 85.875 156.875 73.375 169.375S60.875 202.125 73.375 214.625L201.375 342.625C213.875 355.125 234.125 355.125 246.625 342.625Z"/>
                            </svg>
				  </div>
				  </a>
				  
				</div>
			  );
			},
			meta: {
			  smallWidth: true,
			},
		  },
	  ];

  return (loading?<Spinner/>:
	<div>
	<Heading title={"Previous Bill"} />
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
	  <Table
        columns={columns}
        data={data}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Previous Bill List
          </h2>
        }
      />
	</div>
  )
}
