import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/Heading";
// import DashboardCard10_ViewLeads from "../../partials/dashboard/DashboardCard10_ViewLeads";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
// import FilterButton from "../../components/FilterButton";
// import Datepicker from "../../components/Datepicker";
// import ViewLeadsMain from "../../components/ViewLeadsMain";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
// import ViewLeadsMainAdminProfile from "../../components/ViewLeadsMainAdminProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SingleCheckBox from "../../components/SingleCheckBox";
import DateFilter from "../../components/DateFilter";
// import dateFormat from "dateformat";
import Pagination from "../../components/Pagination";
// import DoubleScrollbar from "react-double-scrollbar";
import HorizontalScrollButton from "../../components/HorizontalScrollButton";
import moment from "moment";
import SearchSingleSelectInput from "../../components/SearchSingleSelectInput";
import Table from "../../components/Table";
import ModalAgentManagement from "../../components/ModalAgentManagement";
import ModalExpectedLead from "../../components/ModalExpectedLead";
import CountInfoCardAdmin from "../../components/CountInfoCardAdmin";
import axios from "axios";

export default function ViewLeads() {
  const accessToken = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dateSearchGrt, setdateSearchGrt] = useState("");
  const [dateSearchLess, setdateSearchLess] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [leadSourceData, setLeadSourceData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [leadStatusData, setLeadStatusData] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    //Projects
    Axios.get("/misc/project/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.project_name,
          value: item.project_name,
        }));
        // console.log(data);
        setProjectData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //ProjectType
    Axios.get(`/misc/project-type-filter/?project_id=`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.property_type.replace(/_/g, " "),
          value: item.property_type,
        }));
        setTypeData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Lead Source Type
    Axios.get(`/social/lead-source/filter/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.lead_source.replace(/_/g, " "),
          value: item.lead_source,
        }));
        setLeadSourceData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    //Lead Status Type
    Axios.get(`/social/status-lead/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        const data = res.data.map((item) => ({
          label: item.status_lead.replace(/_/g, " "),
          value: item.status_lead,
        }));
        setLeadStatusData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const pendingRequests = useRef(0);
  const cancelTokens = useRef([]);

  const handleSearch = () => {
    pendingRequests.current += 1;
    setLoading(true);
    const cancelTokenSource = axios.CancelToken.source();
    cancelTokens.current.push(cancelTokenSource);

    const paramObject = {
      created_at__gte: dateSearchGrt,
      created_at__lte: dateSearchLess,
      page,
    };

    columnFilter.forEach((filter) => {
      paramObject[filter.id] = filter.value;
    });

    const paramArray = [];

    for (const key in paramObject) {
      if (paramObject[key]) {
        paramArray.push(`${key}=${paramObject[key]}`);
      }
    }
    const queryString = paramArray.join("&");
    Axios.get(`/social/fb-lead/filter/?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource.token,
    })
      .then((res) => {
        window.scrollTo(0, 0);
        setTotalPage(res.data.total_pages);
        setData(res.data.results);
        // setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response)
        // setLoading(false);
      })
      .finally(() => {
        pendingRequests.current -= 1;
        if (pendingRequests.current === 0) {
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    handleSearch();

    return () => {
      cancelTokens.current.forEach(source => source.cancel());
      cancelTokens.current = [];
    };
  }, [dateSearchGrt, dateSearchLess, page, columnFilter]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allEmails = data.map((lead) => lead.email);
      setSelectedEmails(allEmails);
    } else {
      setSelectedEmails([]);
    }
  };

  const handleCheckboxChange = (email) => {
    const updatedEmails = [...selectedEmails];
    const index = updatedEmails.indexOf(email);
    if (index === -1) {
      // If email is not in the array, add it
      updatedEmails.push(email);
    } else {
      // If email is already in the array, remove it
      updatedEmails.splice(index, 1);
    }
    setSelectedEmails(updatedEmails);
  };

  const columns = [
    {
      id: "checkBox",
      header: ({ table }) => (
        <SingleCheckBox onChange={handleSelectAllChange} checked={selectAll} />
      ),
      cell: (info) => {
        const { email } = info.row.original;
        return (
          <SingleCheckBox
            onChange={() => handleCheckboxChange(email)}
            checked={selectedEmails.includes(email)}
          />
        );
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      id: "slNo",
      header: "SL No",
      cell: (info) => {
        return (page - 1) * 50 + info.row.index + 1;
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const { permanent_dump_lead, status } = info.row.original;
        if (permanent_dump_lead) {
          return (
            <p className="text-xs text-white bg-blue-600 px-1 py-1">
              RE-ASSIGNED
            </p>
          );
        } else if (status === "Not Delayed") {
          return (
            <p className="text-xs text-white bg-green-600 px-1 py-1">
              NOT DELAYED
            </p>
          );
        }
        return (
          <p className="text-xs text-white bg-yellow-600 px-1 py-1">DELAYED</p>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Enquiry Date",
      cell: (info) => {
        const { created_at, updated_at, enquiry_date } = info.row.original;
        return (
          <div className="text-sm text-center">
            <div className="flex items-center justify-center flex-col">
              {moment(new Date(enquiry_date || created_at)).format(
                "DD-MM-YYYY"
              )}
              {
                <span className="text-xs">
                  Last Updated{" "}
                  {moment(new Date(updated_at || created_at)).fromNow()}
                </span>
              }
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "updated_at",
      header: "Last Updated Date and Time",
      cell: (info) => {
        const { updated_at } = info.row.original;
        return moment(new Date(updated_at)).format("DD-MM-YYYY | hh:mm A");
      },
    },
    {
      accessorKey: "full_name",
      header: "Customer Name",
      meta: {
        filterVariant: "text",
        textWrap: true,
      },
    },
    {
      accessorKey: "phone_number",
      header: "Phone Number",
      meta: {
        filterVariant: "text",
        filterTextType: "number",
      },
    },
    {
      accessorKey: "project_name",
      header: "Project Name",
      meta: {
        filterVariant: "select",
        options: projectData,
      },
    },
    {
      accessorKey: "project_type_name",
      header: "Project Type",
      meta: {
        filterVariant: "select",
        options: typeData,
      },
    },
    {
      accessorKey: "lead_source",
      header: "Lead Source",
      meta: {
        filterVariant: "select",
        options: leadSourceData,
      },
    },
    {
      accessorKey: "status_of_lead",
      header: "Lead Status",
      meta: {
        filterVariant: "select",
        options: leadStatusData,
      },
    },
    {
      accessorKey: "status_of_lead_warm_hot_cold",
      header: "HOT/WARM/COLD",
      meta: {
        filterVariant: "select",
        options:[{value:'Hot',label:'HOT'},{value:'Warm',label:'WARM'},{value:'Cold',label:'COLD'},]
      },
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      meta: {
        filterVariant: "text",
        textWrap: true,
      },
    },
    {
      accessorKey: "expected_booking",
      header: "Expected Booking",
      meta: {
        filterVariant: "select",
        options: [
          { label: "Yes", value: "True" },
          { label: "No", value: "False" },
        ],
      },
      cell: (info) => {
        const { expected_booking } = info.row.original;
        return expected_booking ? "Yes" : "No";
      },
    },
    {
      accessorKey: "expected_booking_date",
      header: "Expected Booking Date",
      cell: (info) => {
        const { expected_booking_date } = info.row.original;
        return moment(new Date(expected_booking_date)).format("DD-MM-YYYY");
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      header: "Expected Booking",
      cell: (info) => {
        const { id } = info.row.original;
        return (
          <div className="flex items-center justify-center gap-4">
            <div
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Mark as Expected Booking"
              onClick={(e) => {
                e.stopPropagation();
                setId(id);
                setSearchModalOpen(true);
              }}
            >
              <svg  className="w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path className="fill-current" d="M616 160C602.746 160 592 170.744 592 184V224H512V24C512 10.744 501.254 0 488 0S464 10.744 464 24V64H400V24C400 10.744 389.254 0 376 0S352 10.744 352 24V64H288V24C288 10.744 277.254 0 264 0S240 10.744 240 24V64H176V24C176 10.744 165.254 0 152 0S128 10.744 128 24V224H48V184C48 170.744 37.254 160 24 160S0 170.744 0 184V448C0 483.346 28.654 512 64 512H287.768C287.85 512 287.918 512.047 288 512.047H352C352.082 512.047 352.15 512 352.232 512H576C611.346 512 640 483.346 640 448V184C640 170.744 629.254 160 616 160ZM176 112H464V224H176V112ZM592 448C592 456.836 584.836 464 576 464H384V384C384 348.652 355.346 320 320 320S256 348.652 256 384V464H64C55.164 464 48 456.836 48 448V272H592V448Z" />
              </svg>
            </div>
          </div>
        );
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      header: "Marketing",
      cell: (info) => {
        const { phone_number, email } = info.row.original;
        return (
          <div className="flex items-center justify-center gap-4">
            <div
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="WhatsApp"
              onClick={(e) => {
                navigate("/sale/wmessage", { state: phone_number });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 448 512"
              >
                <path
                  className="fill-current"
                  d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                />
              </svg>
            </div>
            <div
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="Email"
              onClick={() =>
                navigate("/sale/emessage", { state: [`${email}`] })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 512 512"
              >
                <path
                  className="fill-current"
                  d="M448 64H64C28.654 64 0 92.654 0 128V384C0 419.346 28.654 448 64 448H448C483.348 448 512 419.346 512 384V128C512 92.654 483.348 64 448 64ZM64 112H448C456.822 112 464 119.178 464 128V150.162L297.25 289.141C274.062 308.422 237.906 308.406 214.781 289.156L48 150.162V128C48 119.178 55.178 112 64 112ZM448 400H64C55.178 400 48 392.822 48 384V212.662L184.062 326.047C204.25 342.828 229.781 352.078 256 352.078S307.75 342.828 327.969 326.031L464 212.664V384C464 392.822 456.822 400 448 400Z"
                />
              </svg>
            </div>
            <div
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="SMS"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 cursor-pointer"
                viewBox="0 0 512 512"
              >
                <path
                  className="fill-current"
                  d="M256.068 32C114.693 32 0.068 125.125 0.068 240C0.068 287.625 19.943 331.25 52.943 366.25C38.068 405.75 7.068 439.125 6.568 439.5C-0.057 446.5 -1.807 456.75 1.943 465.5C5.818 474.25 14.443 480 24.068 480C85.568 480 134.068 454.25 163.193 433.75C192.068 442.75 223.318 448 256.068 448C397.443 448 512.068 354.875 512.068 240S397.443 32 256.068 32ZM256.068 400C229.318 400 202.943 395.875 177.693 387.875L154.943 380.75L135.443 394.5C121.193 404.625 101.568 415.875 77.943 423.5C85.318 411.375 92.318 397.75 97.818 383.25L108.443 355.25L87.818 333.375C69.818 314.125 48.068 282.25 48.068 240C48.068 151.75 141.318 80 256.068 80S464.068 151.75 464.068 240S370.818 400 256.068 400Z"
                />
              </svg>
            </div>
          </div>
        );
      },
      meta: {
        smallWidth: true,
      },
    },
    {
      header: "Action",
      cell: (info) => {
        const { id } = info.row.original;
        const data = info.row.original;
        return (
          <div className="flex items-center justify-center gap-4">
            <div
              aria-controls="search-modal"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              title="View"
              onClick={() => navigate(`/sale/client/${id}`)}
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
              onClick={() => navigate("/sale/editclient", { state: data })}
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
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Leads"} />
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="flex justify-between items-end gap-5 xl:flex-row flex-col">
          <Button
            title={"Email Marketing"}
            onClick={() => {
              if (selectedEmails.length) {
                navigate("/sale/emessage", { state: selectedEmails });
              } else {
                toast.error("No Email Selected");
              }
            }}
          />
          <DateFilter
            placeholderGRT={"Date Greater then"}
            placeholderLES={"Date Less then"}
            valueGRT={dateSearchGrt}
            valueLES={dateSearchLess}
            onChangeGRT={setdateSearchGrt}
            onChangeLES={setdateSearchLess}
          />
        </div>
      </div>
      <ModalExpectedLead
        id="search-modal"
        searchId="search"
        modalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
        userID={id}
      />
      <Table
        setColumnFilter={setColumnFilter}
        columns={columns}
        data={data}
        pageNumber={page}
        setPageNumber={setPage}
        totalPageNumber={totalPage}
        loading={loading}
        children={
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            Leads
          </h2>
        }
      />
    </div>
  );
}
