import { useState, useEffect, cloneElement } from 'react'
import './App.css'

const rowcol = [50, 50];

let current = [], currentX = 4, currentY = 0, accX = 0, accY = 0, snakelength = 1;

let snake = [];
let r = [];
for (let i = 0; i < rowcol[0]; i++) r.push(0);
// console.log(r);
for (let i = 0; i < rowcol[1]; i++) {
  // console.log(r);
  snake.push(r.slice());
}
// console.log(snake);

current.push([0, 0]);
snake[0][0] = 1;

let Apple = setRandomApple();

let lp = 0, rp = 0, up = 0, dp = 0;

function max(a, b) {
  return (a > b ? a : b);
}

function min(a, b) {
  return (a > b ? b : a);
}

function ch(i, j) {
  // console.log(i + " " + j);

  return snake[i][j] != 0;
}

function setRandomApple() {
  let appleX, appleY;
  do {
    appleX = Math.round(Math.random() * rowcol[0]);
    appleY = Math.round(Math.random() * rowcol[1]);
    // console.log(snake[appleX][appleY]);
  }
  while (snake[appleX][appleY] != 0);

  return [appleX, appleY];
}

function App() {
  const rowNum = rowcol[0], colNum = rowcol[1];
  const [apple, setApple] = useState(Apple);

  const [reload, doReload] = useState({});

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

      if (rowcol[0] != 0 && rowcol[1] != 0) {
        currentX = (currentX + accX + colNum) % rowcol[0];
        currentY = (currentY + accY + rowNum) % rowcol[1];
        if (currentX == apple[0] && currentY == apple[1]) {
          snakelength++;
          Apple = setRandomApple();
          setApple(Apple);
        }
        else {
          snake[current[0][1]][current[0][0]]--;
          if (current.length >= 1) current.shift();
        }
        current.push([currentX, currentY]);
        snake[currentY][currentX]++;
        doReload({});
      }
    }, 1);

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
      <div style={{
        margin: "2rem",
      }}>
        {/* <h3>Row number (5 - 100): </h3><input type="number" onChange={(e) => { setRowCol([e.target.value !== "" ? max(min(parseInt(e.target.value), 50), 5) : 5, colNum]) }} id='rowNumInput' />
        <h3>Column number (5 - 100): </h3><input type="number" onChange={(e) => { setRowCol([rowNum, e.target.value !== "" ? max(min(parseInt(e.target.value), 50), 5) : 0]) }} id='colNumInput' /> */}
        <h1>Score: {snakelength}</h1>
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
