"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./BottomNavigation.css"
import { supabase } from "../../lib/supabaseClient"

function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation() // ✅ 현재 경로 가져오기
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // ✅ 로그인 상태 확인 (Supabase 세션 기반)
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
    console.log("현재 로그인 상태:", isLoggedIn) // 🔥 디버깅용 로그

    if (!isLoggedIn) {
      console.log("로그인 필요! 인트로 페이지로 이동")
      navigate("/IntroPage")
      return
    }

    switch (item) {
      case "예약하기":
        navigate("/")
        break
      case "예약내역":
        navigate("/ReservationPage")
        break
      case "라이브":
        navigate("/LivePage")
        break
      case "발도장":
        navigate("/LikePage")
        break
      case "프로필":
        navigate("/ProfilePage")
        break
    }
  }

  const menuItems = [
    { name: "예약하기", path: "/", icon: "/bottomnavigationicons/booking.png" },
    { name: "예약내역", path: "/ReservationPage", icon: "/bottomnavigationicons/history.png" },
    { name: "라이브", path: "/LivePage", icon: "/bottomnavigationicons/live.png" },
    { name: "발도장", path: "/LikePage", icon: "/bottomnavigationicons/paw.png" },
    { name: "프로필", path: "/ProfilePage", icon: "/bottomnavigationicons/profile.png" },
  ]

  return (
    <div className="bottom-navigation">
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`nav-item ${
            (
              item.name === "예약내역" &&
                (location.pathname === "/ReservationPage" ||
                  location.pathname === "/LastPage" ||
                  location.pathname === "/Reservation1Page" ||
                  location.pathname === "/Reservation2Page")
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

export default BottomNavigation