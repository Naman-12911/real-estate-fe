import React, { useEffect, useRef, useState } from "react";
import Heading from "../../components/Heading";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import DateFilter from "../../components/DateFilter";
import Table from "../../components/Table";
import moment from "moment";
import axios from "axios";

export default function DumpLeads() {
  const accessToken = useSelector((state) => state.user.user);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameSearch, setNameSearch] = useState("");
  const [dateSearchGrt, setdateSearchGrt] = useState("");
  const [dateSearchLess, setdateSearchLess] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [columnFilter, setColumnFilter] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [leadSourceData, setLeadSourceData] = useState([]);
  const [leadStatusData, setLeadStatusData] = useState([]);

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
        setProjectData(data);
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
    Axios.get(`/social/fb-lead/filter/dump/?${queryString}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cancelToken: cancelTokenSource.token,
    })
      .then((res) => {
        // console.log(res.data)
        setTotalPage(res.data.total_pages);
        setData(res.data.results);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
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

  const columns = [
    {
      id: "slNo",
      header: "SL No",
      cell: (info) => {
        return (page - 1) * 50 + info.row.index + 1;
      },
      meta:{
        smallWidth:true,
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => {
        const { permanent_dump_lead, status } = info.row.original;
        if (permanent_dump_lead) {
          return (
            <p className="text-xs text-white bg-red-600 px-1 py-1">
              PERMANENT DUMP
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
        const { created_at, updated_at,enquiry_date } = info.row.original;
        return (
          <div className="text-sm text-center">
            <div className="flex items-center justify-center flex-col">
              {moment(new Date(enquiry_date||created_at)).format("DD-MM-YYYY")}
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
      accessorKey: "feedback",
      header: "Feedback",
      meta: {
        filterVariant: "text",
        textWrap: true,
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Dump Leads"} />
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="flex justify-end items-end gap-5 xl:flex-row flex-col">
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
            Dump Leads
          </h2>
        }
      />
    </div>
  );
}
