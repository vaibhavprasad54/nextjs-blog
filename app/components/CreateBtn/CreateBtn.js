import React from 'react'

const CreateBtn = ({ handleOpenModal }) => {


  return (
    <div className='btn-section'>
      <button 
        onClick={handleOpenModal}
        className='flex items-center justify-start sm:justify-center gap-2 bg-[#7770e0] text-white py-2 px-4 rounded-[7px]'>
        Create
      </button>
    </div>
  )
}

export default CreateBtn