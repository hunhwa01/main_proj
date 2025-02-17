import React from 'react'
import Like_T from '../components/Like_T'
import BottomNavigation_T from '../components/BottomNavigation_T'

function Like_TPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <Like_T/>
      </div>
      <BottomNavigation_T/>
    </div>
  )
}

export default Like_TPage
