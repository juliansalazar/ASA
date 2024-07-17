import React from 'react'
import ReactPlayer from 'react-player'

const HomeVideo = () => {
  return (
    <div>
      <ReactPlayer url='https://www.youtube.com/watch?v=Yeb7zft_79k'
      muted={false}
      playing={true}
      width='100%'
      />
    </div>
  )
}

export default HomeVideo
