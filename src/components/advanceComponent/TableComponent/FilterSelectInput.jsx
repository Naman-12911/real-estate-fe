import React from 'react'
import { useSelector } from 'react-redux';
import Select from 'react-select';

export default function FilterSelectInput({options,value,onChange}) {

  const theme = useSelector(state => state.theme.theme);
  // console.log(theme);
  
    const colourStylesDark = {
      control: (styles,state) => ({ ...styles, 
        backgroundColor: 'white',
        borderWidth:1,
        width:'14rem',
        textAlign:'left',
        zIndex:20,
        // borderColor:'white',
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
  return (
	<Select
        className="basic-single "
	      classNamePrefix="dark:bg-[#0F172A] bg-white border-black select"
        defaultValue={value}
        isClearable={true}
        isSearchable={false}
        name="color"
        options={options}
        onChange={handleChange}
        placeholder={'Select...'}
        styles={colourStylesDark}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#6466F1",
          },
        })}
      />
  )
}
