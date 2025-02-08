let boxes = document.querySelectorAll(".box"); //select all box 
let resetBtn = document.querySelector("#reset-btn"); //select reset button
let newGameBtn = document.querySelector("#new-btn"); //select new-game button
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg"); //select message

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

const winPatterns = [ //winner patterns array
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//allboxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true; //passing value get disabled
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

//reaset game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};
resetBtn.addEventListener("click", resetGame);

//enable boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

//gamedraw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

//checkwinner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
//showwinner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
//disablebox
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
newGameBtn.addEventListener("click", resetGame);