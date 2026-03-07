// Массив вопросов викторины
const quiz = [
  {
    question: "Какой цвет небо?",
    options: ["1. Красный", "2. Синий", "3. Зеленый"],
    correctAnswer: 2,
  },
  {
    question: "Сколько дней в неделе?",
    options: ["1. Шесть", "2. Семь", "3. Восемь"],
    correctAnswer: 2,
  },
  {
    question: "Сколько у человека пальцев на одной руке?",
    options: ["1. Четыре", "2. Пять", "3. Шесть"],
    correctAnswer: 2,
  },
  {
    question: "Столица России?",
    options: ["1. Санкт-Петербург", "2. Москва", "3. Казань"],
    correctAnswer: 2,
  },
  {
    question: "Сколько планет в Солнечной системе?",
    options: ["1. Восемь", "2. Девять", "3. Десять"],
    correctAnswer: 1,
  },
];

let userAnswers = [];
let score = 0;

// Функция для запуска викторины через prompt
function startQuizWithPrompt() {
  // Сброс предыдущих результатов
  userAnswers = [];
  score = 0;

  alert(
    "🎮 Добро пожаловать в викторину!\n\nВы будете отвечать на вопросы через окна ввода.\n\nНажмите OK для начала.",
  );

  // Проходим по всем вопросам
  quiz.forEach((question, index) => {
    const questionNumber = index + 1;
    const totalQuestions = quiz.length;

    // Формируем текст вопроса с вариантами ответов
    let promptText = `❓ Вопрос ${questionNumber} из ${totalQuestions}:\n\n`;
    promptText += `${question.question}\n\n`;
    promptText += "Варианты ответов:\n";
    question.options.forEach((option) => {
      promptText += `${option}\n`;
    });
    promptText += "\nВведите номер правильного ответа (1, 2 или 3):";

    // Получаем ответ пользователя
    let userAnswer;
    let isValidAnswer = false;

    while (!isValidAnswer) {
      userAnswer = prompt(promptText, "");

      // Если пользователь нажал "Отмена"
      if (userAnswer === null) {
        if (confirm("Вы уверены, что хотите прервать викторину?")) {
          alert("Викторина прервана.");
          return;
        } else {
          continue;
        }
      }

      // Проверяем валидность ответа
      userAnswer = parseInt(userAnswer);
      if ([1, 2, 3].includes(userAnswer)) {
        isValidAnswer = true;
      } else {
        alert("⚠️ Пожалуйста, введите число 1, 2 или 3!");
      }
    }

    // Сохраняем ответ
    userAnswers.push(userAnswer);

    // Проверяем правильность
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      score++;
      alert(`✅ Правильно! Вы набрали ${score} балл(ов).`);
    } else {
      alert(
        `❌ Неправильно! Правильный ответ: ${question.correctAnswer}. У вас ${score} балл(ов).`,
      );
    }
  });

  // Показываем результаты
  showResults();
}

// Функция для отображения результатов
function showResults() {
  const percentage = Math.round((score / quiz.length) * 100);

  // Определяем сообщение в зависимости от результата
  let message;
  if (percentage === 100) {
    message = "🎉 Потрясающе! Вы знаток! Все ответы правильные!";
  } else if (percentage >= 80) {
    message = "👍 Отличный результат! Вы хорошо справились!";
  } else if (percentage >= 60) {
    message = "💪 Хороший результат! Есть куда стремиться!";
  } else if (percentage >= 40) {
    message = "✨ Неплохо, но можно лучше! Попробуйте еще раз!";
  } else {
    message = "🌟 Попробуйте еще раз! Уверен, в следующий раз получится лучше!";
  }

  // Обновляем статистику на странице
  const statsElement = document.getElementById("result-stats");
  statsElement.innerHTML = `
        <div class="stat">
            <div class="stat-value">${score}</div>
            <div class="stat-label">Правильных</div>
        </div>
        <div class="stat">
            <div class="stat-value">${quiz.length}</div>
            <div class="stat-label">Всего вопросов</div>
        </div>
        <div class="stat">
            <div class="stat-value">${percentage}%</div>
            <div class="stat-label">Процент</div>
        </div>
    `;

  // Формируем список ответов
  const answersList = document.getElementById("answers-list");
  let answersHTML = "";

  quiz.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correctAnswer;

    answersHTML += `
            <div class="result-item ${isCorrect ? "result-correct" : "result-incorrect"}">
                <strong>${index + 1}. ${question.question}</strong><br>
                Ваш ответ: ${userAnswer} (${question.options[userAnswer - 1]})<br>
                ${!isCorrect ? `Правильный ответ: ${question.correctAnswer} (${question.options[question.correctAnswer - 1]})` : "✅ Правильно!"}
            </div>
        `;
  });

  answersList.innerHTML = answersHTML;

  // Показываем результат на странице
  document.getElementById("result").classList.add("show");
  document.getElementById("show-result-btn").style.display = "block";

  // Показываем финальное сообщение
  alert(
    `🏆 Викторина завершена!\n\n${message}\n\nПравильных ответов: ${score} из ${quiz.length} (${percentage}%)`,
  );
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  // Обработчик кнопки "Начать викторину"
  document
    .getElementById("start-btn")
    .addEventListener("click", startQuizWithPrompt);

  // Обработчик кнопки "Показать результат"
  document.getElementById("show-result-btn").addEventListener("click", () => {
    document.getElementById("result").classList.toggle("show");
  });

  // Показываем краткую инструкцию
  setTimeout(() => {
    alert(
      "Добро пожаловать в викторину!\n\nНажмите кнопку 'Начать викторину', чтобы начать отвечать на вопросы.\n\nВсе ответы вводятся через отдельное окно.",
    );
  }, 1000);
});
