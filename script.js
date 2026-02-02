// Получаем инпут внутри div.calc
const display = document.querySelector('.calc input');

// Максимальная длина числа
const MAX_LENGTH = 10;

// Функция для добавления символов
function append(value) {
    let currentValue = display.value || '0';
    
    // Если достигнут максимум - не добавляем
    if (currentValue.replace(',', '').length >= MAX_LENGTH) {
        return;
    }
    
    // Если текущее значение "0" (кроме случая с запятой)
    if (currentValue === '0') {
        if (value === ',') {
            display.value = '0,';
        } else if (value !== '0') {
            display.value = value;
        }
    } else {
        // Проверяем, что добавляем
        if (value === ',') {
            // Запятая - только если её ещё нет
            if (!currentValue.includes(',')) {
                display.value = currentValue + ',';
            }
        } else if (value === '00') {
            // Двойной ноль - добавляем если есть место
            if ((currentValue + '00').replace(',', '').length <= MAX_LENGTH) {
                display.value = currentValue + '00';
            }
        } else if (/^\d$/.test(value)) {
            // Одиночная цифра
            if (currentValue.replace(',', '').length < MAX_LENGTH) {
                display.value = currentValue + value;
            }
        }
    }
}

// Функция очистки
function clearAll() {
    display.value = '';
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем начальное значение
    if (!display.value) {
        display.value = '';
    }
    
    // Настраиваем инпут
    display.setAttribute('maxlength', MAX_LENGTH + 1); // +1 для запятой
    display.setAttribute('inputmode', 'decimal');
    display.readOnly = true; // Только через кнопки
    
    // Обработка кнопки Abbruch (красной) - полный сброс
    const abortBtn = document.querySelector('.comp.red');
    if (abortBtn) {
        abortBtn.onclick = clearAll;
    }
    
    // Обработка кнопки Loschen (синей) - тоже очистка
    const clearBtn = document.querySelector('.comp.blue');
    if (clearBtn) {
        clearBtn.onclick = clearAll;
    }
});

// Дополнительная защита от прямого ввода (хотя readOnly=true)
display.addEventListener('keydown', function(event) {
    event.preventDefault();
});

// Запрещаем все действия с мышью кроме фокуса
display.addEventListener('mousedown', function(event) {
    event.preventDefault();
    this.focus();
});
// nur fur calculator oben

function toggleContent() {
    
    const content1 = document.getElementById('content1');
    const content2 = document.getElementById('content2');

     content1.classList.toggle('hidden');
     content2.classList.toggle('hidden');

}
// Fur toggle content1 und content2 oder knopf next
// Переменная для хранения суммы заказа
let orderSum = 0;


// Общая функция для других товаров
function addItem(price) {
    orderSum += price;
    updateDisplay();
}

// Функция обновления дисплея
function updateDisplay() {
    document.getElementById('orderTotal').value = orderSum.toFixed(2);
}

// Функция сброса
function resetOrder() {
    orderSum = 0;
    document.getElementById('orderTotal').value = "0.00";
}