import axios from "axios";
import { baseURL } from "./Constant";

const accessToken=localStorage.getItem("access_token");
let cancelTokenSource = null;

const Axios = axios.create({
	baseURL:baseURL,
	// headers:{
	// 	Authorization: `Bearer ${accessToken}`
	// }
})

// Axios.interceptors.request.use((config) => {
// 	if (cancelTokenSource) {
// 	  cancelTokenSource.cancel();
// 	}
  
// 	cancelTokenSource = axios.CancelToken.source();
// 	config.cancelToken = cancelTokenSource.token;
  
// 	return config;
//   });
  
//   Axios.cancelRequest = () => {
// 	if (cancelTokenSource) {
// 	  cancelTokenSource.cancel();
// 	}
//   };


  export default Axios;
