import { useState, useEffect } from 'react'
import './App.css'

const rowNum = 32, colNum = 32;
let currentX = 0, currentY = 0;

function App() {
  const [reload, doReload] = useState({});

  useEffect(() => {
    document.addEventListener("keyup",
      (evt) => {
        const k = evt.key;
        console.log(k);
        switch (k) {
          case "ArrowUp":
            currentY = (currentY + rowNum - 1) % rowNum;
            break;
          case "ArrowDown":
            currentY = (currentY + 1) % rowNum;
            break;
          case "ArrowLeft":
            currentX = (currentX + rowNum - 1) % rowNum;
            break;
          case "ArrowRight":
            currentX = (currentX + 1) % rowNum;
            break;
        }
        doReload({});
      }
    )

    return (() => { document.removeEventListener("keyup", document.removeEventListener)});
  });

  let table = [];
  for (let i = 0; i < rowNum; i++) {
    let row = [];
    for (let j = 0; j < colNum; j++) row.push((i == currentY && j == currentX ? 'current' : ((i + j) % 2 != 0 ? 'black' : 'white')));
    table.push(row);
  }

  return (
    <>
      <div style={{
        display: 'flex', flexDirection: 'column',
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}>
        {
          table.map((rowArr, ind) => (
            <div key={ind} style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              {rowArr.map((cl, ind) => (
                <div key={ind} className={cl} style={{ width: "30px", height: "30px", }}></div>
              ))}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
