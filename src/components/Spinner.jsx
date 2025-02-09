import { RotateLoader } from "react-spinners"


export default function Spinner() {
  return (
	<div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
	<RotateLoader
	color={"rgb(67 56 202)"}
	loading={true}
	// cssOverride={override}
	size={15}
	aria-label="Loading Spinner"
	data-testid="loader"
	/>
	</div>
  )
}
