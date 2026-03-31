const token = localStorage.getItem('token');
const name = localStorage.getItem('name');
const welcome = document.getElementById('welcome');

if (!token) {
  window.location.href = 'login.html';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  window.location.href = 'login.html';
});

(async () => {
  try {
    const res = await fetch('/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    if (!res.ok) {
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    } else {
      welcome.textContent = data.msg;
    }
  } catch {
    window.location.href = 'login.html';
  }
})();
