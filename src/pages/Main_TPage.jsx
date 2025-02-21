import React from 'react'
import Main_T from '../components/Main_T'
import BottomNavigation_T from '../components/BottomNavigation_T'

function Main_TPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <Main_T/>
      </div>
      <BottomNavigation_T/>
    </div>
  )
}

export default Main_TPage