const inputs = document.querySelectorAll('.days');
const inputBox = document.querySelectorAll('input');
const labels = document.querySelectorAll('label');
const errMsg = document.querySelectorAll('.err-msg');

const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

const showYears = document.querySelector('.show-year');
const showMonths = document.querySelector('.show-month');
const showDays = document.querySelector('.show-day');

const setError = (i, msg) => {
    inputBox[i].style.borderColor = labels[i].style.color = 'red';
    errMsg[i].textContent = msg;
    errMsg[i].style.visibility = 'visible';
};
const clearError = i => {
    inputBox[i].style.borderColor = labels[i].style.color = 'green';
    errMsg[i].style.visibility = 'hidden';
};
const resetOutput = () => [showYears, showMonths, showDays].forEach(el => el.textContent = '--');

const validateAndCalculate = () => {
    const d = +dayInput.value, m = +monthInput.value, y = +yearInput.value;
    const today = new Date(), birthDate = new Date(y, m - 1, d);
    let error = false;

    
    [d, m, y].forEach((val, i) => !val ? (setError(i, "Required"), error = true) : clearError(i)); // Required checks

    // Validity checks
    if (d < 1 || d > 31 || birthDate.getDate() !== d) (setError(0, "Valid day"), error = true);
    if (m < 1 || m > 12 || birthDate.getMonth() !== m - 1) (setError(1, "Valid month"), error = true);
    if (y < 1900 || y > today.getFullYear() || birthDate.getFullYear() !== y) (setError(2, "Past year only"), error = true);

    if (error) return resetOutput();

    // Age calculation
    let ageY = today.getFullYear() - y,
        ageM = today.getMonth() - (m - 1),
        ageD = today.getDate() - d;

    if (ageD < 0) { ageM--; ageD += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (ageM < 0) { ageY--; ageM += 12; }

    [showYears.textContent, showMonths.textContent, showDays.textContent] = [ageY, ageM, ageD];
};

// Only numbers + limit length
inputs.forEach(el => el.addEventListener('input', () => {
    el.value = el.value.replace(/\D/g, '').slice(0, 2);
    validateAndCalculate();
}));
yearInput.addEventListener('input', () => {
    yearInput.value = yearInput.value.replace(/\D/g, '').slice(0, 4);
    validateAndCalculate();
});

