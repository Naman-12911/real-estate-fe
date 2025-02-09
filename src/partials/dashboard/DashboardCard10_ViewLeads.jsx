import React from 'react';
import NavigationButton from '../../components/NavigationButton';

function DashboardCard10_ViewLeads() {

  // const customers = [
  //   {
  //     id: '0',
  //     image: Image01,
  //     name: 'Alex Shatov',
  //     email: 'alexshatov@gmail.com',
  //     location: '🇺🇸',
  //     spent: '$2,890.66',
  //   },
  //   {
  //     id: '1',
  //     image: Image02,
  //     name: 'Philip Harbach',
  //     email: 'philip.h@gmail.com',
  //     location: '🇩🇪',
  //     spent: '$2,767.04',
  //   },
  //   {
  //     id: '2',
  //     image: Image03,
  //     name: 'Mirko Fisuk',
  //     email: 'mirkofisuk@gmail.com',
  //     location: '🇫🇷',
  //     spent: '$2,996.00',
  //   },
  //   {
  //     id: '3',
  //     image: Image04,
  //     name: 'Olga Semklo',
  //     email: 'olga.s@cool.design',
  //     location: '🇮🇹',
  //     spent: '$1,220.66',
  //   },
  //   {
  //     id: '4',
  //     image: Image05,
  //     name: 'Burak Long',
  //     email: 'longburak@gmail.com',
  //     location: '🇬🇧',
  //     spent: '$1,890.66',
  //   },
  // ];
  const tableData = [
		{
		  id: '0',
		  enquiryDate: '2024-02-07',
		  project: 'E-commerce Website',
		  name: 'Sarah Johnson',
		  type: 'New Project',
		  budget: '$7000',
		  mobileNumber: '+12223334444',
		  lead: 'Hot Lead',
		  leadSource: 'Google Ads',
		  address: '123 Cherry Lane, Cityville, USA',
		  discussion: 'Requirement gathering',
		  executiveName: 'Ryan Davis',
		  leadType: 'Referral',
		},
		{
		  id: '1',
		  enquiryDate: '2024-02-07',
		  project: 'Digital Marketing Campaign',
		  name: 'David Wilson',
		  type: 'Ongoing Project',
		  budget: '$5000',
		  mobileNumber: '+15556667777',
		  lead: 'Warm Lead',
		  leadSource: 'Social Media',
		  address: '456 Apple Street, Suburbia, USA',
		  discussion: 'Progress review',
		  executiveName: 'Emily Taylor',
		  leadType: 'Online Inquiry',
		},
		{
		  id: '2',
		  enquiryDate: '2024-02-07',
		  project: 'Logo Design',
		  name: 'Jason Brown',
		  type: 'New Project',
		  budget: '$2000',
		  mobileNumber: '+18889990000',
		  lead: 'Cold Lead',
		  leadSource: 'Walk-in',
		  address: '789 Orange Avenue, Townsville, USA',
		  discussion: 'Initial consultation',
		  executiveName: 'Rachel White',
		  leadType: 'Word of Mouth',
		},
		{
		  id: '3',
		  enquiryDate: '2024-02-07',
		  project: 'Mobile App Development',
		  name: 'Emma Garcia',
		  type: 'New Project',
		  budget: '$10000',
		  mobileNumber: '+17778889999',
		  lead: 'Hot Lead',
		  leadSource: 'Email Campaign',
		  address: '321 Lemon Road, Villageville, USA',
		  discussion: 'Requirement analysis',
		  executiveName: 'Daniel Martinez',
		  leadType: 'Social Media',
		},
		{
		  id: '4',
		  enquiryDate: '2024-02-07',
		  project: 'SEO Services',
		  name: 'Olivia Perez',
		  type: 'Ongoing Project',
		  budget: '$3000',
		  mobileNumber: '+16667778888',
		  lead: 'Warm Lead',
		  leadSource: 'Referral',
		  address: '567 Grape Lane, Hamletville, USA',
		  discussion: 'Strategy planning',
		  executiveName: 'Christopher Lee',
		  leadType: 'Cold Call',
		},
		{
		  id: '5',
		  enquiryDate: '2024-02-07',
		  project: 'Content Writing',
		  name: 'Liam Turner',
		  type: 'New Project',
		  budget: '$4000',
		  mobileNumber: '+19998887777',
		  lead: 'Cold Lead',
		  leadSource: 'Online Inquiry',
		  address: '987 Pine Street, Riverside, USA',
		  discussion: 'Requirement gathering',
		  executiveName: 'Sophia Adams',
		  leadType: 'Walk-in',
		},
		{
		  id: '6',
		  enquiryDate: '2024-02-07',
		  project: 'Graphic Design',
		  name: 'Ava Hernandez',
		  type: 'Ongoing Project',
		  budget: '$6000',
		  mobileNumber: '+14445556666',
		  lead: 'Hot Lead',
		  leadSource: 'Word of Mouth',
		  address: '654 Walnut Way, Beachtown, USA',
		  discussion: 'Project review',
		  executiveName: 'Ethan Garcia',
		  leadType: 'Google Ads',
		},
		{
		  id: '7',
		  enquiryDate: '2024-02-07',
		  project: 'Video Production',
		  name: 'Mia King',
		  type: 'New Project',
		  budget: '$8000',
		  mobileNumber: '+13334445555',
		  lead: 'Warm Lead',
		  leadSource: 'Walk-in',
		  address: '789 Maple Street, Hilltop, USA',
		  discussion: 'Initial brainstorming',
		  executiveName: 'Madison Lopez',
		  leadType: 'Referral',
		},
		{
		  id: '8',
		  enquiryDate: '2024-02-07',
		  project: 'UI/UX Design',
		  name: 'Lucas Scott',
		  type: 'Ongoing Project',
		  budget: '$3500',
		  mobileNumber: '+12223334455',
		  lead: 'Cold Lead',
		  leadSource: 'Cold Call',
		  address: '543 Oak Avenue, Mountainview, USA',
		  discussion: 'Design mockup review',
		  executiveName: 'Chloe Ward',
		  leadType: 'Social Media',
		},
		{
		  id: '9',
		  enquiryDate: '2024-02-07',
		  project: 'Brand Identity',
		  name: 'Charlotte Hall',
		  type: 'New Project',
		  budget: '$2500',
		  mobileNumber: '+11112223333',
		  lead: 'Hot Lead',
		  leadSource: 'Email Campaign',
		  address: '876 Elm Street, Valleyville, USA',
		  discussion: 'Creative brainstorming',
		  executiveName: 'Jacob Brown',
		  leadType: 'Word of Mouth',
		},
		// Add more objects as needed
	  ];

  return (<>
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex space-x-2">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Leads</h2>
        <h2 className="font-semibold text-slate-400 dark:text-slate-400">{tableData.length}</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
              <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Sl No.</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Enquiry Date</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Project</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Name</div>
                </th>
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th> */}
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Budget</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Mobile No.</div>
                </th>
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Address</div>
                </th> */}
                {/* <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lead/Source</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Excutive Name</div>
                </th> */}
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Lead Type</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center w-[110px]">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                tableData.map(item => {
                  return (
                    <tr key={item.id}>
                      {/* <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={item.image} width="40" height="40" alt={item.name} />
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">{item.name}</div>
                        </div>
                      </td> */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-left">{item.id}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-left">{item.enquiryDate}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.project}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center text-black dark:text-slate-300">{item.name}</div>
                      </td>
                      {/* <td className="p-2 whitespace-nowrap">
                        <div className="text-md text-center">{item.type}</div>
                      </td> */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-left text-green-500">{item.budget}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-left">{item.mobileNumber}</div>
                      </td>
                      {/* <td className="p-2 whitespace-nowrap">
                        <div className="text-md text-center">{item.lead}/{item.leadSource}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-md text-center">{item.executiveName}</div>
                      </td> */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="text-base text-center">{item.leadType}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap w-[110px]">
                        <div className="flex items-center justify-between">
                          <div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='View'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 576 512">
                                <path className=' fill-current ' d="M572.531 238.973C518.281 115.525 410.938 32 288 32S57.688 115.58 3.469 238.973C1.562 243.402 0 251.041 0 256C0 260.977 1.562 268.596 3.469 273.025C57.719 396.473 165.062 480 288 480S518.312 396.418 572.531 273.025C574.438 268.596 576 260.957 576 256C576 251.023 574.438 243.402 572.531 238.973ZM288 432C188.521 432 96.836 364.502 48.424 256.004C97.01 147.365 188.611 80 288 80C387.48 80 479.164 147.498 527.576 255.994C478.99 364.635 387.389 432 288 432ZM288 128C217.334 128 160 185.348 160 256S217.334 384 288 384H288.057C358.695 384 416 326.68 416 256.055V256C416 185.348 358.668 128 288 128ZM288 336C243.889 336 208 300.111 208 256C208 255.252 208.199 254.559 208.221 253.816C213.277 255.125 218.52 256 224 256C259.346 256 288 227.346 288 192C288 186.52 287.125 181.277 285.816 176.221C286.559 176.199 287.252 176 288 176C332.111 176 368 211.889 368 256.055C368 300.137 332.137 336 288 336Z"/>
                            </svg>
                          </div>
                          <div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Edit'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 512 512">
                                <path className=' fill-current ' d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                            </svg>
                          </div>
                          <div className='text-slate-400 hover:text-slate-700 dark:hover:text-slate-300' title='Download'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 cursor-pointer' viewBox="0 0 448 512">
                                <path className=' fill-current ' d="M448 416V352C448 334.326 433.672 320 416 320S384 334.326 384 352V416C384 433.674 369.672 448 352 448H96C78.328 448 64 433.674 64 416V352C64 334.326 49.672 320 32 320S0 334.326 0 352V416C0 469.02 42.98 512 96 512H352C405.02 512 448 469.02 448 416ZM246.625 342.625L374.625 214.625C387.133 202.117 387.117 181.867 374.625 169.375C362.125 156.875 341.875 156.875 329.375 169.375L256 242.75V32C256 14.312 241.688 0 224 0S192 14.312 192 32V242.75L118.625 169.375C106.125 156.875 85.875 156.875 73.375 169.375S60.875 202.125 73.375 214.625L201.375 342.625C213.875 355.125 234.125 355.125 246.625 342.625Z"/>
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
    <div className='flex items-center justify-between flex-col-reverse gap-5 md:flex-row '>
      <span>Showing <span className=' text-slate-950 dark:text-slate-200'>1</span> to <span className=' text-slate-950 dark:text-slate-200'>10</span> of <span className=' text-slate-950 dark:text-slate-200'>467</span> results </span>
      <div className='flex items-center justify-center gap-5'>
        <NavigationButton title={"Previous"} direction={"Left"} isDisabled={true}/>
        <NavigationButton title={"Next"} direction={"Right"} isDisabled={false}/>
      </div>
    </div>
    </>
  );
}

export default DashboardCard10_ViewLeads;
