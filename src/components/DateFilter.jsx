import React, { useState } from 'react'
import Datepicker from './Datepicker'

export default function DateFilter({placeholderGRT,placeholderLES,onChangeGRT,onChangeLES,valueGRT,valueLES,nameGRT,nameLes}) {

  return (
	<div className='flex items-center justify-center gap-5 md:flex-row flex-col md:w-auto w-full'>
		<Datepicker onChange={onChangeGRT} value={valueGRT} placeholder={placeholderGRT}/>
		<Datepicker onChange={onChangeLES} value={valueLES} placeholder={placeholderLES}/>
	</div>
  )
}