import { useCallback, useEffect, useRef, useState } from "react";

// useStickyHeader.js
const useStickyHeader = (defaultSticky = false) => {
	const [isSticky, setIsSticky] = useState(defaultSticky);
	const tableRef = useRef(null);
  
	const handleScroll = useCallback(
	  ({ top, bottom }) => {
		if (top <= 0 && bottom > 2 * 68) {
		  !isSticky && setIsSticky(true);
		} else {
		  isSticky && setIsSticky(false);
		}
	  },
	  [isSticky]
	);
  
	useEffect(() => {
	  const handleScroll = () => {
		handleScroll(tableRef.current.getBoundingClientRect());
	  };
	  window.addEventListener("scroll", handleScroll);
  
	  return () => {
		window.removeEventListener("scroll", handleScroll);
	  };
	}, [handleScroll]);
  
	return { tableRef, isSticky };
  };

  export default useStickyHeader;