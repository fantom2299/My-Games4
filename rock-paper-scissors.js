// Массив возможных вариантов
const choices = ["камень", "ножницы", "бумага"];

// Основная функция игры
function playGame() {
  // 1. Получаем выбор пользователя через prompt
  let userChoice = prompt(
    "Выберите: камень, ножницы или бумага",
    "",
  ).toLowerCase();

  // Если пользователь нажал "Отмена" - выходим
  if (userChoice === null) {
    alert("Игра отменена");
    return;
  }

  // 2. Проверяем корректность ввода
  if (!choices.includes(userChoice)) {
    alert("Ошибка! Введите: камень, ножницы или бумага");
    return;
  }

  // 3. Генерируем случайный выбор компьютера
  const randomIndex = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomIndex];

  // 4. Определяем победителя
  let result;

  if (userChoice === computerChoice) {
    result = "🤝 Ничья!";
  } else if (
    (userChoice === "камень" && computerChoice === "ножницы") ||
    (userChoice === "ножницы" && computerChoice === "бумага") ||
    (userChoice === "бумага" && computerChoice === "камень")
  ) {
    result = "🎉 Вы победили!";
  } else {
    result = "😢 Вы проиграли!";
  }

  // 5. Выводим результат
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
                <p><strong>Ваш выбор:</strong> ${userChoice}</p>
                <p><strong>Компьютер выбрал:</strong> ${computerChoice}</p>
                <p><strong>Результат:</strong> ${result}</p>
            `;

  // 6. Также выводим в alert
  alert(`Вы: ${userChoice}\nКомпьютер: ${computerChoice}\n\n${result}`);
}

// Автозапуск при открытии страницы
setTimeout(() => {
  alert(
    "Добро пожаловать в игру 'Камень, ножницы, бумага'!\n\nНажмите кнопку 'Играть' или обновите страницу для новой игры.",
  );
}, 500);
