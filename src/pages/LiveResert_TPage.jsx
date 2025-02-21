import React from 'react'
import LiveResert_T from '../components/LiveResert_T'
import BottomNavigation_T from '../components/BottomNavigation_T'

function LiveResert_TPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <LiveResert_T/>
      </div>
      <BottomNavigation_T/>
    </div>
  )
}

export default LiveResert_TPage