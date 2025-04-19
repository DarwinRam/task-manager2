const form = document.querySelector('.add-task-form');
const titleInput = document.querySelector('input[name="title"]');
const descriptionInput = document.querySelector('textarea[name="description"]');
const errorBox = document.querySelector('#form-errors');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  let errors = [];

  // Check for empty title
  const title = titleInput.value.trim();
  if (title.length === 0) {
    errors.push('Title is required.');
    titleInput.classList.add('input-error');
  } else if (title.length < 3 || title.length > 100) {
    errors.push('Title must be between 3 and 100 characters.');
    titleInput.classList.add('input-error');
  } else {
    titleInput.classList.remove('input-error');
  }

  // Check description length
  const description = descriptionInput.value.trim();
  if (description.length > 500) {
    errors.push('Description cannot exceed 500 characters.');
    descriptionInput.classList.add('input-error');
  } else {
    descriptionInput.classList.remove('input-error');
  }

  // Display errors if any
  if (errors.length > 0) {
    errorBox.innerHTML = errors.map(err => `<p>${err}</p>`).join('');
    errorBox.style.display = 'block';
  } else {
    errorBox.style.display = 'none'; 

  }
});

// Save scroll position before page unload
window.addEventListener('beforeunload', function () {
  localStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position on load
window.addEventListener('load', function () {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) window.scrollTo(0, parseInt(scrollPosition));
});
