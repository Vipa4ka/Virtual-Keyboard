/* eslint-disable no-param-reassign */
import { fragmentList, keyArray } from './renderKeyboard';

class Keyboard {
  constructor() {
    this.langLocalStorage = localStorage.getItem('lang') === 'ru' ? 'ru' : 'en';
    this.capsLock = false;
  }

  init() {
    this.div = document.createElement('div');
    this.div.classList.add('root');
    document.body.appendChild(this.div);

    this.title = document.createElement('h1');
    this.title.classList.add('title');
    this.title.textContent = 'RSS Виртуальная клавиатура';
    this.div.appendChild(this.title);

    this.textarea = document.createElement('textarea');
    this.textarea.autofocus = true;
    this.textarea.classList.add('textarea');
    this.div.appendChild(this.textarea);

    this.keyBrd = document.createElement('div');
    this.keyBrd.classList.add('keyBrd');
    this.keyBrd.appendChild(fragmentList);
    this.div.appendChild(this.keyBrd);

    const row = document.createElement('div');
    row.classList.add('row');

    this.comment = document.createElement('p');
    this.comment.classList.add('comments');
    this.comment.textContent = 'Клавиатура создана в операционной системе Windows';
    this.div.appendChild(this.comment);

    this.comment = document.createElement('p');
    this.comment.classList.add('comments');
    this.comment.textContent = 'Для переключения языка комбинация: левыe Ctrl+Alt';
    this.div.appendChild(this.comment);

    this.language(this.langLocalStorage);

    this.create();
  }

  create() {
    document.addEventListener('keyup', (event) => {
      const keyUp = document.getElementById(event.code);
      if (!keyUp) {
        event.preventDefault();
        return;
      }

      if (event.code !== 'CapsLock') {
        keyUp.classList.remove('active');
        if (event.key === 'Shift') {
          event.preventDefault();
          this.capsLockSwitch(event.shiftKey);
        }
      }
    });

    document.addEventListener('keydown', (event) => {
      const keyDown = document.getElementById(event.code);
      if (!keyDown) {
        event.preventDefault();
        return;
      }

      if (event.code === 'CapsLock' && !event.repeat) {
        event.preventDefault();
        this.capsLock = !this.capsLock;

        if (this.capsLock) {
          keyDown.classList.add('active');
        } else {
          keyDown.classList.remove('active');
        }
        this.capsLockSwitch(event.shiftKey);
      } else {
        keyDown.classList.add('active');

        if ((event.ctrlKey || event.metaKey) && event.altKey && !event.repeat) {
          event.preventDefault();
          this.langLocalStorage = this.langLocalStorage === 'ru' ? 'en' : 'ru';
          this.language(this.langLocalStorage, event.shiftKey);
          localStorage.setItem('lang', this.langLocalStorage);
        } else if (event.code === 'Enter') {
          event.preventDefault();
          this.insert('\n');
        } else if (event.code === 'Delete') {
          event.preventDefault();
          this.delete();
        } else if (!keyArray[event.code].func) {
          event.preventDefault();
          this.insert(keyDown.textContent);
        } else if (event.code === 'Tab') {
          event.preventDefault();
          this.insert('\t');
        } else if (event.code === 'Backspace') {
          event.preventDefault();
          this.backspace();
        } else if (event.code === 'ArrowDown' && !event.isTrusted) {
          this.arrowDown();
        } else if (event.code === 'ArrowUp' && !event.isTrusted) {
          this.arrowUp();
        } else if (event.code === 'ArrowLeft' && !event.isTrusted) {
          this.arrowLeft();
        } else if (event.key === 'Shift' && !event.repeat) {
          event.preventDefault();
          this.capsLockSwitch(event.shiftKey);
        } else if (event.code === 'ArrowRight' && !event.isTrusted) {
          this.arrowRight();
        }
      }
    });

    this.keyBrd.addEventListener('click', (event) => {
      this.textarea.focus();
      const eventKeyDown = new KeyboardEvent('keydown', {
        view: window,
        bubbles: true,
        code: event.target.id,
        cancelable: true,

      });
      document.dispatchEvent(eventKeyDown);

      this.textarea.focus();
      const eventKeyUp = new KeyboardEvent('keyup', {
        view: window,
        bubbles: true,
        code: event.target.id,
        cancelable: true,

      });
      document.dispatchEvent(eventKeyUp);
    });

    this.textarea.addEventListener('blur', () => {
      setTimeout(() => {
        this.textarea.focus();
      }, 0);
    });
  }

  language(lang, shift = false) {
    Array.from(this.keyBrd.querySelectorAll('.btnKeyboard')).forEach((event) => {
      event.textContent = keyArray[event.id][lang];
    });

    this.capsLockSwitch(shift);
  }

