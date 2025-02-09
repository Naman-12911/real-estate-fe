import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../images/logo.png'
import SidebarLinkGroup from './SidebarLinkGroup';
import { useSelector } from 'react-redux';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const execpUser=JSON.parse(localStorage.getItem('user'))
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  localStorage.setItem('sidebar-expanded',true)
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

const userType=JSON.parse(useSelector((state)=>state.userType.userType));

const includesAny = (array, values) => {
  return values.some(value => array&&array.includes(value));
};
  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => {setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="flex items-center justify-center w-full">
            {/* <h1>COMPANY NAME</h1> */}
            <img src={logo} alt=""  className='w-32 h-24'/>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
          {/* {userType==="Sale"?<></>} */}
          {includesAny(userType,["admin"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Admin Leads</span>
            </h3>
            <ul className="mt-3">
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/dashboard') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/dashboard"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`fill-current ${pathname.includes('/admin/dashboard') ? 'text-indigo-500' : 'text-slate-600'}`} d="M11 19.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V19.9C2.5 21.4 3.14 22 4.73 22H8.77C10.36 22 11 21.4 11 19.9Z"/>
                        <path className={`fill-current ${pathname.includes('/admin/dashboard') ? 'text-indigo-300' : 'text-slate-400'}`} d="M21.5 19.64V15.36C21.5 14.06 20.5 13 19.27 13H15.23C14 13 13 14.06 13 15.36V19.64C13 20.94 14 22 15.23 22H19.27C20.5 22 21.5 20.94 21.5 19.64Z"/>
                        <path className={`fill-current ${pathname.includes('/admin/dashboard') ? 'text-indigo-300' : 'text-slate-400'}`} d="M21.5 8.64V4.36C21.5 3.06 20.5 2 19.27 2H15.23C14 2 13 3.06 13 4.36V8.64C13 9.94 14 11 15.23 11H19.27C20.5 11 21.5 9.94 21.5 8.64Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                  </div>
                </NavLink>
              </li>
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/viewleads') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/viewleads"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/admin/viewleads') ? 'text-indigo-300' : 'text-slate-400'}`} d="M479.588 320H405.74C450.771 357.695 479.59 414.148 479.59 477.332C479.59 490.07 475.814 501.867 469.592 512H607.592C625.26 512 639.59 497.672 639.59 480C639.59 391.633 567.957 320 479.588 320ZM431.59 256C493.449 256 543.59 205.855 543.59 144S493.449 32 431.59 32C406.482 32 383.549 40.555 364.871 54.512C376.428 76.625 383.59 101.371 383.59 128C383.59 163.523 371.658 196.137 352 222.711C372.303 243.242 400.439 256 431.59 256Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/viewleads') ? 'text-indigo-500' : 'text-slate-600'}`} d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">View Leads</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/dumpleads') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/dumpleads"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                   
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/admin/dumpleads') ? 'text-indigo-300' : 'text-slate-400'}`}  d="M208 80C208 35.818 172.184 0 128 0C103.828 0 82.521 10.973 67.959 27.951L193.123 126.053C202.438 113.074 208 97.24 208 80ZM423.814 216C423.814 158.562 377.273 112 319.859 112C283.928 112 252.789 130.527 234.27 158.303L396.566 285.506C413.379 267.15 423.814 242.906 423.814 216ZM512 160C556.184 160 592 124.182 592 80S556.184 0 512 0C467.82 0 432 35.818 432 80S467.82 160 512 160ZM270.113 352C191.631 352 128 411.693 128 485.332C128 500.059 140.727 512 156.422 512H483.578C495.197 512 505.121 505.416 509.527 496.041L325.748 352H270.113ZM186.969 243.227L121.607 192H88.08C39.438 192 0 233.785 0 285.332C0 295.641 7.887 304 17.615 304H217.07C202.357 286.828 191.812 266.076 186.969 243.227ZM551.92 192H490.08C477.279 192 465.195 195.037 454.221 200.24C454.834 205.475 455.814 210.604 455.814 216C455.814 249.715 443.033 280.211 422.65 304H622.385C632.113 304 640 295.641 640 285.332C640 233.785 600.566 192 551.92 192Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/dumpleads') ? 'text-indigo-500' : 'text-slate-600'}`} d="M634.872 502.805C626.747 513.211 611.685 515.086 601.185 506.883L9.189 42.889C-1.249 34.717 -3.061 19.625 5.126 9.188C9.845 3.156 16.907 0 24.032 0C29.189 0 34.407 1.672 38.814 5.109L630.81 469.102C641.247 477.273 643.06 492.367 634.872 502.805Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dump Leads</span>
                  </div>
                </NavLink>
              </li>
              
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/sitevisits') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/sitevisits"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                      <path className={`fill-current ${pathname.includes('/admin/sitevisits') ? 'text-indigo-300' : 'text-slate-400'}`} d="M208 0C93.125 0 0 93.125 0 208S93.125 416 208 416S416 322.875 416 208S322.875 0 208 0ZM216.24 316.209C214.197 318.541 211.135 320 207.928 320C204.719 320 201.803 318.541 199.76 316.209C178.178 290.688 121.885 220.541 121.885 182.188C121.885 134.5 160.385 96 207.928 96C255.615 96 294.115 134.5 294.115 182.188C294.115 220.541 237.822 290.688 216.24 316.209Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/sitevisits') ? 'text-indigo-500' : 'text-slate-600'}`} d="M505.086 448.402L380.738 324.053C365.709 346.361 346.477 365.594 324.168 380.623L448.518 504.971C457.891 514.344 473.086 514.344 482.459 504.971L505.086 482.344C514.459 472.971 514.459 457.775 505.086 448.402ZM208.043 96C160.5 96 122 134.5 122 182.188C122 220.541 178.293 290.688 199.875 316.209C201.918 318.541 204.834 320 208.043 320C211.25 320 214.313 318.541 216.355 316.209C237.938 290.688 294.23 220.541 294.23 182.188C294.23 134.5 255.73 96 208.043 96ZM208.115 204C192.656 204 180.115 191.459 180.115 176S192.656 148 208.115 148S236.115 160.541 236.115 176S223.574 204 208.115 204Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Site Visit</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/corporatevisits') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/corporatevisits"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                      <path className={`fill-current ${pathname.includes('/admin/corporatevisits') ? 'text-indigo-300' : 'text-slate-400'}`} d="M400 32H336C327.125 32 320 39.125 320 48V96H416V48C416 39.125 408.875 32 400 32ZM224 288H288V128H224V288ZM176 32H112C103.125 32 96 39.125 96 48V96H192V48C192 39.125 184.875 32 176 32Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/corporatevisits') ? 'text-indigo-500' : 'text-slate-600'}`} d="M63.875 160.1C61.336 253.891 3.5 274.295 0 404V448C0 465.6 14.398 480 32 480H160C177.602 480 192 465.6 192 448V288H224V128H95.875C78.258 128 64.352 142.486 63.875 160.1ZM448.125 160.1C447.648 142.486 433.742 128 416.125 128H288V288H320V448C320 465.6 334.398 480 352 480H480C497.602 480 512 465.6 512 448V404C508.5 274.295 450.664 253.891 448.125 160.1Z"/></svg>
                    <span  className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Corporate Visit</span>
                  </div>
                </NavLink>
              </li>
              {/* <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/corporatevisits') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/expectedleads"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                      <path className={`fill-current ${pathname.includes('/admin/expectedleads') ? 'text-indigo-300' : 'text-slate-400'}`} d="M400 32H336C327.125 32 320 39.125 320 48V96H416V48C416 39.125 408.875 32 400 32ZM224 288H288V128H224V288ZM176 32H112C103.125 32 96 39.125 96 48V96H192V48C192 39.125 184.875 32 176 32Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/expectedleads') ? 'text-indigo-500' : 'text-slate-600'}`} d="M63.875 160.1C61.336 253.891 3.5 274.295 0 404V448C0 465.6 14.398 480 32 480H160C177.602 480 192 465.6 192 448V288H224V128H95.875C78.258 128 64.352 142.486 63.875 160.1ZM448.125 160.1C447.648 142.486 433.742 128 416.125 128H288V288H320V448C320 465.6 334.398 480 352 480H480C497.602 480 512 465.6 512 448V404C508.5 274.295 450.664 253.891 448.125 160.1Z"/></svg>
                    <span  className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Expected Leads</span>
                  </div>
                </NavLink>
              </li> */}
              </ul></>:''}
            {includesAny(userType,["admin"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Admin Report</span>
            </h3>
            <ul className="mt-3">
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/agentsreport') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/agentsreport"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 384 512">
                      <path className={`fill-current ${pathname.includes('/admin/agentsreport') ? 'text-indigo-300' : 'text-slate-400'}`} d="M256 0H48C21.49 0 0 21.492 0 48V464C0 490.508 21.49 512 48 512H336C362.51 512 384 490.508 384 464V128H256V0ZM64 72C64 67.625 67.625 64 72 64H152C156.375 64 160 67.625 160 72V88C160 92.375 156.375 96 152 96H72C67.625 96 64 92.375 64 88V72ZM64 136C64 131.625 67.625 128 72 128H152C156.375 128 160 131.625 160 136V152C160 156.375 156.375 160 152 160H72C67.625 160 64 156.375 64 152V136ZM246.625 377.5C248.625 381.5 252.625 384 256.75 384H304C312.875 384 320 391.125 320 400S312.875 416 304 416H256.75C240.375 416 225.5 406.875 218.125 392.125C215.25 386.25 210.125 385.625 208 385.625S200.75 386.25 197.999 391.75L190.25 407.125C187.625 412.625 181.999 416 176 416H174.875C168.375 415.5 162.875 411.25 160.875 405L144 354.625L133.375 386.5C127.5 404.125 111 416 92.375 416H80C71.125 416 64 408.875 64 400S71.125 384 80 384H92.375C97.25 384 101.5 380.875 103 376.375L121.25 321.75C124.5 311.875 133.625 305.25 144 305.25S163.5 311.875 166.75 321.75L180.625 363.375C200.375 347.125 234.75 353.625 246.625 377.5Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/agentsreport') ? 'text-indigo-500' : 'text-slate-600'}`} d="M256 0V128H384L256 0ZM304 384H256.75C252.625 384 248.625 381.5 246.625 377.5C234.75 353.625 200.375 347.125 180.625 363.375L166.75 321.75C163.5 311.875 154.375 305.25 144 305.25S124.5 311.875 121.25 321.75L103 376.375C101.5 380.875 97.25 384 92.375 384H80C71.125 384 64 391.125 64 400S71.125 416 80 416H92.375C111 416 127.5 404.125 133.375 386.5L144 354.625L160.875 405C162.875 411.25 168.375 415.5 174.875 416H176C181.999 416 187.625 412.625 190.25 407.125L197.999 391.75C200.75 386.25 205.875 385.625 208 385.625S215.25 386.25 218.125 392.125C225.5 406.875 240.375 416 256.75 416H304C312.875 416 320 408.875 320 400S312.875 384 304 384Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Agents Report</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/performancereport') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/performancereport"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 384 512">
                      <path className={`fill-current ${pathname.includes('/admin/performancereport') ? 'text-indigo-300' : 'text-slate-400'}`} d="M256 0H48C21.49 0 0 21.492 0 48V464C0 490.508 21.49 512 48 512H336C362.51 512 384 490.508 384 464V128H256V0ZM64 72C64 67.625 67.625 64 72 64H152C156.375 64 160 67.625 160 72V88C160 92.375 156.375 96 152 96H72C67.625 96 64 92.375 64 88V72ZM64 136C64 131.625 67.625 128 72 128H152C156.375 128 160 131.625 160 136V152C160 156.375 156.375 160 152 160H72C67.625 160 64 156.375 64 152V136ZM246.625 377.5C248.625 381.5 252.625 384 256.75 384H304C312.875 384 320 391.125 320 400S312.875 416 304 416H256.75C240.375 416 225.5 406.875 218.125 392.125C215.25 386.25 210.125 385.625 208 385.625S200.75 386.25 197.999 391.75L190.25 407.125C187.625 412.625 181.999 416 176 416H174.875C168.375 415.5 162.875 411.25 160.875 405L144 354.625L133.375 386.5C127.5 404.125 111 416 92.375 416H80C71.125 416 64 408.875 64 400S71.125 384 80 384H92.375C97.25 384 101.5 380.875 103 376.375L121.25 321.75C124.5 311.875 133.625 305.25 144 305.25S163.5 311.875 166.75 321.75L180.625 363.375C200.375 347.125 234.75 353.625 246.625 377.5Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/performancereport') ? 'text-indigo-500' : 'text-slate-600'}`} d="M256 0V128H384L256 0ZM304 384H256.75C252.625 384 248.625 381.5 246.625 377.5C234.75 353.625 200.375 347.125 180.625 363.375L166.75 321.75C163.5 311.875 154.375 305.25 144 305.25S124.5 311.875 121.25 321.75L103 376.375C101.5 380.875 97.25 384 92.375 384H80C71.125 384 64 391.125 64 400S71.125 416 80 416H92.375C111 416 127.5 404.125 133.375 386.5L144 354.625L160.875 405C162.875 411.25 168.375 415.5 174.875 416H176C181.999 416 187.625 412.625 190.25 407.125L197.999 391.75C200.75 386.25 205.875 385.625 208 385.625S215.25 386.25 218.125 392.125C225.5 406.875 240.375 416 256.75 416H304C312.875 416 320 408.875 320 400S312.875 384 304 384Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Performance Report</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/leadsreport') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/leadsreport"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 384 512">
                      <path className={`fill-current ${pathname.includes('/admin/leadsreport') ? 'text-indigo-300' : 'text-slate-400'}`} d="M256 0H48C21.49 0 0 21.492 0 48V464C0 490.508 21.49 512 48 512H336C362.51 512 384 490.508 384 464V128H256V0ZM64 72C64 67.625 67.625 64 72 64H152C156.375 64 160 67.625 160 72V88C160 92.375 156.375 96 152 96H72C67.625 96 64 92.375 64 88V72ZM64 136C64 131.625 67.625 128 72 128H152C156.375 128 160 131.625 160 136V152C160 156.375 156.375 160 152 160H72C67.625 160 64 156.375 64 152V136ZM246.625 377.5C248.625 381.5 252.625 384 256.75 384H304C312.875 384 320 391.125 320 400S312.875 416 304 416H256.75C240.375 416 225.5 406.875 218.125 392.125C215.25 386.25 210.125 385.625 208 385.625S200.75 386.25 197.999 391.75L190.25 407.125C187.625 412.625 181.999 416 176 416H174.875C168.375 415.5 162.875 411.25 160.875 405L144 354.625L133.375 386.5C127.5 404.125 111 416 92.375 416H80C71.125 416 64 408.875 64 400S71.125 384 80 384H92.375C97.25 384 101.5 380.875 103 376.375L121.25 321.75C124.5 311.875 133.625 305.25 144 305.25S163.5 311.875 166.75 321.75L180.625 363.375C200.375 347.125 234.75 353.625 246.625 377.5Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/leadsreport') ? 'text-indigo-500' : 'text-slate-600'}`} d="M256 0V128H384L256 0ZM304 384H256.75C252.625 384 248.625 381.5 246.625 377.5C234.75 353.625 200.375 347.125 180.625 363.375L166.75 321.75C163.5 311.875 154.375 305.25 144 305.25S124.5 311.875 121.25 321.75L103 376.375C101.5 380.875 97.25 384 92.375 384H80C71.125 384 64 391.125 64 400S71.125 416 80 416H92.375C111 416 127.5 404.125 133.375 386.5L144 354.625L160.875 405C162.875 411.25 168.375 415.5 174.875 416H176C181.999 416 187.625 412.625 190.25 407.125L197.999 391.75C200.75 386.25 205.875 385.625 208 385.625S215.25 386.25 218.125 392.125C225.5 406.875 240.375 416 256.75 416H304C312.875 416 320 408.875 320 400S312.875 384 304 384Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Leads Report</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/accountreport') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/accountreport"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 384 512">
                      <path className={`fill-current ${pathname.includes('/admin/accountreport') ? 'text-indigo-300' : 'text-slate-400'}`} d="M256 0H48C21.49 0 0 21.492 0 48V464C0 490.508 21.49 512 48 512H336C362.51 512 384 490.508 384 464V128H256V0ZM64 72C64 67.625 67.625 64 72 64H152C156.375 64 160 67.625 160 72V88C160 92.375 156.375 96 152 96H72C67.625 96 64 92.375 64 88V72ZM64 136C64 131.625 67.625 128 72 128H152C156.375 128 160 131.625 160 136V152C160 156.375 156.375 160 152 160H72C67.625 160 64 156.375 64 152V136ZM246.625 377.5C248.625 381.5 252.625 384 256.75 384H304C312.875 384 320 391.125 320 400S312.875 416 304 416H256.75C240.375 416 225.5 406.875 218.125 392.125C215.25 386.25 210.125 385.625 208 385.625S200.75 386.25 197.999 391.75L190.25 407.125C187.625 412.625 181.999 416 176 416H174.875C168.375 415.5 162.875 411.25 160.875 405L144 354.625L133.375 386.5C127.5 404.125 111 416 92.375 416H80C71.125 416 64 408.875 64 400S71.125 384 80 384H92.375C97.25 384 101.5 380.875 103 376.375L121.25 321.75C124.5 311.875 133.625 305.25 144 305.25S163.5 311.875 166.75 321.75L180.625 363.375C200.375 347.125 234.75 353.625 246.625 377.5Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/accountreport') ? 'text-indigo-500' : 'text-slate-600'}`} d="M256 0V128H384L256 0ZM304 384H256.75C252.625 384 248.625 381.5 246.625 377.5C234.75 353.625 200.375 347.125 180.625 363.375L166.75 321.75C163.5 311.875 154.375 305.25 144 305.25S124.5 311.875 121.25 321.75L103 376.375C101.5 380.875 97.25 384 92.375 384H80C71.125 384 64 391.125 64 400S71.125 416 80 416H92.375C111 416 127.5 404.125 133.375 386.5L144 354.625L160.875 405C162.875 411.25 168.375 415.5 174.875 416H176C181.999 416 187.625 412.625 190.25 407.125L197.999 391.75C200.75 386.25 205.875 385.625 208 385.625S215.25 386.25 218.125 392.125C225.5 406.875 240.375 416 256.75 416H304C312.875 416 320 408.875 320 400S312.875 384 304 384Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Accounts Report</span>
                  </div>
                </NavLink>
              </li>
              </ul></>:''}
              {includesAny(userType,["admin","site_worker"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Construction Professionals</span>
            </h3>
            <ul className="mt-3">
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/constructor/searchapplicant') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/constructor/searchapplicant"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                    <path className={`fill-current ${pathname.includes('/constructor/searchapplicant') ? 'text-indigo-300' : 'text-slate-400'}`} d="M208.104 307.047L148.889 247.887L0 396.775C-26.367 423.143 -26.367 465.857 0 492.225C13.184 505.408 30.439 512 47.725 512S82.266 505.408 95.449 492.225L214.559 373.115C205.691 352.344 202.816 329.354 208.104 307.047ZM44.225 472C30.971 472 20.225 461.254 20.225 448C20.225 434.744 30.971 424 44.225 424S68.225 434.744 68.225 448C68.225 461.254 57.479 472 44.225 472ZM487.924 109.26C486.283 102.83 479.74 98.949 473.312 100.59C471.219 101.125 469.307 102.213 467.779 103.742L393.328 178.244L325.365 166.92L314.041 98.906L388.492 24.457C393.189 19.77 393.199 12.162 388.512 7.465C386.947 5.896 384.98 4.791 382.826 4.271C333.738 -7.951 281.834 6.463 246.078 42.248C206.391 81.936 195.467 139.467 211.986 189.627L207.885 193.729L278.84 264.674C307.344 250.529 341.695 256.121 364.244 278.572L371.744 286.07C401.385 281.352 428.777 267.4 449.969 246.137C485.787 210.348 500.197 158.385 487.924 109.26Z"/>
                    <path className={`fill-current ${pathname.includes('/constructor/searchapplicant') ? 'text-indigo-500' : 'text-slate-600'}`} d="M384 278.626C360.842 255.467 326.424 251.036 298.604 264.706L192 158.001V96.001L64 0.001L0 64.001L96 192.001H158L264.705 298.604C251.035 326.424 255.467 360.842 278.625 384.001L395.625 501.126C410.25 515.626 433.875 515.626 448.375 501.126L501.125 448.376C515.625 433.876 515.625 410.251 501.125 395.626L384 278.626Z"/>
                  </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Site Update</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/constructor/searchconstructor') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/constructor/searchconstructor"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                    <path className={`fill-current ${pathname.includes('/constructor/searchconstructor') ? 'text-indigo-300' : 'text-slate-400'}`} d="M208.104 307.047L148.889 247.887L0 396.775C-26.367 423.143 -26.367 465.857 0 492.225C13.184 505.408 30.439 512 47.725 512S82.266 505.408 95.449 492.225L214.559 373.115C205.691 352.344 202.816 329.354 208.104 307.047ZM44.225 472C30.971 472 20.225 461.254 20.225 448C20.225 434.744 30.971 424 44.225 424S68.225 434.744 68.225 448C68.225 461.254 57.479 472 44.225 472ZM487.924 109.26C486.283 102.83 479.74 98.949 473.312 100.59C471.219 101.125 469.307 102.213 467.779 103.742L393.328 178.244L325.365 166.92L314.041 98.906L388.492 24.457C393.189 19.77 393.199 12.162 388.512 7.465C386.947 5.896 384.98 4.791 382.826 4.271C333.738 -7.951 281.834 6.463 246.078 42.248C206.391 81.936 195.467 139.467 211.986 189.627L207.885 193.729L278.84 264.674C307.344 250.529 341.695 256.121 364.244 278.572L371.744 286.07C401.385 281.352 428.777 267.4 449.969 246.137C485.787 210.348 500.197 158.385 487.924 109.26Z"/>
                    <path className={`fill-current ${pathname.includes('/constructor/searchconstructor') ? 'text-indigo-500' : 'text-slate-600'}`} d="M384 278.626C360.842 255.467 326.424 251.036 298.604 264.706L192 158.001V96.001L64 0.001L0 64.001L96 192.001H158L264.705 298.604C251.035 326.424 255.467 360.842 278.625 384.001L395.625 501.126C410.25 515.626 433.875 515.626 448.375 501.126L501.125 448.376C515.625 433.876 515.625 410.251 501.125 395.626L384 278.626Z"/>
                  </svg> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                    <path className={`fill-current ${pathname.includes('/constructor/searchconstructor') ? 'text-indigo-300' : 'text-slate-400'}`} d="M96 512C51.817 512 16 476.183 16 432S51.817 352 96 352S176 387.817 176 432S140.183 512 96 512ZM432 432C432 387.817 396.183 352 352 352S272 387.817 272 432S307.817 512 352 512S432 476.183 432 432ZM608 384H544V32C544 14.4 529.6 0 512 0H512C494.4 0 480 14.4 480 32V432C480 440.8 487.2 448 496 448H608C625.6 448 640 433.6 640 416V416C640 398.4 625.6 384 608 384Z"/>
                    <path className={`fill-current ${pathname.includes('/constructor/searchconstructor') ? 'text-indigo-500' : 'text-slate-600'}`} d="M96 320C152.281 320 198.535 361.859 206.383 416H241.617C249.465 361.859 295.719 320 352 320C375.82 320 397.828 327.602 416 340.328V237.125C416 228.375 414.25 219.875 410.75 211.875L332.5 29.125C324.875 11.375 307.625 0 288.25 0H144C117.5 0 96 21.5 96 48V160H48C21.5 160 0 181.5 0 208V375.227C19.531 342.328 55.047 320 96 320ZM160 64H277.75L352 237.125V256H256L160 160V64Z"/></svg>
                    <span  className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Billing</span>
                  </div>
                </NavLink>
              </li>
              </ul></>:''}
              {includesAny(userType,["admin"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Admin Management</span>
            </h3>
            <ul className="mt-3">
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/agentmanagement') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/agentmanagement"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/admin/agentmanagement') ? 'text-indigo-300' : 'text-slate-400'}`} d="M96 64.001H544V224.001C568.625 224.001 591 233.626 608 249.001V49.626C608 22.251 586.5 0.001 560 0.001H80C53.5 0.001 32 22.251 32 49.626V249.001C49 233.626 71.375 224.001 96 224.001V64.001Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/agentmanagement') ? 'text-indigo-500' : 'text-slate-600'}`} d="M320 383.977C355.219 383.844 383.732 355.262 383.732 320S355.219 256.156 320 256.023C284.781 256.156 256.268 284.738 256.268 320S284.781 383.844 320 383.977ZM343.75 416H296.25C256.424 416 224 449.5 224 490.656C224 502.438 233.34 512 244.834 512H395.166C406.66 512 416 502.438 416 490.656C416 449.5 383.576 416 343.75 416ZM567.75 416H520.25C480.424 416 448 449.5 448 490.656C448 502.438 457.34 512 468.834 512H619.166C630.66 512 640 502.438 640 490.656C640 449.5 607.576 416 567.75 416ZM544 383.977C579.219 383.844 607.732 355.262 607.732 320S579.219 256.156 544 256.023C508.781 256.156 480.268 284.738 480.268 320S508.781 383.844 544 383.977ZM96 383.977C131.219 383.844 159.732 355.262 159.732 320S131.219 256.156 96 256.023C60.781 256.156 32.268 284.738 32.268 320S60.781 383.844 96 383.977ZM119.75 416H72.25C32.424 416 0 449.5 0 490.656C0 502.438 9.34 512 20.834 512H171.166C182.66 512 192 502.438 192 490.656C192 449.5 159.576 416 119.75 416Z"/></svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Agent Management</span>
                  </div>
                </NavLink>
              </li>
            </ul></>:''}
            {includesAny(userType,["admin"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Ticket Management</span>
            </h3>
            <ul className="mt-3">
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/tickets') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/tickets"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 576 512">
                      <path className={`fill-current ${pathname.includes('/admin/tickets') ? 'text-indigo-300' : 'text-slate-400'}`} d="M128 352.001H448V160.001H128V352.001ZM576 208.001V112.001C576 85.501 554.5 64.001 528 64.001H48C21.5 64.001 0 85.501 0 112.001V208.001C26.5 208.001 48 229.501 48 256.001S26.5 304.001 0 304.001V400.001C0 426.501 21.5 448.001 48 448.001H528C554.5 448.001 576 426.501 576 400.001V304.001C549.5 304.001 528 282.501 528 256.001S549.5 208.001 576 208.001ZM480 360.001C480 373.251 469.25 384.001 456 384.001H120C106.75 384.001 96 373.251 96 360.001V152.001C96 138.751 106.75 128.001 120 128.001H456C469.25 128.001 480 138.751 480 152.001V360.001Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/tickets') ? 'text-indigo-500' : 'text-slate-600'}`} d="M456 128H120C106.75 128 96 138.75 96 152V360C96 373.25 106.75 384 120 384H456C469.25 384 480 373.25 480 360V152C480 138.75 469.25 128 456 128ZM448 352H128V160H448V352Z" /></svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tickets</span>
                  </div>
                </NavLink>
              </li>
              </ul></>:''}
              {includesAny(userType,["admin"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Super Admin Section</span>
            </h3>
            <ul className="mt-3">
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/project') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/project"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/project') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/project') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Project</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname=='/superadmin/type' && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/type"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                      <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/type') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/type') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Project Type</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/unitnumber') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/unitnumber"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/unitnumber') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/unitnumber') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Unit Number</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/phase') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/phase"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/phase') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/phase') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Project Phase</span>
                  </div>
                </NavLink>
              </li>    
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/booking') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/booking"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/booking') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/booking') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Booking Details</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/personaldetails') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/personaldetails"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/personaldetails') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/personaldetails') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Personal Details</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/coapplicantdetail') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/coapplicantdetail"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/coapplicantdetail') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/coapplicantdetail') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                   
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Co-Applicant Details</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/paymentstage') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/paymentstage"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/paymentstage') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/paymentstage') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Payment Stage</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/demandletter') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/demandletter"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/demandletter') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/demandletter') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Demand Letter</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/billreceipt') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/billreceipt"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/billreceipt') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/billreceipt') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Bill Receipt</span>
                  </div>
                </NavLink>
              </li>
              
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/bank') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/bank"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/bank') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/bank') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Bank</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/paymentmode') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/paymentmode"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/paymentmode') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/paymentmode') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Payment Mode</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/leadsource') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/leadsource"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/leadsource') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/leadsource') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Lead Source</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/leadsubsource') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/leadsubsource"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/leadsubsource') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/leadsubsource') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Lead Sub Source</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/clientloan') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/clientloan"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/clientloan') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/clientloan') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Client Loan</span>
                  </div>
                </NavLink>
              </li>
              
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/festival') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/festival"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/festival') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/festival') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Festival</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/superadmin/faq') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/superadmin/faq"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                          <path className={`fill-current ${pathname.includes('/superadmin/faq') ? 'text-indigo-300' : 'text-slate-400'}`} d="M464 96H272L208 32H48C21.5 32 0 53.5 0 80V432C0 458.5 21.5 480 48 480H464C490.5 480 512 458.5 512 432V144C512 117.5 490.5 96 464 96ZM366.852 352C362.395 359.719 357.07 366.551 351.293 372.859C348.787 375.598 344.66 376.141 341.447 374.281L317.992 360.742C309.188 368.254 299.125 374.164 288 378.121V405.141C288 408.852 285.469 412.156 281.846 412.953C273.492 414.805 264.914 416 256 416C247.088 416 238.508 414.805 230.156 412.953C226.531 412.156 224 408.852 224 405.141V378.121C212.875 374.164 202.812 368.254 194.008 360.742L170.555 374.281C167.34 376.141 163.215 375.598 160.707 372.859C154.932 366.551 149.605 359.719 145.148 352C140.693 344.281 137.439 336.254 134.863 328.094C133.746 324.555 135.34 320.711 138.555 318.859L161.76 305.461C160.713 299.781 160 293.98 160 288S160.713 276.219 161.76 270.539L138.555 257.141C135.34 255.289 133.746 251.445 134.863 247.902C137.439 239.746 140.693 231.719 145.148 224C149.605 216.281 154.932 209.449 160.707 203.141C163.215 200.402 167.34 199.859 170.555 201.719L194.008 215.258C202.812 207.746 212.875 201.836 224 197.879V170.859C224 167.148 226.531 163.844 230.156 163.043C238.508 161.195 247.088 160 256 160C264.914 160 273.492 161.195 281.846 163.043C285.469 163.844 288 167.148 288 170.859V197.879C299.125 201.836 309.188 207.746 317.992 215.258L341.447 201.719C344.66 199.859 348.787 200.402 351.293 203.141C357.07 209.449 362.395 216.281 366.852 224S374.562 239.746 377.137 247.906C378.256 251.445 376.66 255.289 373.447 257.141L350.24 270.539C351.287 276.219 352 282.02 352 288S351.287 299.781 350.24 305.461L373.447 318.859C376.66 320.711 378.256 324.555 377.139 328.094C374.562 336.254 371.309 344.281 366.852 352ZM256 248C233.908 248 216 265.906 216 288S233.908 328 256 328S296 310.094 296 288S278.092 248 256 248Z"/>
                          <path className={`fill-current ${pathname.includes('/superadmin/faq') ? 'text-indigo-500' : 'text-slate-600'}`} d="M373.939 318.859L350.732 305.461C351.779 299.781 352.492 293.98 352.492 288S351.779 276.219 350.732 270.539L373.939 257.141C377.152 255.289 378.748 251.445 377.629 247.906C375.055 239.746 371.801 231.719 367.344 224S357.563 209.449 351.785 203.141C349.279 200.402 345.152 199.859 341.939 201.719L318.484 215.258C309.68 207.746 299.617 201.836 288.492 197.879V170.859C288.492 167.148 285.961 163.844 282.338 163.043C273.984 161.195 265.406 160 256.492 160C247.58 160 239 161.195 230.648 163.043C227.023 163.844 224.492 167.148 224.492 170.859V197.879C213.367 201.836 203.305 207.746 194.5 215.258L171.047 201.719C167.832 199.859 163.707 200.402 161.199 203.141C155.424 209.449 150.098 216.281 145.641 224C141.186 231.719 137.932 239.746 135.355 247.902C134.238 251.445 135.832 255.289 139.047 257.141L162.252 270.539C161.205 276.219 160.492 282.02 160.492 288S161.205 299.781 162.252 305.461L139.047 318.859C135.832 320.711 134.238 324.555 135.355 328.094C137.932 336.254 141.186 344.281 145.641 352C150.098 359.719 155.424 366.551 161.199 372.859C163.707 375.598 167.832 376.141 171.047 374.281L194.5 360.742C203.305 368.254 213.367 374.164 224.492 378.121V405.141C224.492 408.852 227.023 412.156 230.648 412.953C239 414.805 247.58 416 256.492 416C265.406 416 273.984 414.805 282.338 412.953C285.961 412.156 288.492 408.852 288.492 405.141V378.121C299.617 374.164 309.68 368.254 318.484 360.742L341.939 374.281C345.152 376.141 349.279 375.598 351.785 372.859C357.563 366.551 362.887 359.719 367.344 352S375.055 336.254 377.631 328.094C378.748 324.555 377.152 320.711 373.939 318.859ZM256.492 328C234.4 328 216.492 310.094 216.492 288S234.4 248 256.492 248S296.492 265.906 296.492 288S278.584 328 256.492 328Z"/>
                        </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">FAQ</span>
                  </div>
                </NavLink>
              </li>
              </ul></>:''}
            {includesAny(userType,["admin","sales_employee"])?<>
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Sales</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              {includesAny(userType,["sales_employee"])&&<li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('myjobdesk') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/sale/myjobdesk"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`fill-current ${pathname.includes('myjobdesk') ? 'text-indigo-500' : 'text-slate-600'}`} d="M11 19.9V4.1C11 2.6 10.36 2 8.77 2H4.73C3.14 2 2.5 2.6 2.5 4.1V19.9C2.5 21.4 3.14 22 4.73 22H8.77C10.36 22 11 21.4 11 19.9Z"/>
                        <path className={`fill-current ${pathname.includes('myjobdesk') ? 'text-indigo-300' : 'text-slate-400'}`} d="M21.5 19.64V15.36C21.5 14.06 20.5 13 19.27 13H15.23C14 13 13 14.06 13 15.36V19.64C13 20.94 14 22 15.23 22H19.27C20.5 22 21.5 20.94 21.5 19.64Z"/>
                        <path className={`fill-current ${pathname.includes('myjobdesk') ? 'text-indigo-300' : 'text-slate-400'}`} d="M21.5 8.64V4.36C21.5 3.06 20.5 2 19.27 2H15.23C14 2 13 3.06 13 4.36V8.64C13 9.94 14 11 15.23 11H19.27C20.5 11 21.5 9.94 21.5 8.64Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">My Job Desk</span>
                  </div>
                </NavLink>
              </li>}
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/sale/addnewlead') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/sale/addnewlead"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`fill-current ${pathname.includes('/sale/addnewlead') ? 'text-indigo-300' : 'text-slate-400'}`} d="M21.0901 21.5C21.0901 21.78 20.8701 22 20.5901 22H3.41016C3.13016 22 2.91016 21.78 2.91016 21.5C2.91016 17.36 6.99015 14 12.0002 14C13.0302 14 14.0302 14.14 14.9502 14.41C14.3602 15.11 14.0002 16.02 14.0002 17C14.0002 17.75 14.2101 18.46 14.5801 19.06C14.7801 19.4 15.0401 19.71 15.3401 19.97C16.0401 20.61 16.9702 21 18.0002 21C19.1202 21 20.1302 20.54 20.8502 19.8C21.0102 20.34 21.0901 20.91 21.0901 21.5Z"/>
                        <path className={`fill-current ${pathname.includes('/sale/addnewlead') ? 'text-indigo-500' : 'text-slate-600'}`} d="M20.97 14.33C20.25 13.51 19.18 13 18 13C16.88 13 15.86 13.46 15.13 14.21C14.43 14.93 14 15.92 14 17C14 17.75 14.21 18.46 14.58 19.06C14.78 19.4 15.04 19.71 15.34 19.97C16.04 20.61 16.97 21 18 21C19.46 21 20.73 20.22 21.42 19.06C21.63 18.72 21.79 18.33 21.88 17.93C21.96 17.63 22 17.32 22 17C22 15.98 21.61 15.04 20.97 14.33ZM19.5 17.73H18.75V18.51C18.75 18.92 18.41 19.26 18 19.26C17.59 19.26 17.25 18.92 17.25 18.51V17.73H16.5C16.09 17.73 15.75 17.39 15.75 16.98C15.75 16.57 16.09 16.23 16.5 16.23H17.25V15.52C17.25 15.11 17.59 14.77 18 14.77C18.41 14.77 18.75 15.11 18.75 15.52V16.23H19.5C19.91 16.23 20.25 16.57 20.25 16.98C20.25 17.39 19.91 17.73 19.5 17.73Z"/>
                        <path className={`fill-current ${pathname.includes('/sale/addnewlead') ? 'text-indigo-500' : 'text-slate-600'}`} d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Add New Lead</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/sale/viewleads') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/sale/viewleads"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/sale/viewleads') ? 'text-indigo-300' : 'text-slate-400'}`} d="M479.588 320H405.74C450.771 357.695 479.59 414.148 479.59 477.332C479.59 490.07 475.814 501.867 469.592 512H607.592C625.26 512 639.59 497.672 639.59 480C639.59 391.633 567.957 320 479.588 320ZM431.59 256C493.449 256 543.59 205.855 543.59 144S493.449 32 431.59 32C406.482 32 383.549 40.555 364.871 54.512C376.428 76.625 383.59 101.371 383.59 128C383.59 163.523 371.658 196.137 352 222.711C372.303 243.242 400.439 256 431.59 256Z"/>
                      <path className={`fill-current ${pathname.includes('/sale/viewleads') ? 'text-indigo-500' : 'text-slate-600'}`} d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">View Leads</span>
                  </div>
                </NavLink>
              </li>
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/sale/viewdumpleads') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/sale/viewdumpleads"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/sale/viewdumpleads') ? 'text-indigo-300' : 'text-slate-400'}`}  d="M208 80C208 35.818 172.184 0 128 0C103.828 0 82.521 10.973 67.959 27.951L193.123 126.053C202.438 113.074 208 97.24 208 80ZM423.814 216C423.814 158.562 377.273 112 319.859 112C283.928 112 252.789 130.527 234.27 158.303L396.566 285.506C413.379 267.15 423.814 242.906 423.814 216ZM512 160C556.184 160 592 124.182 592 80S556.184 0 512 0C467.82 0 432 35.818 432 80S467.82 160 512 160ZM270.113 352C191.631 352 128 411.693 128 485.332C128 500.059 140.727 512 156.422 512H483.578C495.197 512 505.121 505.416 509.527 496.041L325.748 352H270.113ZM186.969 243.227L121.607 192H88.08C39.438 192 0 233.785 0 285.332C0 295.641 7.887 304 17.615 304H217.07C202.357 286.828 191.812 266.076 186.969 243.227ZM551.92 192H490.08C477.279 192 465.195 195.037 454.221 200.24C454.834 205.475 455.814 210.604 455.814 216C455.814 249.715 443.033 280.211 422.65 304H622.385C632.113 304 640 295.641 640 285.332C640 233.785 600.566 192 551.92 192Z"/>
                      <path className={`fill-current ${pathname.includes('/sale/viewdumpleads') ? 'text-indigo-500' : 'text-slate-600'}`} d="M634.872 502.805C626.747 513.211 611.685 515.086 601.185 506.883L9.189 42.889C-1.249 34.717 -3.061 19.625 5.126 9.188C9.845 3.156 16.907 0 24.032 0C29.189 0 34.407 1.672 38.814 5.109L630.81 469.102C641.247 477.273 643.06 492.367 634.872 502.805Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dump Data</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/sale/sitevisit') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/sale/sitevisit"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                      <path className={`fill-current ${pathname.includes('/sale/sitevisit') ? 'text-indigo-300' : 'text-slate-400'}`} d="M208 0C93.125 0 0 93.125 0 208S93.125 416 208 416S416 322.875 416 208S322.875 0 208 0ZM216.24 316.209C214.197 318.541 211.135 320 207.928 320C204.719 320 201.803 318.541 199.76 316.209C178.178 290.688 121.885 220.541 121.885 182.188C121.885 134.5 160.385 96 207.928 96C255.615 96 294.115 134.5 294.115 182.188C294.115 220.541 237.822 290.688 216.24 316.209Z"/>
                      <path className={`fill-current ${pathname.includes('/sale/sitevisit') ? 'text-indigo-500' : 'text-slate-600'}`} d="M505.086 448.402L380.738 324.053C365.709 346.361 346.477 365.594 324.168 380.623L448.518 504.971C457.891 514.344 473.086 514.344 482.459 504.971L505.086 482.344C514.459 472.971 514.459 457.775 505.086 448.402ZM208.043 96C160.5 96 122 134.5 122 182.188C122 220.541 178.293 290.688 199.875 316.209C201.918 318.541 204.834 320 208.043 320C211.25 320 214.313 318.541 216.355 316.209C237.938 290.688 294.23 220.541 294.23 182.188C294.23 134.5 255.73 96 208.043 96ZM208.115 204C192.656 204 180.115 191.459 180.115 176S192.656 148 208.115 148S236.115 160.541 236.115 176S223.574 204 208.115 204Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Site Visit</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/sale/corporatevisits') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/sale/corporatevisits"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                   
                  <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 512 512">
                      <path className={`fill-current ${pathname.includes('/sale/corporatevisits') ? 'text-indigo-300' : 'text-slate-400'}`} d="M400 32H336C327.125 32 320 39.125 320 48V96H416V48C416 39.125 408.875 32 400 32ZM224 288H288V128H224V288ZM176 32H112C103.125 32 96 39.125 96 48V96H192V48C192 39.125 184.875 32 176 32Z"/>
                      <path className={`fill-current ${pathname.includes('/sale/corporatevisits') ? 'text-indigo-500' : 'text-slate-600'}`} d="M63.875 160.1C61.336 253.891 3.5 274.295 0 404V448C0 465.6 14.398 480 32 480H160C177.602 480 192 465.6 192 448V288H224V128H95.875C78.258 128 64.352 142.486 63.875 160.1ZM448.125 160.1C447.648 142.486 433.742 128 416.125 128H288V288H320V448C320 465.6 334.398 480 352 480H480C497.602 480 512 465.6 512 448V404C508.5 274.295 450.664 253.891 448.125 160.1Z"/></svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Corporate Visit</span>
                  </div>
                </NavLink>
              </li>
              </ul>
            </>:''}
              {includesAny(userType,["admin","accounts_employee"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Account</span>
            </h3>
            <ul className="mt-3">
            {userType!=='Admin'?<li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/admin/accountreport') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/admin/accountreport"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 384 512">
                      <path className={`fill-current ${pathname.includes('/admin/accountreport') ? 'text-indigo-300' : 'text-slate-400'}`} d="M256 0H48C21.49 0 0 21.492 0 48V464C0 490.508 21.49 512 48 512H336C362.51 512 384 490.508 384 464V128H256V0ZM64 72C64 67.625 67.625 64 72 64H152C156.375 64 160 67.625 160 72V88C160 92.375 156.375 96 152 96H72C67.625 96 64 92.375 64 88V72ZM64 136C64 131.625 67.625 128 72 128H152C156.375 128 160 131.625 160 136V152C160 156.375 156.375 160 152 160H72C67.625 160 64 156.375 64 152V136ZM246.625 377.5C248.625 381.5 252.625 384 256.75 384H304C312.875 384 320 391.125 320 400S312.875 416 304 416H256.75C240.375 416 225.5 406.875 218.125 392.125C215.25 386.25 210.125 385.625 208 385.625S200.75 386.25 197.999 391.75L190.25 407.125C187.625 412.625 181.999 416 176 416H174.875C168.375 415.5 162.875 411.25 160.875 405L144 354.625L133.375 386.5C127.5 404.125 111 416 92.375 416H80C71.125 416 64 408.875 64 400S71.125 384 80 384H92.375C97.25 384 101.5 380.875 103 376.375L121.25 321.75C124.5 311.875 133.625 305.25 144 305.25S163.5 311.875 166.75 321.75L180.625 363.375C200.375 347.125 234.75 353.625 246.625 377.5Z"/>
                      <path className={`fill-current ${pathname.includes('/admin/accountreport') ? 'text-indigo-500' : 'text-slate-600'}`} d="M256 0V128H384L256 0ZM304 384H256.75C252.625 384 248.625 381.5 246.625 377.5C234.75 353.625 200.375 347.125 180.625 363.375L166.75 321.75C163.5 311.875 154.375 305.25 144 305.25S124.5 311.875 121.25 321.75L103 376.375C101.5 380.875 97.25 384 92.375 384H80C71.125 384 64 391.125 64 400S71.125 416 80 416H92.375C111 416 127.5 404.125 133.375 386.5L144 354.625L160.875 405C162.875 411.25 168.375 415.5 174.875 416H176C181.999 416 187.625 412.625 190.25 407.125L197.999 391.75C200.75 386.25 205.875 385.625 208 385.625S215.25 386.25 218.125 392.125C225.5 406.875 240.375 416 256.75 416H304C312.875 416 320 408.875 320 400S312.875 384 304 384Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Accounts Report</span>
                  </div>
                </NavLink>
              </li>:''}
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/main/db/propertystatus') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/main/db/propertystatus"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shrink-0 h-7 w-7">
                          <path className={`fill-current ${pathname.includes('/main/db/propertystatus') ? 'text-indigo-300' : 'text-slate-400'}`} d="M48 128.029C21.49 128.029 0 149.52 0 176.029V480.029C0 497.701 14.326 512.029 32 512.029L192 512V128.029H48ZM128 336.029C128 344.865 120.836 352.029 112 352.029H80C71.164 352.029 64 344.865 64 336.029V304.029C64 295.191 71.164 288.029 80 288.029H112C120.836 288.029 128 295.191 128 304.029V336.029ZM128 240.029C128 248.865 120.836 256.029 112 256.029H80C71.164 256.029 64 248.865 64 240.029V208.029C64 199.191 71.164 192.029 80 192.029H112C120.836 192.029 128 199.191 128 208.029V240.029Z"/>
                          <path className={`fill-current ${pathname.includes('/main/db/propertystatus') ? 'text-indigo-500' : 'text-slate-600'}`} d="M464 0H240C213.49 0 192 21.49 192 48V511.971L480 512C497.674 512 512 497.672 512 480V48C512 21.49 490.51 0 464 0ZM320 304C320 312.836 312.836 320 304 320H272C263.164 320 256 312.836 256 304V272C256 263.162 263.164 256 272 256H304C312.836 256 320 263.162 320 272V304ZM320 208C320 216.836 312.836 224 304 224H272C263.164 224 256 216.836 256 208V176C256 167.162 263.164 160 272 160H304C312.836 160 320 167.162 320 176V208ZM320 112C320 120.836 312.836 128 304 128H272C263.164 128 256 120.836 256 112V80C256 71.162 263.164 64 272 64H304C312.836 64 320 71.162 320 80V112ZM448 304C448 312.836 440.836 320 432 320H400C391.164 320 384 312.836 384 304V272C384 263.162 391.164 256 400 256H432C440.836 256 448 263.162 448 272V304ZM448 208C448 216.836 440.836 224 432 224H400C391.164 224 384 216.836 384 208V176C384 167.162 391.164 160 400 160H432C440.836 160 448 167.162 448 176V208ZM448 112C448 120.836 440.836 128 432 128H400C391.164 128 384 120.836 384 112V80C384 71.162 391.164 64 400 64H432C440.836 64 448 71.162 448 80V112Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Property Status</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/main/db/addbookingform') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/main/db/addbookingform/projectdetails"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="shrink-0 h-7 w-7">
                              <path className={`fill-current ${pathname.includes('/main/db/addbookingform') ? 'text-indigo-300' : 'text-slate-400'}`} d="M256 128V0H48C21.49 0 0 21.492 0 48V464C0 490.508 21.49 512 48 512H336C362.51 512 384 490.508 384 464V128H256ZM272 416H112C103.164 416 96 408.836 96 400S103.164 384 112 384H272C280.836 384 288 391.164 288 400S280.836 416 272 416ZM272 352H112C103.164 352 96 344.836 96 336S103.164 320 112 320H272C280.836 320 288 327.164 288 336S280.836 352 272 352ZM272 288H112C103.164 288 96 280.836 96 272S103.164 256 112 256H272C280.836 256 288 263.164 288 272S280.836 288 272 288Z"/>
                              <path className={`fill-current ${pathname.includes('/main/db/addbookingform') ? 'text-indigo-500' : 'text-slate-600'}`} d="M256 0V128H384L256 0ZM272 384H112C103.164 384 96 391.164 96 400S103.164 416 112 416H272C280.836 416 288 408.836 288 400S280.836 384 272 384ZM272 320H112C103.164 320 96 327.164 96 336S103.164 352 112 352H272C280.836 352 288 344.836 288 336S280.836 320 272 320ZM272 256H112C103.164 256 96 263.164 96 272S103.164 288 112 288H272C280.836 288 288 280.836 288 272S280.836 256 272 256Z"/>
                          </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Direct Booking</span>
                  </div>
                </NavLink>
              </li>
              {/* E-Commerce */}
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/main/bf/editbookingform') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/main/bf/editbookingform/searchapplicant"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="shrink-0 h-7 w-7">
                          <path className={`fill-current ${pathname.includes('/main/bf/editbookingform') ? 'text-indigo-300' : 'text-slate-400'}`} d="M384 198.822V64C384 28.652 355.346 0 320 0H64C28.654 0 0 28.652 0 64V448C0 483.346 28.654 512 64 512H320C323.357 512 326.584 511.51 329.803 511.012C285.209 479.051 256 426.926 256 368C256 287.609 310.24 219.787 384 198.822ZM176 352H80C71.164 352 64 344.836 64 336S71.164 320 80 320H176C184.838 320 192 327.164 192 336S184.838 352 176 352ZM240 256H80C71.164 256 64 248.836 64 240S71.164 224 80 224H240C248.838 224 256 231.164 256 240S248.838 256 240 256ZM80 160C71.164 160 64 152.836 64 144S71.164 128 80 128H304C312.838 128 320 135.164 320 144S312.838 160 304 160H80Z"/>
                          <path className={`fill-current ${pathname.includes('/main/bf/editbookingform') ? 'text-indigo-500' : 'text-slate-600'}`} d="M80 160H304C312.838 160 320 152.836 320 144S312.838 128 304 128H80C71.164 128 64 135.164 64 144S71.164 160 80 160ZM176 320H80C71.164 320 64 327.164 64 336S71.164 352 80 352H176C184.838 352 192 344.836 192 336S184.838 320 176 320ZM240 224H80C71.164 224 64 231.164 64 240S71.164 256 80 256H240C248.838 256 256 248.836 256 240S248.838 224 240 224ZM432.002 224C352.463 224 288 288.463 288 368S352.463 512 432.002 512C511.537 512 576 447.537 576 368S511.537 224 432.002 224ZM499.312 341.984L424.656 416.641C421.531 419.766 417.438 421.328 413.344 421.328S405.156 419.766 402.031 416.641L364.688 379.312C358.438 373.062 358.438 362.937 364.688 356.688S381.063 350.438 387.312 356.688L413.344 382.703L476.688 319.359C482.938 313.109 493.063 313.109 499.312 319.359S505.562 335.734 499.312 341.984Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Booking Form</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/main/payment') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/main/payment/searchapplicant"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shrink-0 h-7 w-7">
                          <path className={`fill-current ${pathname.includes('/main/payment') ? 'text-indigo-300' : 'text-slate-400'}`} d="M488 352H288V480H488C501.25 480 512 469.25 512 456V376C512 362.75 501.25 352 488 352ZM464 432H289V400H464V432ZM488 32H352V160H488C501.25 160 512 149.25 512 136V56C512 42.75 501.25 32 488 32ZM464 112H353V80H464V112ZM488 192H160V320H488C501.25 320 512 309.25 512 296V216C512 202.75 501.25 192 488 192ZM464 272H161V240H464V272Z"/>
                          <path className={`fill-current ${pathname.includes('/main/payment') ? 'text-indigo-500' : 'text-slate-600'}`} d="M24 320H160V192H24C10.75 192 0 202.75 0 216V296C0 309.25 10.75 320 24 320ZM0 376V456C0 469.25 10.75 480 24 480H288V352H24C10.75 352 0 362.75 0 376ZM24 32C10.75 32 0 42.75 0 56V136C0 149.25 10.75 160 24 160H352V32H24Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Payment Stages</span>
                  </div>
                </NavLink>
              </li>
              <SidebarLinkGroup activecondition={pathname === '/main/demandletter/' || pathname.includes('/main/demandletter/')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150  ${
                          pathname === '/main/demandletter/' || pathname.includes('/main/demandletter/') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shrink-0 h-7 w-7">
                            <path className={`fill-current ${pathname.includes('/main/demandletter/') ? 'text-indigo-300' : 'text-slate-400'}`} d="M416 32.004H96C78.328 32.004 64 46.33 64 64.003V246.422L228.469 374.36C244.664 386.956 267.336 386.956 283.531 374.36L448 246.422V64.003C448 46.33 433.672 32.004 416 32.004ZM336 223.998H176C167.164 223.998 160 216.834 160 207.998C160 199.161 167.164 191.999 176 191.999H336C344.836 191.999 352 199.161 352 207.998C352 216.834 344.836 223.998 336 223.998ZM336 159.999H176C167.164 159.999 160 152.835 160 143.999C160 135.161 167.164 127.999 176 127.999H336C344.836 127.999 352 135.161 352 143.999C352 152.835 344.836 159.999 336 159.999Z"/>
                            <path className={`fill-current ${pathname.includes('/main/demandletter/') ? 'text-indigo-500' : 'text-slate-600'}`} d="M303.156 399.61C289.062 410.595 272.531 416.079 256 416.079S222.938 410.595 208.844 399.61L0 237.152V464C0 490.51 21.492 512 48 512H464C490.508 512 512 490.51 512 464V237.152L303.156 399.61ZM495.922 209.141C508.865 198.938 509.809 178.997 498.311 167.186C496.859 165.694 495.297 164.296 493.625 163.003C481.438 153.386 470.195 144.649 448 128.142V246.422L495.711 209.307C495.781 209.252 495.852 209.198 495.922 209.141ZM256.441 0C256.293 0 256.145 0.002 256 0.004C255.852 0.002 255.707 0 255.559 0C237.117 0 212.594 18.326 194.895 32.004H317.105C299.406 18.326 274.883 0 256.441 0ZM16.289 209.307L64 246.422V128.142C41.805 144.649 30.562 153.386 18.375 163.003C16.703 164.296 15.141 165.694 13.689 167.186C2.191 178.997 3.135 198.938 16.078 209.141C16.148 209.198 16.219 209.252 16.289 209.307ZM176 223.998H336C344.836 223.998 352 216.834 352 207.998C352 199.161 344.836 191.999 336 191.999H176C167.164 191.999 160 199.161 160 207.998C160 216.834 167.164 223.998 176 223.998ZM176 159.999H336C344.836 159.999 352 152.835 352 143.999C352 135.161 344.836 127.999 336 127.999H176C167.164 127.999 160 135.161 160 143.999C160 152.835 167.164 159.999 176 159.999Z"/>
                         </svg>
                            <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-black dark:text-slate-200">
                              Demand Letter
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className=" lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/demandletter/adddemandletter"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/demandletter/adddemandletter') ? 'text-indigo-500' : 'text-slate-400')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Add Demand Letter
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/demandletter/viewdemandletter"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                View Demand Letter
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/demandletter/searchapplicant"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Demand Letter
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup activecondition={pathname === '/main/documentation' || pathname.includes('/main/documentation')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === '/main/documentation/' || pathname.includes('/main/documentation/') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shrink-0 h-7 w-7">
                            <path className={`fill-current ${pathname.includes('/main/documentation/') ? 'text-indigo-300' : 'text-slate-400'}`} d="M480 144V224H147.781C135.656 224 124.578 230.848 119.156 241.688L0 480V80C0 53.492 21.49 32 48 32H208L272 96H432C458.51 96 480 117.492 480 144Z"/>
                            <path className={`fill-current ${pathname.includes('/main/documentation/') ? 'text-indigo-500' : 'text-slate-600'}`} d="M572.578 270.312L476.578 462.312C471.16 473.152 460.078 480 447.961 480H0L119.156 241.688C124.578 230.848 135.656 224 147.781 224H543.961C567.746 224 583.219 249.031 572.578 270.312Z"/>
                          </svg>
                            <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-black dark:text-slate-200">
                              Documentation
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className=" lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/allotmentletter'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/allotmentletter') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Allotment Letter
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/allotmentletter2'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/allotmentletter2') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Allotment Letter 2
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/tcpletter'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/tcpletter') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                T&CP Letter
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/noc'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/noc') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/axis'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/axis') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC Axis Bank
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/canara'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/canara') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC Canara Bank
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/pnb'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/pnb') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC PNB
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/sbi'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/sbi') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC SBI
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/racpcsbi'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/racpcsbi') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC RACPC SBI
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/hdfc'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/hdfc') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC HDFC
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/lic'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/lic') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                NOC LIC
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/possessionletter'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/possessionletter') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Possession Letter
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/documentation/searchapplicant" state={{link:'/main/documentation/upload'}}
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/documentation/upload') ? 'text-indigo-500' : 'text-slate-400 ')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Upload Document
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              
              <SidebarLinkGroup activecondition={pathname === '/main/billing/' || pathname.includes('/main/billing/')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 truncate transition duration-150 ${
                          pathname === '/main/billing/' || pathname.includes('/main/billing/') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="shrink-0 h-7 w-7">
                            <path className={`fill-current ${pathname.includes('/main/billing/') ? 'text-indigo-300' : 'text-slate-400'}`} d="M416 32.004H96C78.328 32.004 64 46.33 64 64.003V246.422L228.469 374.36C244.664 386.956 267.336 386.956 283.531 374.36L448 246.422V64.003C448 46.33 433.672 32.004 416 32.004ZM336 223.998H176C167.164 223.998 160 216.834 160 207.998C160 199.161 167.164 191.999 176 191.999H336C344.836 191.999 352 199.161 352 207.998C352 216.834 344.836 223.998 336 223.998ZM336 159.999H176C167.164 159.999 160 152.835 160 143.999C160 135.161 167.164 127.999 176 127.999H336C344.836 127.999 352 135.161 352 143.999C352 152.835 344.836 159.999 336 159.999Z"/>
                            <path className={`fill-current ${pathname.includes('/main/billing/') ? 'text-indigo-500' : 'text-slate-600'}`} d="M303.156 399.61C289.062 410.595 272.531 416.079 256 416.079S222.938 410.595 208.844 399.61L0 237.152V464C0 490.51 21.492 512 48 512H464C490.508 512 512 490.51 512 464V237.152L303.156 399.61ZM495.922 209.141C508.865 198.938 509.809 178.997 498.311 167.186C496.859 165.694 495.297 164.296 493.625 163.003C481.438 153.386 470.195 144.649 448 128.142V246.422L495.711 209.307C495.781 209.252 495.852 209.198 495.922 209.141ZM256.441 0C256.293 0 256.145 0.002 256 0.004C255.852 0.002 255.707 0 255.559 0C237.117 0 212.594 18.326 194.895 32.004H317.105C299.406 18.326 274.883 0 256.441 0ZM16.289 209.307L64 246.422V128.142C41.805 144.649 30.562 153.386 18.375 163.003C16.703 164.296 15.141 165.694 13.689 167.186C2.191 178.997 3.135 198.938 16.078 209.141C16.148 209.198 16.219 209.252 16.289 209.307ZM176 223.998H336C344.836 223.998 352 216.834 352 207.998C352 199.161 344.836 191.999 336 191.999H176C167.164 191.999 160 199.161 160 207.998C160 216.834 167.164 223.998 176 223.998ZM176 159.999H336C344.836 159.999 352 152.835 352 143.999C352 135.161 344.836 127.999 336 127.999H176C167.164 127.999 160 135.161 160 143.999C160 152.835 167.164 159.999 176 159.999Z"/>
                         </svg>
                            <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-black dark:text-slate-200">
                              Billing
                            </span>
                          </div>
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className=" lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/billing/addbillingreceipt"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (pathname.includes('/main/billing/addbillingreceipt') ? 'text-indigo-500' : 'text-slate-400')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Add Receipt
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/billing/searchapplicant"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                View Receipt
                              </span>
                            </NavLink>
                          </li>
                          <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/main/billing/viewbillingreceipt"
                              className={({ isActive }) =>
                                'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400')
                              }
                            >
                              <span className="text-sm font-medium lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                View Receipt Register
                              </span>
                            </NavLink>
                          </li>
                         
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/main/clientloanfile/') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/main/clientloanfile/searchapplicant"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/main/clientloanfile/') ? 'text-indigo-300' : 'text-slate-400'}`} d="M479.588 320H405.74C450.771 357.695 479.59 414.148 479.59 477.332C479.59 490.07 475.814 501.867 469.592 512H607.592C625.26 512 639.59 497.672 639.59 480C639.59 391.633 567.957 320 479.588 320ZM431.59 256C493.449 256 543.59 205.855 543.59 144S493.449 32 431.59 32C406.482 32 383.549 40.555 364.871 54.512C376.428 76.625 383.59 101.371 383.59 128C383.59 163.523 371.658 196.137 352 222.711C372.303 243.242 400.439 256 431.59 256Z"/>
                      <path className={`fill-current ${pathname.includes('/main/clientloanfile/') ? 'text-indigo-500' : 'text-slate-600'}`} d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Client's Loan File</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/main/projectdocument') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/main/projectdocument"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/main/projectdocument') ? 'text-indigo-300' : 'text-slate-400'}`} d="M479.588 320H405.74C450.771 357.695 479.59 414.148 479.59 477.332C479.59 490.07 475.814 501.867 469.592 512H607.592C625.26 512 639.59 497.672 639.59 480C639.59 391.633 567.957 320 479.588 320ZM431.59 256C493.449 256 543.59 205.855 543.59 144S493.449 32 431.59 32C406.482 32 383.549 40.555 364.871 54.512C376.428 76.625 383.59 101.371 383.59 128C383.59 163.523 371.658 196.137 352 222.711C372.303 243.242 400.439 256 431.59 256Z"/>
                      <path className={`fill-current ${pathname.includes('/main/projectdocument') ? 'text-indigo-500' : 'text-slate-600'}`} d="M224 256C294.695 256 352 198.691 352 128S294.695 0 224 0C153.312 0 96 57.309 96 128S153.312 256 224 256ZM274.664 304H173.336C77.609 304 0 381.602 0 477.332C0 496.477 15.523 512 34.664 512H413.336C432.477 512 448 496.477 448 477.332C448 381.602 370.398 304 274.664 304Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Project Document</span>
                  </div>
                </NavLink>
              </li>
              <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/asset/faq') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/asset/faq"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 640 512">
                      <path className={`fill-current ${pathname.includes('/asset/faq') ? 'text-indigo-300' : 'text-slate-400'}`}  d="M448 0H64C28.625 0 0 28.623 0 63.998V351.99C0 387.363 28.625 415.988 64 415.988H160V499.986C160 509.859 171.25 515.484 179.125 509.609L304 415.988H448C483.375 415.988 512 387.363 512 351.99V63.998C512 28.623 483.375 0 448 0ZM249.999 320C235.375 320 224 308.625 224 294S235.375 268 249.999 268C264.625 268 276 279.375 276 294S264.625 320 249.999 320ZM307.666 203.391L269.334 226.521V228.174C269.334 238.912 260.166 248 249.334 248C238.5 248 229.334 238.912 229.334 228.174V214.957C229.334 208.348 232.666 201.738 239.334 197.607L286.834 169.521C292.666 166.217 296 160.434 296 153.826C296 143.912 287.666 135.652 277.666 135.652H234.334C224.334 135.652 216 143.912 216 153.826C216 164.564 206.834 173.652 196 173.652S176 164.564 176 153.826C176 121.607 201.834 96 234.334 96H277.666C310.166 96 336 121.607 336 153.826C336 173.652 325.166 192.652 307.666 203.391Z"/>
                      <path className={`fill-current ${pathname.includes('/asset/faq') ? 'text-indigo-500' : 'text-slate-600'}`} d="M249.999 268C235.375 268 224 279.375 224 294S235.375 320 249.999 320C264.625 320 276 308.625 276 294S264.625 268 249.999 268ZM277.666 96H234.334C201.834 96 176 121.607 176 153.826C176 164.564 185.166 173.652 196 173.652S216 164.564 216 153.826C216 143.912 224.334 135.652 234.334 135.652H277.666C287.666 135.652 296 143.912 296 153.826C296 160.434 292.666 166.217 286.834 169.521L239.334 197.607C232.666 201.738 229.334 208.348 229.334 214.957V228.174C229.334 238.912 238.5 248 249.334 248C260.166 248 269.334 238.912 269.334 228.174V226.521L307.666 203.391C325.166 192.652 336 173.652 336 153.826C336 121.607 310.166 96 277.666 96Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">FAQs</span>
                  </div>
                </NavLink>
              </li>
              
              </ul></>:''}
              {includesAny(userType,["admin","accounts_employee"])?<><h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Asset</span>
            </h3>
            <ul className="mt-3">
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/festivalpost') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/festivalpost"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 576 512">
                      <path className={`fill-current ${pathname.includes('/festivalpost') ? 'text-indigo-300' : 'text-slate-400'}`} d="M80 352C35.844 352 0 387.844 0 432S35.844 512 80 512S160 476.156 160 432S124.156 352 80 352ZM288 352C243.844 352 208 387.844 208 432S243.844 512 288 512S368 476.156 368 432S332.156 352 288 352ZM496 352C451.844 352 416 387.844 416 432S451.844 512 496 512S576 476.156 576 432S540.156 352 496 352ZM288 0C243.844 0 208 35.844 208 80S243.844 160 288 160S368 124.156 368 80S332.156 0 288 0Z"/>
                      <path className={`fill-current ${pathname.includes('/festivalpost') ? 'text-indigo-500' : 'text-slate-600'}`} d="M176 168C131.844 168 96 203.844 96 248S131.844 328 176 328S256 292.156 256 248S220.156 168 176 168ZM400 168C355.844 168 320 203.844 320 248S355.844 328 400 328S480 292.156 480 248S444.156 168 400 168Z"/>
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Festival Post</span>
                  </div>
                </NavLink>
              </li>
              </ul></>:''}
              
              <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className=" lg:sidebar-expanded:block 2xl:block">Query</span>
            </h3>
            <ul className="mt-3">
            <li onClick={()=>{setSidebarOpen(!sidebarOpen);window.scrollY(0,0)}} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('/ticket/raising') && 'dark:bg-slate-900 bg-slate-200'}`}>
                <NavLink
                  end
                  to="/ticket/raising"
                  className={`block text-black dark:text-slate-200 truncate transition duration-150 ${
                    pathname.includes('inbox') ? 'hover:text-slate-200' : 'dark:hover:text-white'
                    }`}
                >
                  <div className="flex items-center">
                    
                    
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-7 w-7" viewBox="0 0 576 512">
                      <path className={`fill-current ${pathname.includes('/ticket/raising') ? 'text-indigo-300' : 'text-slate-400'}`} d="M128 352.001H448V160.001H128V352.001ZM576 208.001V112.001C576 85.501 554.5 64.001 528 64.001H48C21.5 64.001 0 85.501 0 112.001V208.001C26.5 208.001 48 229.501 48 256.001S26.5 304.001 0 304.001V400.001C0 426.501 21.5 448.001 48 448.001H528C554.5 448.001 576 426.501 576 400.001V304.001C549.5 304.001 528 282.501 528 256.001S549.5 208.001 576 208.001ZM480 360.001C480 373.251 469.25 384.001 456 384.001H120C106.75 384.001 96 373.251 96 360.001V152.001C96 138.751 106.75 128.001 120 128.001H456C469.25 128.001 480 138.751 480 152.001V360.001Z"/>
                      <path className={`fill-current ${pathname.includes('/ticket/raising') ? 'text-indigo-500' : 'text-slate-600'}`} d="M456 128H120C106.75 128 96 138.75 96 152V360C96 373.25 106.75 384 120 384H456C469.25 384 480 373.25 480 360V152C480 138.75 469.25 128 456 128ZM448 352H128V160H448V352Z" /></svg>
                    <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Ticket Raising</span>
                  </div>
                </NavLink>
              </li>
              </ul>
              
          </div>
        </div>
        
        <span className='w-full h-[1px] bg-white mt-7'></span>
         <p className='text-center text-base'>Developed & Designed By</p>
         <p className='text-center text-base'>Sujeet Govindani</p>
         <p className='text-center text-base'>2024 All copyrights reserved</p>
         <a href="https://govindaniit.com" target='_blank' className='text-center text-base text-blue-700'>govindaniit.com</a>
      </div>
    </div>
  );
}

export default Sidebar;
