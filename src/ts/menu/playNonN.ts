const ONLY_NUMBER_REG_EXP = /^\d+$/;

function playNonN(showGameBoard: (boardDimension: number) => void) {
  const increaseBtn = <HTMLButtonElement>document.getElementById('increase-btn');
  const decreaseBtn = <HTMLButtonElement>document.getElementById('decrease-btn');
  const dimensionInput = <HTMLInputElement>document.getElementById('dimension-input');

  let lastValidValue: string = '3'; // Хранит последнюю корректную запись

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

  // Обработчик события blur (после потери фокуса)
  dimensionInput.addEventListener('blur', () => {
    const currentValue = dimensionInput.value.trim();

    if (ONLY_NUMBER_REG_EXP.test(currentValue)) {
      // Проверяем, является ли значение числом
      const numericValue = parseInt(currentValue);

      // Проверяем диапазон чисел от 3 до 10 включительно
      if (numericValue >= 3 && numericValue <= 10) {
        lastValidValue = numericValue.toString(); // Запоминаем корректное значение
      } else {
        dimensionInput.value = lastValidValue.toString(); // Восстанавливаем последнее правильное значение
      }
    } else {
      dimensionInput.value = lastValidValue; // Восстанавливаем последнее правильное значение
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
