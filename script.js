/* ============================================
   Lil Finder Guy — Interactions & Form
   ============================================ */

// ---- Scroll-triggered fade-in ----

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ---- Form handling ----

// SETUP: Replace this URL with your deployed Google Apps Script web app URL.
// See SETUP.md for instructions on creating the Google Apps Script.
const GOOGLE_SCRIPT_URL = '';

const form = document.getElementById('interest-form');
const submitBtn = document.getElementById('submit-btn');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const interestError = document.getElementById('interest-error');
const formSuccess = document.getElementById('form-success');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCheckedInterests() {
  return Array.from(
    form.querySelectorAll('input[name="interest"]:checked')
  ).map((cb) => cb.value);
}

function clearErrors() {
  emailError.textContent = '';
  interestError.textContent = '';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearErrors();

  const email = emailInput.value.trim();
  const interests = getCheckedInterests();
  let valid = true;

  if (!email || !validateEmail(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  if (interests.length === 0) {
    interestError.textContent = 'Please select at least one option.';
    valid = false;
  }

  // Honeypot check — if filled, silently bail (it's a bot)
  const honeypot = document.getElementById('website').value;
  if (honeypot) {
    form.style.display = 'none';
    formSuccess.classList.add('visible');
    return;
  }

  if (!valid) return;

  const data = {
    email,
    interests: interests.join(', '),
    name: form.name.value.trim(),
    address: form.address.value.trim(),
    timestamp: new Date().toISOString(),
  };

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    if (!GOOGLE_SCRIPT_URL) {
      // Demo mode — log to console when no script URL is configured
      console.log('Form submission (no Google Script URL configured):', data);
      await new Promise((resolve) => setTimeout(resolve, 600));
    } else {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }

    form.style.display = 'none';
    formSuccess.classList.add('visible');
  } catch (err) {
    console.error('Submission error:', err);
    emailError.textContent = 'Something went wrong. Please try again.';
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});
