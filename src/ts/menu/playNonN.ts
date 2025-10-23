const ONLY_NUMBER_REG_EXP = /^\d+$/;

function playNonN(showGameBoard: (boardDimension: number) => void) {
  const increaseBtn = <HTMLButtonElement>document.getElementById('increase-btn');
  const decreaseBtn = <HTMLButtonElement>document.getElementById('decrease-btn');
  const dimensionInput = <HTMLInputElement>document.getElementById('dimension-input');

  let lastValidValue: string = '3'; // Keeps the most recent valid entry

  function increaseDimension() {
    if (parseInt(dimensionInput.value) <= 9) {
      dimensionInput.value = String(parseInt(dimensionInput.value) + 1);
    }
  }

  function decreaseDimension() {
    if (parseInt(dimensionInput.value) > 3) {
      dimensionInput.value = String(parseInt(dimensionInput.value) - 1);
    }
  }

  // Blur event handler
  dimensionInput.addEventListener('blur', () => {
    const currentValue = dimensionInput.value.trim();

    if (ONLY_NUMBER_REG_EXP.test(currentValue)) {
      // Check if the value is a number
      const numericValue = parseInt(currentValue);

      // Check if the number is in the range 3 to 10 (inclusive)
      if (numericValue >= 3 && numericValue <= 10) {
        lastValidValue = numericValue.toString(); // Remember the correct value
      } else {
        dimensionInput.value = lastValidValue.toString(); // Restore the last valid value
      }
    } else {
      dimensionInput.value = lastValidValue; // Restore the last valid value
    }
  });

  increaseBtn.addEventListener('click', increaseDimension);
  decreaseBtn.addEventListener('click', decreaseDimension);

  const play = <HTMLButtonElement>document.getElementById('play-btn');
  play.addEventListener(
    'click',
    () => {
      showGameBoard(parseInt(dimensionInput.value));
      increaseBtn.removeEventListener('click', increaseDimension);
      decreaseBtn.removeEventListener('click', decreaseDimension);
    },
    { once: true },
  );
}

export { playNonN };
