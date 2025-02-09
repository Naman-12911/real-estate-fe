import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/Heading";
// import DashboardCard10_ViewLeads from "../../partials/dashboard/DashboardCard10_ViewLeads";
// import Button from "../../components/Button";
// import SearchInput from "../../components/SearchInput";
// import FilterButton from "../../components/FilterButton";
// import Datepicker from "../../components/Datepicker";
// import ViewLeadsMain from "../../components/ViewLeadsMain";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
// import Modal from "../../components/Modal";
import ModalAgentManagement from "../../components/ModalAgentManagement";
import HorizontalScrollButton from "../../components/HorizontalScrollButton";
import Table from "../../components/Table";

export default function AgentManagement() {
  const accessToken = useSelector((state) => state.user.user);
  const [data, setData] = useState({
    sale:[],
    account:[],
    admin:[],
    siteWorker:[],
    normal:[],
    notActive:[]
  });
  const [loading, setLoading] = useState(true);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [page, setPage] = useState("");
  const [option, setOption] = useState([]);
  // console.log(searchModalOpen);

  useEffect(() => {
    Axios.get("/account/user-holiday/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const categorizedData = {
          sale: [],
          account: [],
          admin: [],
          siteWorker: [],
          normal:[],
          notActive:[]
        };
// console.log(categorizedData)
        const people = res.data;
        people.map((person) => {
          if (person.sales_employee&&person.is_active) {
            categorizedData.sale.push(person);
          }
          if (person.accounts_employee&&person.is_active) {
            categorizedData.account.push(person);
          }
          if (person.site_worker&&person.is_active) {
            categorizedData.siteWorker.push(person);
          }
          if (person.admin&&person.is_active) {
            categorizedData.admin.push(person);
          }
          if (person.normal_user&&person.is_active) {
            categorizedData.normal.push(person);
          }
          if (!person.is_active) {
            categorizedData.notActive.push(person);
          }
          return person; // Return item to complete map function
        });

        // console.log(categorizedData);

        setData(categorizedData)

        const data = res.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setOption(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, []);

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
      header: "Agent Name",
    },
    
    {
      accessorKey: "assign",
      header: "Status",
      cell: (info) => {
        const { assign, holiday_status } = info.row.original;
        return (
          <div className="text-base text-center">
            {!assign ? (
              <p className="text-xs text-white bg-red-600 py-1">LEAD OFF</p>
            ) : holiday_status ? (
              <p className="text-xs text-white bg-yellow-600 py-1">
                ON HOLIDAY
              </p>
            ) : (
              <p className="text-xs text-white bg-green-600 py-1">ON WORK</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "phone_no",
      header: "Phone Number",
      meta: {
        smallWidth: true,
      },
    },
    {
      accessorKey: "reason",
      header: "Reason for Holiday",
      meta: {
        smallWidth: true,
      },
    },
    {
      header: "Actions",
      cell: (info) => {
        const { id, phone_no, email } = info.row.original;
        return (
          <div className="flex items-center justify-center gap-4 ">
            <div
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Set Holiday"
              onClick={(e) => {
                e.stopPropagation();
                setUserID(id);
                setPage("Holiday");
                setSearchModalOpen(true);
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
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Transfer Leads"
              onClick={(e) => {
                e.stopPropagation();
                setUserID(id);
                setPage("Transfer");
                setSearchModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 448 512"
              >
                <path
                  className=" fill-current "
                  d="M48.032 424V88C48.032 74.75 37.275 64 24.016 64S0 74.75 0 88V424C0 437.25 10.757 448 24.016 448S48.032 437.25 48.032 424ZM271.743 145.469L363.718 232H120.08C106.821 232 96.064 242.75 96.064 256S106.821 280 120.08 280H363.718L271.743 366.531C266.708 371.25 264.175 377.625 264.175 384C264.175 389.906 266.333 395.812 270.711 400.438C279.779 410.094 294.977 410.562 304.639 401.469L440.73 273.469C450.423 264.406 450.423 247.594 440.73 238.531L304.639 110.531C294.977 101.438 279.779 101.906 270.711 111.563C261.611 121.188 262.049 136.375 271.743 145.469Z"
                />
              </svg>
            </div>
            <div
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Leads Off"
              onClick={(e) => {
                e.stopPropagation();
                setPage("LeadOff");
                setPhoneNumber(phone_no);
                setSearchModalOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 320 512"
              >
                <path
                  className=" fill-current "
                  d="M312.973 375.032C322.342 384.401 322.342 399.604 312.973 408.973S288.401 418.342 279.032 408.973L160 289.941L40.968 408.973C31.599 418.342 16.396 418.342 7.027 408.973S-2.342 384.401 7.027 375.032L126.059 256L7.027 136.968C-2.342 127.599 -2.342 112.396 7.027 103.027S31.599 93.658 40.968 103.027L160 222.059L279.032 103.027C288.401 93.658 303.604 93.658 312.973 103.027S322.342 127.599 312.973 136.968L193.941 256L312.973 375.032Z"
                />
              </svg>
            </div>
            <div
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Left Job"
              onClick={(e) => {
                e.stopPropagation();
                setPage("JobLeft");
                setUserID(email);
                setSearchModalOpen(true);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5 cursor-pointer">
                <path className=" fill-current " d="M94.78 347.6C94.78 347.6 94.78 347.6 94.78 347.475L74.28 398.453C72.28 403.451 69.28 408.074 65.405 411.822L7.031 470.297C-2.344 479.668 -2.344 494.911 7.031 504.157C11.781 508.905 17.781 511.154 23.906 511.154S36.281 508.905 40.781 504.157L99.279 445.682C107.779 437.186 114.279 427.19 118.654 416.195L132.154 382.585L95.904 349.099L94.78 347.6ZM207.777 95.959C234.277 95.959 255.777 74.468 255.777 47.979S234.277 0 207.777 0C181.278 0 159.903 21.491 159.903 47.979S181.278 95.959 207.777 95.959ZM312.525 270.758L283.276 241.895C282.276 241.021 281.651 239.896 281.276 238.647L268.276 199.914C253.902 156.807 213.902 127.945 168.528 127.945C133.779 127.945 115.529 136.691 72.78 153.933C51.905 162.305 34.906 178.048 24.656 198.664L10.281 229.776C-3.094 258.513 40.28 278.88 53.78 250.017L67.78 219.655C72.53 210.034 80.655 202.662 90.53 198.664C112.279 189.918 123.654 185.17 134.779 181.547L115.029 260.637C110.279 279.629 115.279 299.496 129.904 315.239L208.902 388.207C214.777 393.705 218.902 400.702 220.777 408.573L240.277 493.412C242.777 504.907 254.652 514.528 268.901 511.404C281.776 508.405 289.776 495.536 286.776 482.542L267.276 397.953C263.276 380.586 254.277 365.092 241.277 353.097L187.528 303.494L213.777 198.664C221.152 208.41 221.277 211.284 235.527 254.14C238.277 262.387 243.027 270.008 249.277 276.256L278.651 305.243C300.901 326.734 335.275 293.373 312.525 270.758Z" />
              </svg>
            </div>
          </div>
        );
      },
      meta: {
        smallWidth: true,
      },
    },
  ];

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Employees"} />
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <ModalAgentManagement
          id="search-modal"
          searchId="search"
          modalOpen={searchModalOpen}
          setModalOpen={setSearchModalOpen}
          userID={userID}
          phoneNumber={phoneNumber}
          page={page}
          option={option}
        />
      </div>
      <Table
        columns={columns}
        data={data?.sale}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Sales Employee
          </h2>
        }
      />
      <Table
        columns={columns}
        data={data?.account}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Accounts Employee
          </h2>
        }
      />
      <Table
        columns={columns}
        data={data?.siteWorker}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Sites Employee
          </h2>
        }
      />
      <Table
        columns={columns}
        data={data?.notActive}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Deactivated Users
          </h2>
        }
      />
      <Table
        columns={columns}
        data={data?.normal}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Normal User
          </h2>
        }
      />
      <Table
        columns={columns}
        data={data?.admin}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Admin
          </h2>
        }
      />
    </div>
  );
}
