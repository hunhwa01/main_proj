import React from 'react'
import Reservation1 from '../components/Reservation1'
import BottomNavigation from '../components/BottomNavigation'

function Reservation1Page() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <Reservation1/>
      </div>
      <BottomNavigation/>
    </div>
  )
}

export default Reservation1Page
