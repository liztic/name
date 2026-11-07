let currentMode = 'login'; // По умолчанию режим Входа

// Функция переключения вкладок
function switchTab(mode) {
  currentMode = mode;
  const extraFields = document.getElementById('extra-fields');
  const formTitle = document.getElementById('form-title');
  const submitBtn = document.getElementById('submit-btn');
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  
  // Очищаем старые ошибки при переключении
  document.getElementById('errorMessage').style.display = 'none';
  document.getElementById('successMessage').style.display = 'none';

  if (mode === 'register') {
    extraFields.style.display = 'block';
    formTitle.innerText = 'Register';
    submitBtn.value = 'Register';
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
  } else {
    extraFields.style.display = 'none';
    formTitle.innerText = 'Login';
    submitBtn.value = 'Submit';
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  }
}

// Обработка отправки формы
document.getElementById('authForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('first_name').value.trim();
  const password = document.getElementById('password').value;
  const errorBlock = document.getElementById('errorMessage');
  const successBlock = document.getElementById('successMessage');

  // Достаем базу пользователей из памяти браузера
  let users = JSON.parse(localStorage.getItem('siteUsers')) || {
    "Ivan": "1111",
    "Oleg": "qwerty",
    "Greenagro": "agro2026"
  };

  if (currentMode === 'register') {
    // ЛОГИКА РЕГИСТРАЦИИ
    if (users[firstName]) {
      successBlock.style.display = 'none';
      errorBlock.innerText = "Цей логін вже зайнятий!";
      errorBlock.style.display = 'block';
      return;
    }

    users[firstName] = password; // Добавляем пользователя
    localStorage.setItem('siteUsers', JSON.stringify(users)); // Сохраняем

    errorBlock.style.display = 'none';
    successBlock.innerText = "Акаунт успішно створено!";
    successBlock.style.display = 'block';
    
    this.reset();
    setTimeout(() => switchTab('login'), 1500); // Переключаем на вход

  } else {
    // ЛОГИКА ВХОДА
    if (users[firstName] && users[firstName] === password) {
      errorBlock.style.display = 'none';
      successBlock.innerText = "Вхід успішний! Перехід...";
      successBlock.style.display = 'block';
      
      // Запоминаем текущего пользователя для личного кабинета
      localStorage.setItem('currentUser', firstName);
      
      // Перенаправляем в кабинет kabinet.html
      setTimeout(() => {
        window.location.href = "kabinet.html";
      }, 1000);
    } else {
      successBlock.style.display = 'none';
      errorBlock.innerText = "Невірне ім'я або пароль!";
      errorBlock.style.display = 'block';
    }
  }
});
