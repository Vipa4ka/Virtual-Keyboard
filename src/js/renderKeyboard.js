import keyboardList from './layoutKeyboard';

const fragmentList = document.createDocumentFragment();
const keyArray = {};

keyboardList.forEach((line) => {
  const keyboardRow = document.createElement('div');
  keyboardRow.classList.add('row');

  line.forEach((key) => {
    keyArray[key.code] = key.lang;
    keyArray[key.code].func = key.func;

    const keyElement = document.createElement('button');
    keyElement.setAttribute('id', key.code);
    keyElement.setAttribute('type', 'button');
    keyElement.textContent = key.lang.en;
    keyElement.classList.add('btnKeyboard');
    keyElement.classList.add(`${key.width}`);
    keyboardRow.appendChild(keyElement);
  });

  fragmentList.appendChild(keyboardRow);
});

export { fragmentList, keyArray };
