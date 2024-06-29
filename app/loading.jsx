import { MdMargin } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const override = {
    display: 'block',
    margin: '100px auto'
}

const LoadingPage = ({loading}) => {
  return (
    <ClipLoader 
        color="#3b82f6"    
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
    />
  )
}

export default LoadingPage;