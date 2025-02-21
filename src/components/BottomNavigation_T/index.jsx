"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./BottomNavigation_T.css"
import { supabase } from "../../lib/supabaseClient"

function BottomNavigation_T() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("🚨 세션 가져오기 실패:", error.message)
        setIsLoggedIn(false)
        return
      }

      if (session) {
        console.log("✅ 로그인된 사용자 정보:", session.user)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    checkSession()
  }, [])

  const handleClick = (item) => {
    console.log("현재 로그인 상태:", isLoggedIn)

    if (!isLoggedIn) {
      console.log("로그인 필요! 인트로 페이지로 이동")
      navigate("/IntroPage")
      return
    }

    switch (item) {
      case "예약하기":
        navigate("/Main_TPage")
        break
      case "예약내역":
        navigate("/Reservation_TPage")
        break
      case "라이브":
        navigate("/Live_TPage")
        break
      case "발도장":
        navigate("/Like_TPage")
        break
      case "프로필":
        navigate("/Profile_TPage")
        break
    }
  }

  const menuItems = [
    { name: "예약하기", path: "/Main_TPage", icon: "/bottomnavigationicons/booking.png" },
    { name: "예약내역", path: "/Reservation_TPage", icon: "/bottomnavigationicons/history.png" },
    { name: "라이브", path: "/Live_TPage", icon: "/bottomnavigationicons/live.png" },
    { name: "발도장", path: "/Like_TPage", icon: "/bottomnavigationicons/paw.png" },
    { name: "프로필", path: "/Profile_TPage", icon: "/bottomnavigationicons/profile.png" },
  ]

  return (
    <div className="bottom-navigation">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`nav-item ${
            // 예약내역 메뉴의 경우 Reservation_TPage와 Last_TPage 모두에서 active 상태 유지
            (
              item.name === "예약내역" &&
                (location.pathname === "/Reservation_TPage" || location.pathname === "/Last_TPage")
            ) || location.pathname === item.path
              ? "active"
              : ""
          }`}
          onClick={() => handleClick(item.name)}
        >
          <img src={item.icon || "/placeholder.svg"} alt={item.name} className="nav-icon" />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  )
}

export default BottomNavigation_T