let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const { email, message } = form.elements;

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);

initFormData();

function handleFormInput() {
  formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function initFormData() {
  const savedData = localStorage.getItem(LOCALSTORAGE_KEY);

  if (!savedData) return;

  try {
    const parsedData = JSON.parse(savedData);

    formData = { ...formData, ...parsedData };
    email.value = formData.email || '';
    message.value = formData.message || '';
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (email.value.trim() === '' || message.value.trim() === '') {
    return alert('Fill please all fields');
  }
  console.log(formData);

  localStorage.removeItem(LOCALSTORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
}
