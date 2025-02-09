import React from 'react'
import MultipleInput from './MultipleInput'
import Button from './Button'

export default function NewLead({formData}) {
  return (
	
	<div className='flex justify-center items-center space-y-24 flex-col'>
	<div className="flex items-center flex-col md:flex-row justify-between flex-wrap gap-5 w-full">
		{formData.map(item=>{
			return(
				<MultipleInput label={item.label} placeholder={item.placeholder} isDisable={item.isDisable} type={item.type} option={item.option}/>
			)
		})}
    </div>
	<Button title={"Submit"}/>
	</div>
  )
}
