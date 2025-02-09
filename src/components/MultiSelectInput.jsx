import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";

export default function MultiSelectInput({ option, setChange, label, defaultValue, isDisable }) {
  const theme = useSelector(state => state.theme.theme);
// console.log(theme);

  const colourStylesDark = {
    control: (styles) => ({ ...styles, backgroundColor: 'white',outLine:'none', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }),
    option: (styles) => ({
      ...styles,
      backgroundColor: theme=='dark'?'#0F172A':'white',
      color: theme=='dark'?'white':'black',
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: theme=='dark'?'#1E293B':'#F1F5F8',
      color: theme=='dark'?'white':'black',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      backgroundColor: theme=='dark'?'#1E293B':'#F1F5F8',
      color: theme=='dark'?'white':'black',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color:theme=='dark'?'white':'black',
      ':hover': {
        backgroundColor: theme=='dark'?'grey':'lightblue',
      },
    }),
  }


  return (
    <>
      <p>{label}</p>
	  <Select
	  key={`my_unique_select_key__${defaultValue}`}
	  value={defaultValue || ''}
	  styles={colourStylesDark}
	  defaultValue={defaultValue}
	  isMulti
	  name="colors"
	  onChange={setChange}
	  options={option}
    isSearchable={false}
    placeholder={'Select Option...'}
	  className="basic-multi-select"
	  classNamePrefix="dark:bg-[#0F172A] border-black select"
	  isDisabled={isDisable}
	/>
    </>
  );
}
