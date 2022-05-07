import getRefs from "./get-refs.js";
const refs = getRefs();
import { keyboardList, keys } from './layoutKeyboard.js';

export default class Keyboard {
    constructor() {  
     
    }




    init() {        
        this.div = document.createElement('div');
        this.div.classList.add('wrapper');
        
        this.h = document.createElement('h1');
        this.h.classList.add('title');
        this.h.textContent = 'RSS Виртуальная клавиатура';
        this.div.appendChild(this.h);


        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('text');
        this.div.appendChild(this.textarea);

        this.keyBrd = document.createElement('div');
        this.keyBrd.classList.add('keyboard');
        this.div.appendChild(this.keyBrd);

        this.comment = document.createElement('p');
        this.comment.classList.add('comments');
        this.comment.textContent = 'Клавиатура создана в операционной системе Windows';
        this.div.appendChild(this.comment);
        
        this.comment = document.createElement('p');
        this.comment.classList.add('comments');
        this.comment.textContent = 'Для переключения языка комбинация: левыe Shift+Ctrl';   
        this.div.appendChild(this.comment);


        //  this.keyBrd.appendChild(keyboardList);


        

        document.body.appendChild(this.div);
        // this.div.appendChild(this.h);

    };
}



window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
  keyboard.init();
});