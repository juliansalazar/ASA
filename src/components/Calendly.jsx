import React from 'react'
import { InlineWidget } from "react-calendly";

const Calendly = () => {
    

  return (
    <>
      <div className='conatiner'>
        <InlineWidget styles={{
          height: '900px',
          width: '100%',

        }}
        url="https://calendly.com/autocarest/citaprogramada" />
      </div>
    </>
  )
}

export default Calendly
