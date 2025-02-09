import React from "react";

export default function InfoTable_Big({ title,data }) {
  return (
    <div className="col-span-full w-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
      </header>
       <div className="px-5 py-4 w-full flex flex-col 2xl:flex-row flex-wrap gap-12 justify-between items-center" >
        {/* <table className="table-auto w-full"> */}
          <div className="xl:w-[48%] w-full h-96 md:p-8 p-4 rounded-md border">
            <p className="text-lg font-extrabold text-black dark:text-white mb-4">Personal Information</p>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Name</p>
                <td className="py-2 text-right">{data?.full_name}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Phone</p>
                <td className="">{data?.phone_number}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Alt. Phone</p>
                <td className="">{data?.alternative_number}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Email</p>
                <td className="">{data?.email}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Occuption</p>
                <td className="">{data?.occupation}</td>
            </div>
          </div>

          <div className="xl:w-[48%] w-full h-96 md:p-8 p-4 rounded-md border">
            <p className="text-lg font-extrabold text-black dark:text-white mb-4">Other Information</p>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Budget</p>
                <td className="text-right">{data?.budget}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Address</p>
                <td className="text-right">{data?.address}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">City</p>
                <td className="text-right">{data?.city}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Source</p>
                <td className="text-right">{data?.by_medium}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Source Category</p>
                <td className="text-right">{data?.lead_source}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">
                Reference</p>
                <td className="text-right">{data?.customer_ref_name}</td>
            </div>
          </div>
          <div className="xl:w-[48%] w-full h-96 md:p-8 p-4 rounded-md border">
            <p className="text-lg font-extrabold text-black dark:text-white mb-4">Interest</p>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Project</p>
                <td className="text-right">{data?.project_name?.join(' , ')}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Project Type</p>
                <td className="text-right">{data?.project_type_name?.join(' , ')}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Preferred Location</p>
                <td className="text-right">{data?.preferred_location}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Alt. Location</p>
                <td className="text-right">{data?.preferred_location_other}</td>
            </div>
          </div>
          <div className="xl:w-[48%] w-full h-96 md:p-8 p-4 rounded-md border">
            <p className="text-lg font-extrabold text-black dark:text-white mb-4">Lead's Status</p>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Status</p>
                <td className="text-right">{data?.status_of_lead_warm_hot_cold}</td>
            </div>
            <div className="w-full flex items-center justify-between border-b py-2">
                <p className="font-bold">Feedback</p>
                <td className=" text-right">{data?.feedback}</td>
            </div>
          </div>

        {/* </table> */}
      </div>
    </div>
  );
}
