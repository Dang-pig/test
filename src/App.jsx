import { useState, useEffect } from 'react'
import './App.css'

const rowNum = 100, colNum = 100;
let currentX = 0, currentY = 0, accX = 0, accY = 0;

function App() {
  const [reload, doReload] = useState({});

  useEffect(() => {
    const addAcc = function (evt) {
      const k = evt.key;
      switch (k) {
        case "ArrowUp":
          accY = -1;
          break;
        case "ArrowDown":
          accY = 1;
          break;
        case "ArrowLeft":
          accX = -1;
          break;
        case "ArrowRight":
          accX = 1;
          break;
      }
    }

    const removeAcc = function (evt) {
      const k = evt.key;
      switch (k) {
        case "ArrowUp":
          accY = 0;
          break;
        case "ArrowDown":
          accY = 0;
          break;
        case "ArrowLeft":
          accX = 0;
          break;
        case "ArrowRight":
          accX = 0;
          break;
      }
    }

    let inter = setInterval(() => {
      currentX = (currentX + accX + colNum) % colNum;
      currentY = (currentY + accY + rowNum) % rowNum;
      doReload({});
    }, 1);

    document.addEventListener("keydown", addAcc);
    document.addEventListener("keyup", removeAcc);

    return (() => { document.removeEventListener("keydown", addAcc), document.removeEventListener("keyup", removeAcc) });
  });

  let table = [];
  for (let i = 0; i < rowNum; i++) {
    let row = [];
    for (let j = 0; j < colNum; j++) row.push((i == currentY && j == currentX ? 'current' : ((i + j) % 1 != 0 ? 'black' : 'white')));
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
                <div key={ind} className={cl} style={{ width: "5px", height: "5px", }}></div>
              ))}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
