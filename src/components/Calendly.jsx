import React from 'react'
import { InlineWidget } from "react-calendly";

const Calendly = () => {
    

  return (
    <>
      <div className='conatiner'>
        <InlineWidget styles={{
          padding: '10px',
          height: '1000px',    
        }}
        url="https://calendly.com/autocarest/citaprogramada" />
      </div>
    </>
  )
}

export default Calendly
