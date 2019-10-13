const calcBtn = document.getElementById('calculate');
const minGradeBtn = document.getElementById('min-grade-btn');
const userGrade = document.getElementById('user-grade');
const maxGrade = document.getElementById('max-grade');
const minGrade = document.getElementById('min-grade');
const finalGrade = document.getElementById('final-grade');

calcBtn.addEventListener('click', calculateGrade);
minGradeBtn.addEventListener('click', minGradeInfo);

function calculateGrade(e) {
    if (userGrade.value === '') {
        showError('Please enter your Grade.');
    } else if (maxGrade.value === '') {
        showError('Please enter the maximum possible Grade');
    } else if (minGrade.value === '') {
        showError('Please enter the minimum passing Grade');
    } else if (maxGrade.value === minGrade.value) {
        showError('Max Grade and Min Grade can\'t be the same.')
    } else if (Number(userGrade.value) > Number(maxGrade.value)) {
        showError('Come on, be serious. You can\'t get more than the Maximum Grade :)')
    } else {
        const result = (1 + 3 * (Number(maxGrade.value) - Number(userGrade.value)) / (Number(maxGrade.value) - Number(minGrade.value))).toFixed(2);
        if (isFinite(result)) {
            finalGrade.value = result;
        } else {
            showError('Please check your numbers.');
        }
    }
    e.preventDefault();
}

function minGradeInfo(e) {
    if (confirm('Normally, the Minimum Grade is half of the max Grade.\nShould I calculate it for you?')) {
        if (maxGrade.value === '') {
            alert('You need to input the max Grade first.');
        } else {
            minGrade.value = Number(maxGrade.value) / 2;
        }
    }
    e.preventDefault();
}

function showError(e) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(e));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}