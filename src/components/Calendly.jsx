import React from 'react'
import { InlineWidget } from "react-calendly";

const Calendly = () => {
    

  return (
    <>
      <div className='conatiner'>
        <InlineWidget styles={{
          height: '800px',
          width: '100%',

        }}
        url="https://calendly.com/autocarest/citaprogramada" />
      </div>
    </>
  )
}

export default Calendly
