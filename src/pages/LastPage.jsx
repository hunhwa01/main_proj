import React from 'react'
import Last from '../components/Last'
import BottomNavigation from '../components/BottomNavigation'

function LastPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <Last/>
      </div>
      <BottomNavigation/>
    </div>
  )
}

export default LastPage
