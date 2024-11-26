import { useState, useEffect } from 'react'
import './App.css'

let current = [], currentX = 4, currentY = 0, accX = 0, accY = 0, snakelength = 1;
for(let x = 0; x < snakelength; x++) current.push([0, x]);
setRandomApple(50, 50);

let lp = 0, rp = 0, up = 0, dp = 0;

function max(a, b){
  return (a > b ? a : b);
}

function min(a, b){
  return (a > b ? b : a);
}

function ch(i, j){
  for(let x = 0; x < current.length; x++) if(i == current[x][1] && j == current[x][0]) return true;
  return false;
}

function setRandomApple(rowNum, colNum){
  let appleX, appleY;
  do{
    appleX = Math.round(Math.random() * rowNum);
    appleY = Math.round(Math.random() * colNum);
  }
  while(ch(appleX, appleY));

  return [appleX, appleY];
}

function App() {
  const [reload, doReload] = useState({});
  const [rowcol, setRowCol] = useState([55, 55]);
  const [apple, setApple] = useState(setRandomApple(rowcol[0], rowcol[1]));

  const rowNum = rowcol[0], colNum = rowcol[1];

  useEffect(() => {
    const addAcc = function (evt) {
      const k = evt.key;
      switch (k) {
        case "ArrowUp":
          up = 1;
          break;
        case "ArrowDown":
          dp = 1;
          break;
        case "ArrowLeft":
          lp = 1;
          break;
        case "ArrowRight":
          rp = 1;
          break;
      }
    }

    const removeAcc = function (evt) {
      const k = evt.key;
      switch (k) {
        case "ArrowUp":
          up = 0;
          break;
        case "ArrowDown":
          dp = 0;
          break;
        case "ArrowLeft":
          lp = 0;
          break;
        case "ArrowRight":
          rp = 0;
          break;
      }
    }

    let inter = setInterval(() => {
      // console.log(rowNum);
      // console.log(colNum);

      accX = rp - lp;
      accY = dp - up;

      if (rowNum != 0 && colNum != 0) {
        currentX = (currentX + accX + colNum) % colNum;
        currentY = (currentY + accY + rowNum) % rowNum;
        if(currentX == apple[0] && currentY == apple[1]){
          snakelength++;
          setApple(setRandomApple(rowcol[0], rowcol[1]));
        }
        else current.shift();
        current.push([currentX, currentY]);
        doReload({});
      }
    }, 20);

    document.addEventListener("keydown", addAcc);
    document.addEventListener("keyup", removeAcc);

    return (() => { document.removeEventListener("keydown", addAcc), document.removeEventListener("keyup", removeAcc), clearInterval(inter) });
  });

  let table = [];
  for (let i = 0; i < rowNum; i++) {
    let row = [];
    for (let j = 0; j < colNum; j++) row.push((ch(i, j)) ? 'current' : ((i == apple[1] && j == apple[0]) ? 'apple' : 'white'));
    table.push(row);
  }

  return (
    <>
      {/* <div style={{
        margin: "2rem",
      }}>
        <h3>Row number (5 - 100): </h3><input type="number" onChange={(e) => { setRowCol([e.target.value !== "" ? max(min(parseInt(e.target.value), 50), 5) : 5, colNum]) }} id='rowNumInput' />
        <h3>Column number (5 - 100): </h3><input type="number" onChange={(e) => { setRowCol([rowNum, e.target.value !== "" ? max(min(parseInt(e.target.value), 50), 5) : 0]) }} id='colNumInput' />
      </div> */}
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
                <div key={ind} className={cl} style={{ width: "10px", height: "10px", }}></div>
              ))}
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
