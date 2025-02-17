import React from 'react'
import Reservation_T from '../components/Reservation_T'
import BottomNavigation_T from '../components/BottomNavigation_T'

function Reservation_TPage() {
  return (
    <div>
      <div className="content-wrapper">
        <Reservation_T/>
      </div>
      <BottomNavigation_T/>
    </div>
  )
}

export default Reservation_TPage
