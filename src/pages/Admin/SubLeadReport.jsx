import React, { useState } from "react";
import Heading from "../../components/Heading";
// import Datepicker from '../../components/Datepicker'
// import Button from '../../components/Button'
import DashboardCard06_Small from "../../partials/dashboard/DashboardCard06_Small";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function SubLeadReport() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state);

  const [dateSearchGrt, setdateSearchGrt] = useState("");
  const [dateSearchLess, setdateSearchLess] = useState("");

  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Heading title={"Leads Report"} />
      <div className="py-8 w-full   mx-auto">
        <div className="flex justify-end items-end mb-5 space-x-5">
          <Button title={"Back"} onClick={() => navigate(-1)} />
        </div>
        {state &&
          state.all_sources.map((item) => (
            <div className="grid grid-cols-12 gap-5 mt-2 mb-5">
              <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Leads Source : {item.name.replace(/_/g, " ")} | Total Leads
                    : {item.total_leads}
                  </h2>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full dark:text-slate-300">
                      <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Leads
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Count
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Intrested
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {item?.interested_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Site Visit
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.site_visit_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Re-Site Visit
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.re_visit_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Corporate Visit
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.corporate_visit_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Good Leads
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.good_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Poor Leads
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.poor_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Maybe Leads
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.may_be_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Call Not Received
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.call_not_received_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Do Not Call
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.do_not_call_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Blocked Enquiry Leads
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.block_enquiry_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Dump
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.dump_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Permanent Dump
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.permanent_dump_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                              Booked Leads
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.booked_leads || 0}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">
                            <div className="text-center dark:text-white text-black">
                            Leads yet to be Contacted
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                              {" "}
                              {item?.lead_yet_to_be_contacted || 0}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <DashboardCard06_Small
                title={item.name.replace(/_/g, " ")}
                labels={[
                  "Intrested",
                  "Site Visit",
                  "Re-Site Visit",
                  "Corporate Visit",
                  "Good Leads",
                  "Poor Leads",
                  "Maybe Leads",
                  "Call Not Received",
                  "Do Not Call",
                  "Blocked Enquiry Leads",
                  "Dump",
                  "Permanent Dump",
                  "Booked Leads",
                  "Untouched Leads",
                ]}
                data={[
                  item.interested_leads || 0,
                  item.site_visit_leads || 0,
                  item.re_visit_leads || 0,
                  item.corporate_visit_leads || 0,
                  item.good_leads || 0,
                  item.poor_leads || 0,
                  item.may_be_leads || 0,
                  item.call_not_received_leads || 0,
                  item.do_not_call_leads || 0,
                  item.block_enquiry_leads || 0,
                  item.dump_leads || 0,
                  item.permanent_dump_leads || 0,
                  item.booked_leads || 0,
                  item.untouched_leads || 0,
                ]}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