  capsLockSwitch(key) {
    const letterCase = (this.capsLock && !key) || (!this.capsLock && key);
    const letter = letterCase ? 'toUpperCase' : 'toLowerCase';
    Array.from(this.keyBrd.querySelectorAll('.btnKeyboard')).forEach(
      (event) => {
        if (!keyArray[event.id].func) {
          if (event.id === 'Backquote' && this.langLocalStorage === 'en') {
            event.textContent = key ? '~' : '`';
          } else if (event.id === 'BracketRight' && this.langLocalStorage === 'en') {
            event.textContent = key ? '}' : ']';
          } else if (event.id === 'Quote' && this.langLocalStorage === 'en') {
            event.textContent = key ? '"' : '\'';
          } else if (event.id === 'Minus' && this.langLocalStorage === 'en') {
            event.textContent = key ? '_' : '-';
          } else if (event.id === 'BracketLeft' && this.langLocalStorage === 'en') {
            event.textContent = key ? '{' : '[';
          } else if (event.id === 'Equal' && this.langLocalStorage === 'en') {
            event.textContent = key ? '+' : '=';
          } else if (event.id === 'Backslash' && this.langLocalStorage === 'en') {
            event.textContent = key ? '|' : '\\';
          } else if (event.id === 'Semicolon' && this.langLocalStorage === 'en') {
            event.textContent = key ? ':' : ';';
          } else if (event.id === 'Period' && this.langLocalStorage === 'en') {
            event.textContent = key ? '>' : '.';
          } else if (event.id === 'Slash' && this.langLocalStorage === 'en') {
            event.textContent = key ? '?' : '/';
          } else if (event.id === 'Comma' && this.langLocalStorage === 'en') {
            event.textContent = key ? '<' : ',';
          } else if (event.id === 'Slash' && this.langLocalStorage === 'ru') {
            event.textContent = key ? ',' : '.';
          } else if (event.id === 'Digit1' && this.langLocalStorage === 'en') {
            event.textContent = key ? '!' : '1';
          } else if (event.id === 'Digit1' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '!' : '1';
          } else if (event.id === 'Digit2' && this.langLocalStorage === 'en') {
            event.textContent = key ? '@' : '2';
          } else if (event.id === 'Digit2' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '"' : '2';
          } else if (event.id === 'Digit3' && this.langLocalStorage === 'en') {
            event.textContent = key ? '#' : '3';
          } else if (event.id === 'Digit3' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '№' : '3';
          } else if (event.id === 'Digit4' && this.langLocalStorage === 'en') {
            event.textContent = key ? '$' : '4';
          } else if (event.id === 'Digit4' && this.langLocalStorage === 'ru') {
            event.textContent = key ? ';' : '4';
          } else if (event.id === 'Digit5' && this.langLocalStorage === 'en') {
            event.textContent = key ? '%' : '5';
          } else if (event.id === 'Digit5' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '%' : '5';
          } else if (event.id === 'Digit6' && this.langLocalStorage === 'en') {
            event.textContent = key ? '^' : '6';
          } else if (event.id === 'Digit6' && this.langLocalStorage === 'ru') {
            event.textContent = key ? ':' : '6';
          } else if (event.id === 'Digit7' && this.langLocalStorage === 'en') {
            event.textContent = key ? '&' : '7';
          } else if (event.id === 'Digit7' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '?' : '7';
          } else if (event.id === 'Digit8' && this.langLocalStorage === 'en') {
            event.textContent = key ? '*' : '8';
          } else if (event.id === 'Digit8' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '*' : '8';
          } else if (event.id === 'Digit9' && this.langLocalStorage === 'en') {
            event.textContent = key ? '(' : '9';
          } else if (event.id === 'Digit9' && this.langLocalStorage === 'ru') {
            event.textContent = key ? '(' : '9';
          } else if (event.id === 'Digit0' && this.langLocalStorage === 'en') {
            event.textContent = key ? ')' : '0';
          } else if (event.id === 'Digit0' && this.langLocalStorage === 'ru') {
            event.textContent = key ? ')' : '0';
          } else {
            event.textContent = event.textContent[letter]();
          }
        }
      },
    );
  }

  insert(elem) {
    const cursorNumber = this.textarea.selectionStart;

    this.textarea.value = this.textarea.value.slice(0, cursorNumber)
      + elem + this.textarea.value.slice(this.textarea.selectionEnd);

    this.textarea.selectionStart = cursorNumber + elem.length;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  backspace() {
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.insert('');
    } else {
      const cursorNumber = Math.max(0, this.textarea.selectionStart - 1);

      this.textarea.value = this.textarea.value.slice(0, cursorNumber)
        + this.textarea.value.slice(this.textarea.selectionEnd);

      this.textarea.selectionStart = cursorNumber;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }

  arrowLeft() {
    this.textarea.selectionStart = Math.max(0, this.textarea.selectionStart - 1);
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  arrowRight() {
    this.textarea.selectionStart = Math.min(
      this.textarea.textLength,
      this.textarea.selectionEnd + 1,
    );
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  arrowUp() {
    this.textarea.selectionStart = 0;
    this.textarea.selectionEnd = this.textarea.selectionStart;
  }

  arrowDown() {
    this.textarea.selectionEnd = this.textarea.textLength;
    this.textarea.selectionStart = this.textarea.selectionEnd;
  }

  delete() {
    if (this.textarea.selectionStart !== this.textarea.selectionEnd) {
      this.insert('');
    } else {
      const cursorNumber = this.textarea.selectionStart;

      this.textarea.value = this.textarea.value.slice(0, cursorNumber)
        + this.textarea.value.slice(cursorNumber + 1);

      this.textarea.selectionStart = cursorNumber;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});
