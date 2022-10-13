import React from 'react'

function cards(props) {
  return (
    <div>
        <img src={props.img}></img>
        <p>{props.title}</p>
    </div>
  )
}

export default cards