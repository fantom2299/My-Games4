// Основные функции
function reverseText(text) {
  return text.split("").reverse().join("");
}

function isPalindrome(text) {
  const cleanText = text.toLowerCase().replace(/[^a-zа-яё0-9]/g, "");
  if (cleanText.length < 2) return false;
  return cleanText === cleanText.split("").reverse().join("");
}

function showMessage(message, isSuccess = true) {
  if (isSuccess) {
    alert(`✅ ${message}`);
  } else {
    alert(`❌ ${message}`);
  }
}

// Обработчики событий
document.getElementById("reverse-btn").addEventListener("click", () => {
  const text = prompt(
    "Введите текст для переворота (максимум 500 символов):",
    "",
  );

  if (text === null) {
    return; // Пользователь нажал "Отмена"
  }

  if (!text.trim()) {
    showMessage("Введите текст для переворота!", false);
    return;
  }

  if (text.length > 500) {
    showMessage("Текст слишком длинный! Максимум 500 символов.", false);
    return;
  }

  const reversed = reverseText(text);
  const resultElement = document.getElementById("result-text");

  resultElement.innerHTML = `
        <strong>Исходный текст:</strong> ${text}<br><br>
        <strong>Перевернутый текст:</strong> ${reversed}<br><br>
        <strong>Статистика:</strong><br>
        • Исходный: ${text.length} симв.<br>
        • Перевернутый: ${reversed.length} симв.<br>
        
    `;

  showMessage("Текст успешно перевернут!");
});

document.getElementById("example-btn").addEventListener("click", () => {
  const examples = [
    "Привет, мир!",
    "А роза упала на лапу Азора",
    "JavaScript - это весело!",
    "1234567890",
    "Hello World!",
  ];

  const randomExample = examples[Math.floor(Math.random() * examples.length)];

  const reversed = reverseText(randomExample);
  const resultElement = document.getElementById("result-text");

  resultElement.innerHTML = `
        <strong>Пример текста:</strong> ${randomExample}<br><br>
        <strong>Перевернутый текст:</strong> ${reversed}<br><br>
        <strong>Статистика:</strong><br>
        • Исходный: ${randomExample.length} симв.<br>
        • Перевернутый: ${reversed.length} симв.<br>
        
    `;

  showMessage("Пример загружен!");
});