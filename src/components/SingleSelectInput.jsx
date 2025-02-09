import React from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select';

export default function SingleSelectInput({label,option,placeholder,onChange,value,isDisable,setModalOpen,width}) {

  const theme = useSelector(state => state.theme.theme);
  // console.log(theme);
  
    const colourStylesDark = {
      control: (styles,state) => ({ ...styles, 
        backgroundColor: 'white',
        // borderWidth:1,
        width:width,
        textAlign:'left',
        // borderColor:'white',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' 
      }),
      option: (styles) => ({
        ...styles,
        backgroundColor: theme=='dark'?'#0F172A':'white',
        color: theme=='dark'?'white':'black',
        textAlign:'left'
      }),
      singleValue: (provided) => ({
        ...provided,
        color: theme === 'dark' ? 'white' : 'black',
        marginLeft: 0,
        paddingLeft: 10,
        paddingRight: 10,
        // fontSize: 16,
      }),
      // Style for selected option
      placeholder: styles => ({
        ...styles,
        color: theme === 'dark' ? 'white' : 'black', // Adjust placeholder color
      }),
      dropdownIndicator: styles => ({
        ...styles,
        color: theme === 'dark' ? 'white' : 'black', // Adjust dropdown indicator color
      }),
    }
    const handleChange = (selectedOption) => {
      onChange(selectedOption ? selectedOption.value : null);
    };

    const selectedOption = option?.find(opt => opt.value === value);


  return (
	<div onClick={(e) => e.stopPropagation()}>
		<label htmlFor="">{label}</label>

    <Select
            className="basic-single "
            classNamePrefix="dark:bg-[#0F172A] bg-white border-black select"
            // defaultValue={value}
            value={selectedOption}
            isClearable={true}
            isSearchable={false}
            name="color"
            options={option}
            onChange={handleChange}
            placeholder={placeholder}
            isDisabled={isDisable}
            styles={colourStylesDark}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#6466F1",
              },
            })}
          
          />
          {/* <select name="" id="" onChange={onChange} value={value} required disabled={isDisable}
		        className="w-full border-slate-200 rounded shadow-md focus:border-indigo-500  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-slate-500 dark:hover:border-slate-400 dark:text-white">
            <option value="" className="py-10" selected>--{placeholder}--</option>
            {option&&option.map((item,index) => {
              return <option key={index} value={item.value} className="py-10">{item.label}</option>;
            })}
          </select> */}
	</div>
  )
}
