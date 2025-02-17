"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabaseClient"
import "./MyProfile.css"

function MyProfile() {
  const navigate = useNavigate()
  const [userId, setUserId] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("") // Added nickname state
  const [isPhoneEditable, setIsPhoneEditable] = useState(false)
  const [isAddressEditable, setIsAddressEditable] = useState(false)
  const [isEmailEditable, setIsEmailEditable] = useState(false)
  const [isNicknameEditable, setIsNicknameEditable] = useState(false) // Added nickname editability state
  const [originalNickname, setOriginalNickname] = useState("")
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState("")
  const [originalAddress, setOriginalAddress] = useState("")
  const [originalEmail, setOriginalEmail] = useState("")

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id")
    if (storedUserId) {
      setUserId(storedUserId)
      fetchUserInfo(storedUserId)
    }
  }, [])

  const fetchUserInfo = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("phone_number, address, email, nickname") // Updated to include nickname
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error fetching user info:", error)
    } else if (data) {
      setPhoneNumber(data.phone_number || "")
      setAddress(data.address || "")
      setEmail(data.email || "")
      setNickname(data.nickname || "") // Added nickname update
      setOriginalNickname(data.nickname || "")
      setOriginalPhoneNumber(data.phone_number || "")
      setOriginalAddress(data.address || "")
      setOriginalEmail(data.email || "")
    }
  }

  const handleBackClick = () => {
    navigate("/ProfilePage")
  }

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleNicknameChange = (e) => {
    // Added nickname change handler
    setNickname(e.target.value)
  }

  const togglePhoneEdit = () => {
    if (isPhoneEditable) {
      setPhoneNumber(originalPhoneNumber)
    }
    setIsPhoneEditable(!isPhoneEditable)
  }

  const toggleAddressEdit = () => {
    if (isAddressEditable) {
      setAddress(originalAddress)
    }
    setIsAddressEditable(!isAddressEditable)
  }

  const toggleEmailEdit = () => {
    if (isEmailEditable) {
      setEmail(originalEmail)
    }
    setIsEmailEditable(!isEmailEditable)
  }

  const toggleNicknameEdit = () => {
    // Added nickname edit toggle
    if (isNicknameEditable) {
      setNickname(originalNickname)
    }
    setIsNicknameEditable(!isNicknameEditable)
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        nickname: nickname, // Added nickname update
        phone_number: phoneNumber,
        address: address,
        email: email,
      })
      .eq("user_id", userId)

    if (error) {
      console.error("Error updating user info:", error)
      alert("정보 업데이트에 실패했습니다.")
    } else {
      alert("정보가 성공적으로 업데이트되었습니다.")
      setIsNicknameEditable(false) // Added reset for nickname editability
      setIsPhoneEditable(false)
      setIsAddressEditable(false)
      setIsEmailEditable(false)
      setOriginalNickname(nickname)
      setOriginalPhoneNumber(phoneNumber)
      setOriginalAddress(address)
      setOriginalEmail(email)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error logging out:", error)
      alert("로그아웃에 실패했습니다.")
    } else {
      localStorage.removeItem("token")
      navigate("/IntroPage") // Adjust this to your login page route
    }
  }

  return (
    <div className="myprofile-container" style={{ height: "100%", overflowY: "auto" }}>
      {/* 헤더 (고정) */}
      <header className="myprofile-header">
        <div className="myprofile-header-content">
          <img src="/icons/back.png" alt="뒤로가기" className="myprofile-back-icon" onClick={handleBackClick} />
          <div className="myprofile-title-container">
            <h1>
              {nickname}님, {/* Updated to display nickname */}
              <br />
              안녕하세요!
            </h1>
            <img src="/dogprofile/dog.jpg" alt="프로필 아바타" className="myprofile-avatar-icon" />
          </div>
        </div>
      </header>

      {/* 스크롤 가능한 컨테이너 */}
      <div className="myprofile-scrollable-container">
        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">아이디</span>
            <div className="myprofile-input-button-container">
              <input type="text" className="myprofile-input" value={userId} readOnly />
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          {" "}
          {/* Added nickname section */}
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">닉네임</span>
            <div className="myprofile-input-button-container">
              <input
                type="text"
                className="myprofile-input"
                value={nickname}
                onChange={handleNicknameChange}
                readOnly={!isNicknameEditable}
              />
              <button className="myprofile-change-button" onClick={toggleNicknameEdit}>
                {isNicknameEditable ? "취소" : "닉네임변경"}
              </button>
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">휴대폰 번호</span>
            <div className="myprofile-input-button-container">
              <input
                type="tel"
                className="myprofile-input"
                value={phoneNumber}
                onChange={handlePhoneChange}
                readOnly={!isPhoneEditable}
              />
              <button className="myprofile-change-button" onClick={togglePhoneEdit}>
                {isPhoneEditable ? "취소" : "번호변경"}
              </button>
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">내 주소</span>
            <div className="myprofile-input-button-container">
              <input
                type="text"
                className="myprofile-input"
                value={address}
                onChange={handleAddressChange}
                readOnly={!isAddressEditable}
              />
              <button className="myprofile-change-button" onClick={toggleAddressEdit}>
                {isAddressEditable ? "취소" : "주소변경"}
              </button>
            </div>
          </div>
        </div>

        <div className="myprofile-info-section">
          <div className="myprofile-info-item">
            <span className="myprofile-info-label">이메일</span>
            <div className="myprofile-input-button-container">
              <input
                type="email"
                className="myprofile-input"
                value={email}
                onChange={handleEmailChange}
                readOnly={!isEmailEditable}
              />
              <button className="myprofile-change-button" onClick={toggleEmailEdit}>
                {isEmailEditable ? "취소" : "이메일변경"}
              </button>
            </div>
          </div>
        </div>

        <button className="myprofile-save-button" onClick={handleSave}>
          저장
        </button>
        <button className="myprofile-logout-button" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyProfile

