import React from 'react'
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
        <div className='flex items-center flex-col'>
          <Oval
          visible={true}
          height="60"
          width="60"
          color="#8c6bec"
          secondaryColor="#d5c8ff"
          ariaLabel="oval-loading"
          wrapperStyle={{ marginBottom: "1rem" }}
          wrapperClass=""
        />
        <p>Loading...</p>
        </div>
  )
}

export default Loader