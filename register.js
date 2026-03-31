document.getElementById('registerBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorDiv = document.getElementById('error');

  if (!name || !email || !password) {
    errorDiv.textContent = 'All fields are required.';
    return;
  }

  if (password.length < 6) {
    errorDiv.textContent = 'Password must be at least 6 characters.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorDiv.textContent = 'Invalid email format.';
    return;
  }

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (!res.ok) return (errorDiv.textContent = data.msg);

    alert('Registration successful! Redirecting to login...');
    window.location.href = 'login.html';
  } catch (err) {
    errorDiv.textContent = 'Server error. Try again.';
  }
});
