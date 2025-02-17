import React from 'react'
import Profile_T from '../components/Profile_T'
import BottomNavigation_T from '../components/BottomNavigation_T'

function Profile_TPage() {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <Profile_T/>
      </div>
      <BottomNavigation_T/>
    </div>
  )
}

export default Profile_TPage