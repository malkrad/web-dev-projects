const github = new Github;
const ui = new UI;

const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;

    if (userText !== '') {
        github.getUser(userText).then(data => {
            if (data.profile.message === 'Not Found') {
                // User not found alert

            } else {
                ui.showProfile(data.profile);
            }
        })
    } else {
        // Clear profile
        ui.clearProfile();
    }
});