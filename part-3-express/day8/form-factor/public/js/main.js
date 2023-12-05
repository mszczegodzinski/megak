const numberAInput = document.querySelector('#numberA');
const numberBInput = document.querySelector('#numberB');
const form = document.querySelector('form');
const resultDiv = document.querySelector('#result');

const setResult = (text, color) => {
  const resultDiv = document.querySelector('#result');
  resultDiv.innerText = text;
  resultDiv.style.border = `1px solid ${color}`;
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const numberA = parseInt(numberAInput.value);
  const numberB = parseInt(numberBInput.value);

  setResult('Calculating...', 'transparent');

  const res = await fetch('/calc/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      numberA: numberA,
      numberB: numberB,
    }),
  });

  const data = await res.json();

  if (data.factor) {
    setResult(`${numberB} is a factor of ${numberA}`, 'green');
  } else {
    setResult(`${numberB} is NOT a factor of ${numberA}`, 'red');
  }
});
