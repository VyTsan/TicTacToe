var boxes = document.querySelectorAll('.box');
const resBtn = document.querySelector('button');
const result = document.querySelector('#result');
const boardEle = document.querySelector('#board');

let p1 = 'x';
let p2 = 'o';
let currentPlayer = p1;
let winner = null;
let isGameEnded = false;
result.innerText = `${currentPlayer.toUpperCase()}'s turn...`;
let svgArr = [
  //Horizontal-123
  `<svg id="overlay-svg">
  <line x1="30" y1="50" x2="270" y2="50" style="stroke:red;stroke-width:9"/>
  <circle cx="30" cy="50" r="4.5" fill="red" />
  <circle cx="270" cy="50" r="4.5" fill="red" />
  </svg> `,
  `<svg id="overlay-svg">
  <line x1="30" y1="150" x2="270" y2="150" style="stroke:red;stroke-width:9"/>
  <circle cx="30" cy="150" r="4.5" fill="red" />
  <circle cx="270" cy="150" r="4.5" fill="red" />
  </svg> `,
  `<svg id="overlay-svg">
  <line x1="30" y1="250" x2="270" y2="250" style="stroke:red;stroke-width:9"/>
  <circle cx="30" cy="250" r="4.5" fill="red" />
  <circle cx="270" cy="250" r="4.5" fill="red" />
  </svg> `,
  //Vertical-123
  `<svg id="overlay-svg">
  <line x1="50" y1="30" x2="50" y2="270" style="stroke:red;stroke-width:9"/>
  <circle cx="50" cy="30" r="4.5" fill="red" />
  <circle cx="50" cy="270" r="4.5" fill="red" />
  </svg> `,
  `<svg id="overlay-svg">
  <line x1="150" y1="30" x2="150" y2="270" style="stroke:red;stroke-width:9"/>
  <circle cx="150" cy="30" r="4.5" fill="red" />
  <circle cx="150" cy="270" r="4.5" fill="red" />
  </svg> `,
  `<svg id="overlay-svg">
  <line x1="250" y1="30" x2="250" y2="270" style="stroke:red;stroke-width:9"/>
  <circle cx="250" cy="30" r="4.5" fill="red" />
  <circle cx="250" cy="270" r="4.5" fill="red" />
  </svg> `,
  //Diagonal-12
  `<svg id="overlay-svg">
  <line x1="30" y1="30" x2="270" y2="270" style="stroke:red;stroke-width:9"/>
  <circle cx="30" cy="30" r="4.5" fill="red" />
  <circle cx="270" cy="270" r="4.5" fill="red" />
  </svg> `,
  `<svg id="overlay-svg">
  <line x1="270" y1="30" x2="30" y2="270" style="stroke:red;stroke-width:9"/>
  <circle cx="270" cy="30" r="4.5" fill="red" />
  <circle cx="30" cy="270" r="4.5" fill="red" />
  </svg> `,
  ''
];

boxes.forEach(box => {
  box.addEventListener('click', () => {
    nextMove(box);
  })
  box.classList.toggle('available');
});

function isAvailable(box) {
  if (box.innerText == '') {
    return true;   
  } else {
    return false;
  }
}

function nextMove(box) {
  if (isGameEnded == false) {
    if (isAvailable(box)) {
      box.innerText = currentPlayer;
      box.classList.add(`${currentPlayer}`);
      box.classList.remove('available');
      if (currentPlayer == p1) {
        currentPlayer = p2;
      } else {
        currentPlayer = p1;
      }
      result.innerText = `${currentPlayer.toUpperCase()}'s turn...`;
      checkWinner();
    }
  } 
}

function endGame(caseNum) {
  isGameEnded = true;
  if (winner == 'tie') {
    result.innerText = `It's a tie!`;
  } else {
    result.innerText = `${winner.toUpperCase()} won!`;
  }
  boardEle.innerHTML += svgArr[caseNum];
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  // horizontal
  for (let i = 0; i <= 6; i+=3) {
    if (equals3(boxes[i].innerText, boxes[i+1].innerText, boxes[i+2].innerText)) {
      winner = boxes[i].innerText;
      endGame(i/3);
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(boxes[i].innerText, boxes[i+3].innerText, boxes[i+6].innerText)) {
      winner = boxes[i].innerText;
      endGame(i+3);
    }
  }

  // Diagonal
  if (equals3(boxes[0].innerText, boxes[4].innerText, boxes[8].innerText)) {
    winner = boxes[0].innerText;
    endGame(6);
  }
  if (equals3(boxes[2].innerText, boxes[4].innerText, boxes[6].innerText)) {
    winner = boxes[2].innerText;
    endGame(7);
  }

  let openSpots = 0;
  boxes.forEach(box => { 
    if (box.innerText == '') {
      openSpots++;
    }
  });

  if (winner == null && openSpots == 0) {
    winner = 'tie';
    endGame(8);
  }
  if (isGameEnded) {
    boxes.forEach(box => {
      box.classList.remove('available');
    })
    resBtn.classList.add('sexy');
  }
}

resBtn.addEventListener('click', () => {
  const svgEle = document.querySelector('#overlay-svg');
  if (svgEle) svgEle.remove();
  generateBoxes();
  console.log(boxes);
  boxes.forEach(box => {
    console.log(box.innerText);
    box.innerText = '';
    box.classList.remove(p1,p2);
    box.classList.add('available');
  });
  currentPlayer = p1;
  winner = null;
  isGameEnded = false;
  resBtn.classList.remove('sexy');
  result.innerText = `${currentPlayer.toUpperCase()}'s turn...`;
});

function generateBoxes() {
  boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.addEventListener('click', () => {
      nextMove(box);
    })
    box.classList.toggle('available');
  });
}
