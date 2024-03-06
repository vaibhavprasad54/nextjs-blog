import React from 'react'
import { Oval } from "react-loader-spinner";

const Loader = ({ height, width }) => {
  return (
        <div className='flex items-center flex-col'>
          <Oval
          visible={true}
          height={height}
          width={width}
          color="#7770e0"
          secondaryColor="#d5c8ff"
          ariaLabel="oval-loading"
          // wrapperStyle={{ marginBottom: "1rem" }}
          wrapperClass=""
        />
        {/* <p>Loading...</p> */}
        </div>
  )
}

export default Loader