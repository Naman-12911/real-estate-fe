import React from 'react'
import Heading from '../../../components/Heading'
import { Outlet, Routes } from 'react-router-dom'

export default function AddBookingForm() {
  return (
	<div>
	  <Heading title={'Add Booking Form'}/>
	  <Outlet/>
	</div>
  )
}
