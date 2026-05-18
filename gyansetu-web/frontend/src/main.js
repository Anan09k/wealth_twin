const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

const programList = document.querySelector('#programList');
const testimonialList = document.querySelector('#testimonialList');
const form = document.querySelector('#leadForm');
const msg = document.querySelector('#formMsg');

async function loadPrograms() {
  const res = await fetch(`${apiBase}/programs`);
  const data = await res.json();
  programList.innerHTML = data.map(p => `<article class="card"><h3>${p.title}</h3><p>${p.description}</p><small>${p.level} · ${p.duration}</small></article>`).join('');
}

async function loadTestimonials() {
  const res = await fetch(`${apiBase}/testimonials`);
  const data = await res.json();
  testimonialList.innerHTML = data.map(t => `<article class="card"><p>“${t.quote}”</p><small>${t.name} · ${t.role}</small></article>`).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.textContent = 'Submitting...';
  const payload = Object.fromEntries(new FormData(form).entries());
  const res = await fetch(`${apiBase}/leads`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    msg.textContent = err.error || 'Submission failed';
    return;
  }
  msg.textContent = 'Thanks! Our team will contact you shortly.';
  form.reset();
});

loadPrograms();
loadTestimonials();
