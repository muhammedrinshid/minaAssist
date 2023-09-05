import React from 'react'
import { Link } from 'react-router-dom'
import panda404 from '../assets/panda404.png'

const NotFound = () => {
  return (
    <div class="page__not__found__container">
        <img src={panda404}/>
        <h1>ERROR 404...!</h1>
        <h3>unable to find the page</h3>
        <Link to="/" class="more">Home</Link>
    </div>
  )
}

export default NotFound