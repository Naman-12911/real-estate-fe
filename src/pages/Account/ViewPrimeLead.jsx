import React, { useState } from 'react'
import Heading from '../../components/Heading';
import SearchInput from '../../components/SearchInput';
import Datepicker from '../../components/Datepicker';
import ViewPrimeLeadsMain from '../../components/ViewPrimeLeadsMain';
import FilterButton from '../../components/FilterButton';

export default function ViewPrimeLead() {
	const filterData=[
		{title:"All",value:23},
		{title:"Paid",value:23},
		{title:"Due",value:23},
		{title:"Overdue",value:23},
	]
	const [selectedFilter,setSelectedFilter]=useState(null)
  return (
    <div>
      <div className="flex justify-between md:flex-row flex-col">
        <Heading title={"Prime Leads"} />
		<SearchInput placeholder={"Search"}/>
      </div>
      <div className="py-3 w-full   mx-auto space-y-5">
        <div className="flex justify-between items-center">
			<div className="flex space-x-4">
				{filterData.map((item)=>(
					<FilterButton isActive={selectedFilter===item?true:false} onClick={()=>setSelectedFilter(item)} title={item.title} value={item.value}/>
				))}
			</div>
			<Datepicker/>
		</div>
        <ViewPrimeLeadsMain/>
      </div>
    </div>
  );
}
