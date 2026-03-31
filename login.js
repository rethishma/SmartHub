document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('error');

  if (!email || !password) {
    errorDiv.textContent = 'All fields are required.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDiv.textContent = 'Invalid email format.';
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) return (errorDiv.textContent = data.msg);

    localStorage.setItem('token', data.token);
    localStorage.setItem('name', data.name);
    window.location.href = 'dashboard.html';
  } catch (err) {
    errorDiv.textContent = 'Server error. Try again.';
  }
});
