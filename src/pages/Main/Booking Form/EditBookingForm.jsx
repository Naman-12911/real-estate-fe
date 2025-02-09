import React from 'react'
import Heading from '../../../components/Heading'
import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'

export default function EditBookingForm() {
	const navigate=useNavigate();
  return (
	<div>
	  <Heading title={'Booking Form'}/>
	  <div className="py-3 w-full  mx-auto space-y-5">
	  <div className="flex justify-end  items-end gap-5 xl:flex-row flex-col">
	  <Button
            title={"Back"}
            onClick={()=>navigate(-1)}
          />
	  </div>
	  </div>
		  <Outlet/>
	</div>
  )
}
