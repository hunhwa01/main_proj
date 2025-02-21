import React from "react";
import "./WalkEndPopup.css";

function WalkEndPopup({ message, onConfirm, onCancel }) {
  return (
    <div className="walkend-popup-overlay">
      <div className="walkend-popup">
        <p className="walkend-popup-message">{message}</p>
        <div className="walkend-popup-buttons">
          <button className="walkend-popup-button" onClick={onConfirm}>예</button>
          <button className="walkend-popup-button cancel" onClick={onCancel}>아니요</button>
        </div>
      </div>
    </div>
  );
}

export default WalkEndPopup;