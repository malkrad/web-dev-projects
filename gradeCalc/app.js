const calcBtn = document.getElementById('calculate');
const userGrade = document.getElementById('user-grade');
const maxGrade = document.getElementById('max-grade');
const minGrade = document.getElementById('min-grade');
const finalGrade = document.getElementById('final-grade');

calcBtn.addEventListener('click', calculateGrade);

function calculateGrade(e) {
    if (userGrade.value === '') {
        alert('Please enter your Grade.');
    } else if (maxGrade.value === '') {
        alert('Please enter the maximum possible Grade');
    } else if (minGrade.value === '') {
        alert('Please enter the minimum passing Grade');
    } else if (maxGrade.value === minGrade.value) {
        alert('Max Grade and Min Grade can\'t be the same.')
    } else {
        const result = (1 + 3 * (maxGrade.value - userGrade.value) / (maxGrade.value - minGrade.value)).toFixed(2);
        if (isFinite(result)) {
            finalGrade.value = result;
        } else {
            alert('Please check your numbers.');
        }
    }
    e.preventDefault();
}