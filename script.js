function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
}

function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    const users = getUsers();

    if (users[username] && users[username] === password) {
        showSection('secure-page');
        document.getElementById('user-display').textContent = username;
    } else {
        document.getElementById('login-message').textContent = "Invalid username or password.";
    }
}

function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const users = getUsers();

    if (!username || !password) {
        document.getElementById('register-message').textContent = "Please fill in all fields.";
        return;
    }

    if (users[username]) {
        document.getElementById('register-message').textContent = "Username already exists.";
    } else {
        users[username] = password;
        setUsers(users);
        document.getElementById('register-message').textContent = "Registered successfully! Redirecting...";
        setTimeout(() => {
            showLogin();
        }, 1500); // redirect after 1.5 seconds
    }
}

function logout() {
    showLogin();
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('login-message').textContent = '';
}

// Show/hide forms
function showLogin() {
    showSection('login-form');
    document.getElementById('register-message').textContent = '';
}

function showRegister() {
    showSection('register-form');
    document.getElementById('login-message').textContent = '';
}

function showSection(sectionId) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('secure-page').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}
