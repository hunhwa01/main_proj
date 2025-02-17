import "./Like.css"
import DogCard from "../Dog";
import { dogs } from "../../app/data";

function Like() {

  return (
    <div className="like-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="like-header">
        <div className="like-header-content">
          <h1>발도장</h1>
          <h2>나의 발도장이 머물렀던 댕댕이들</h2>
        </div>
      </header>
      <main className="like-main-content">

        {/* 일단 임시보호 데이터 넣어둠 */}
        <div className="like-dogs-grid">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Like

