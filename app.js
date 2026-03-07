const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const submitBtn = document.getElementById('submitBtn');


const apiURL = 'https://crud-backend-0dzp.onrender.com/';

async function fetchUsers() {
    const res = await fetch(apiURL);
    const users = await res.json();
    console.log(users);

    userTableBody.innerHTML = ""; // jadvalni tozalash
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        userTableBody.appendChild(tr);
    });
}

// --- Add or Update User ---
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const userData = { name, email };

    if (id) {
        // update
        await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        submitBtn.textContent = "Add User";
    } else {
        // create
        await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
    }

    userForm.reset();
    document.getElementById('userId').value = "";
    fetchUsers();
});

// --- Edit user ---
async function editUser(id) {
    const res = await fetch(`${apiURL}/${id}`);
    const user = await res.json();

    document.getElementById('userId').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;

    submitBtn.textContent = "Update User";
}

// --- Delete user ---
async function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        fetchUsers();
    }
}

fetchUsers();