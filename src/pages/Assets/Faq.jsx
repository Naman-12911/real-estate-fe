import React, { useEffect, useState } from 'react'
import Axios from '../../Axios'
import Heading from '../../components/Heading'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import { useSelector } from 'react-redux';
import { baseURL } from '../../Constant';
import Button from '../../components/Button';

export default function Faq() {
	const accessToken=useSelector((state)=>state.user.user);
	const theme=useSelector(state=>state.theme.theme)

	const [data,setData]=useState('')
	const [loading,setLoading]=useState(true)

	useEffect(()=>{
	Axios.get('/project-faq/faq/',{
		headers:{
			Authorization:`Bearer ${accessToken}`
	}
	})
	.then(res=>{
		setLoading(false)
		setData(res.data)
		// console.log(res.data)
	})
	.catch(err=>{
		setLoading(false)
		console.log(err.response.data)
	})
	},[])

  return (
	<div>
	  <Heading title={"FAQs"}/>
	  <div className="py-3 w-full   mx-auto space-y-5">
		<Accordion allowZeroExpanded={true}>
			{data&&data.map((item,index)=>(
				<AccordionItem key={index}>
				<AccordionItemHeading>
					<AccordionItemButton style={{backgroundColor:theme=='dark'?'#1E293C':'white',color:theme=='dark'?'white':'black'}}>

						
						{item.questions}
					</AccordionItemButton>
				</AccordionItemHeading>
				<AccordionItemPanel style={{backgroundColor:theme=='dark'?'#1E293C':'white',color:theme=='dark'?'white':'black'}}>
					<p className='font-semibold'>
					 {item.project_faq.project_name}
					</p>
					<p className='mt-2'>
						{item.answer}
					</p>
					<div className='flex gap-10 border-y-2 py-2 '>
						{item.video?<a href={baseURL+item.video.slice(1)} target='_blank'><Button title={'Video'}/></a>:''}
						{item.image?<a href={baseURL+item.image.slice(1)} target='_blank'><Button title={'Image'}/></a>:''}
					</div>
				</AccordionItemPanel>
				</AccordionItem>
			))}
           
        </Accordion>
			</div>
	</div>
  )
}
