let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true => O's turn, false => X's turn

const winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [2, 4, 6],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true; // Start again with player O
  enableboxes(); // Clear all boxes and make them clickable again
  msgcontainer.classList.add("hide"); // Hide the winning message if it was shown
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkwinner();
  });
});

const disableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableboxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = ""; // Fix: corrected from `box,innerText = "empty"`
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disableboxes();
};

const checkwinner = () => {
  for (let pattern of winpattern) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val);
      return;
    }
  }
};

let filledBoxes = 0;
boxes.forEach((box) => {
  if (box.innerText !== "") filledBoxes++;
});



newgamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

