import "./Like_T.css"
import DogCard from "../Dog";
import { dogs } from "../../app/data";

function Like_T() {

  return (
    <div className="like-t-container" style={{minHeight: '100%', overflowY: 'auto'}}>
      {/* 헤더 */}
      <header className="like-t-header">
        <div className="like-t-header-content">
          <h1>발도장</h1>
          <h2>나의 발도장이 머물렀던 댕댕이들</h2>
        </div>
      </header>
      <main className="like-t-main-content">

        {/* 일단 임시보호 데이터 넣어둠 */}
        <div className="like-t-dogs-grid">
          {dogs.map((dog, index) => (
            <DogCard key={index} dog={dog} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Like_T

