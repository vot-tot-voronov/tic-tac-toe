function playNonN(showGameBoard: (boardDimension: number) => void) {
  const plus = document.querySelector('.plus') as HTMLButtonElement;
  const minus = document.querySelector('.minus') as HTMLButtonElement;
  const inputSpace = document.getElementById('input') as HTMLInputElement;

  function addOne() {
    if (parseInt(inputSpace.value) <= 9) {
      inputSpace.value = String(parseInt(inputSpace.value) + 1);
    }
  }

  function removeOne() {
    if (parseInt(inputSpace.value) > 3) {
      inputSpace.value = String(parseInt(inputSpace.value) - 1);
    }
  }

  plus.addEventListener('click', addOne);
  minus.addEventListener('click', removeOne);

  const play = document.querySelector('.play-button') as HTMLButtonElement;
  play.addEventListener('click', () => showGameBoard(parseInt(inputSpace.value)));
}

export { playNonN };
