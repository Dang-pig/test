import { useState, useEffect } from 'react'
import './App.css'

let currentX = 0, currentY = 0, accX = 0, accY = 0;

function App() {
  const [reload, doReload] = useState({});
  const [rowcol, setRowCol] = useState([50, 50]);

  const rowNum = rowcol[0], colNum = rowcol[1];

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
      // console.log(rowNum);
      // console.log(colNum);
      
      if(rowNum != 0 && colNum != 0){
        currentX = (currentX + accX + colNum) % colNum;
        currentY = (currentY + accY + rowNum) % rowNum;
        doReload({});
      }
    }, 10);

    document.addEventListener("keydown", addAcc);
    document.addEventListener("keyup", removeAcc);

    return (() => { document.removeEventListener("keydown", addAcc), document.removeEventListener("keyup", removeAcc), clearInterval(inter)});
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
        margin: "2rem",
      }}>
        <h3>Row number: </h3><input type="number" value={parseInt(rowNum)} onChange={(e) => {setRowCol([e.target.value !== "" ? parseInt(e.target.value) : 0, colNum])}} id='rowNumInput'/>
        <h3>Column number: </h3><input type="number" value={parseInt(colNum)} onChange={(e) => {setRowCol([rowNum, e.target.value !== "" ? parseInt(e.target.value) : 0])}} id='colNumInput'/>
      </div>
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
