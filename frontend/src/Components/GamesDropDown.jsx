import React from 'react'
import { Link } from 'react-router-dom'

const GamesDropDown = () => {
  return (
    <div>
        <Link to="/crashgame" style={{textDecoration:"none", color:"white"}}><div className='dropdown-item' >Crash Game</div></Link>
        <div className='dropdown-item' >DropDown</div>
        <div className='dropdown-item' >DropDown</div>
    </div>
  )
}

export default GamesDropDown