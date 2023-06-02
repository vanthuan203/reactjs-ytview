import React, { useState,useRef, useEffect, } from 'react'
import {Link, useParams} from 'react-router-dom'
export function Video() {
  // @ts-ignore
  let {videoId}  = useParams();
    return (
      <div >
          <iframe
              width="300"
              height="auto"
              src={`https://www.youtube.com/embed/`+videoId+'?autoplay=1'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="Embedded youtube"
          />
      </div>
  )
}
