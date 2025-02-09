import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Heading from "../../components/Heading";
import Axios from "../../Axios";
import Button from "../../components/Button";
import Table from "../../components/Table";
import ModalConstructorDelete from "../../components/ModalConstructorDelete";

export default function SearchConstructor() {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.user);

  const [data, setData] = useState("");
  const [loading,setLoading]=useState(true);
  const [columnFilter, setColumnFilter] = useState([])
  const [id,setId]=useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);


  useEffect(() => {
    const paramObject = {

    };

    columnFilter.forEach((filter) => {
      if(filter.id=="civil_statge"){
        paramObject["unit"] = filter.value;
      }
      paramObject[filter.id] = filter.value;
    });

    const paramArray = [];
    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }

    const queryString = paramArray.join("&");
    Axios.get(`/civil-worker/constructor-profile/?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => {
        // console.log(res.data)
        setData(res.data);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }, [columnFilter,searchModalOpen]);



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
      accessorKey: "name",
      header: "Constructor Name",
      meta: {
        filterVariant: "text",
        smallWidth: true,
      },
    },
    {
      accessorKey: "address",
      header: "Address",
      meta: {
        textWrap:true
      },
    },
    {
      accessorKey: "unit",
      header: "Units",
      meta: {
        filterVariant: "text",
        smallWidth: true,
        textWrap:true,
        filterTextType: "number",
      },
    },
    {
      header: "Action",
      cell: (info) => {
        const data = info.row.original;
        return (
          <div className="flex items-center justify-center gap-4">
            <div
              to={{pathname:"/constructor/constructor/profile",state: data}}
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="View"
              onClick={() => navigate("/constructor/constructor/profile", { state: data })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 576 512"
              >
                <path
                  className=" fill-current "
                  d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"
                />
              </svg>
            </div>
            <div
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Edit"
              onClick={() => navigate("/constructor/constructor", { state:{type:'Edit',data:data} })}
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

  return (
    <div>
      <Heading title={"Contractor"} />
      <div className="py-3 w-full mx-auto space-y-5">
      <div className="flex justify-end items-end gap-5 xl:flex-row flex-col">
            <Button
              title={"Add Contractor"}
              onClick={() => navigate("/constructor/constructor", { state:{type:'Add'} })}
            />
          </div>
      </div>
      <ModalConstructorDelete
	  	 id="search-modal"
		   searchId="search"
		   modalOpen={searchModalOpen}
		   setModalOpen={setSearchModalOpen}
       setLoading={setLoading}
		   url={`/civil-worker/constructor-profile/${id}/`}
	  />
      <Table
        setColumnFilter={setColumnFilter}
        columns={columns}
        data={data}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Constructors List
          </h2>
        }
      />
    </div>
  );
}
