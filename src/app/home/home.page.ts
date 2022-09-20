import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  input : string = '';
  result : string = '';

  pressNum(num: string) {
    
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        // console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    if (num == '0') {
      if (this.input == '') {
        return;
      }

      const PrevKey = this.input[this.input.length - 1];
      if (
        PrevKey === '/' ||
        PrevKey === '*' ||
        PrevKey === '-' ||
        PrevKey === '+'
      ) {
        return;
      }
    }

    this.input = this.input + num;
    this.calculatorResult();
  }

  getLastOperand() {
    let pos : number;
    // console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    // console.log('Last ' + this.input.substr(pos + 1));

    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    
    const lastKey = this.input[this.input.length - 1];
    const firstKey = this.input[0];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    if (firstKey === '/' || firstKey === '*' || firstKey === '+') {
      this.input = this.input.substr(1, this.input.length - 1);
    }

    this.input = this.input + op;
    console.log(this.input)
    this.calculatorResult();
  }

  delete() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  clearAll() {
    this.result = '';
    this.input = '';
  }

  calculatorResult() {
    let func = this.input;

    let lastKey = func[func.length - 1];
    let firstKey = func[0];

    if (lastKey === '.') {
      func = func.substr(0, func.length - 1);
    }
    if (firstKey === '/' || firstKey === '*' || firstKey === '+') {
      func = func.substr(1, func.length - 1);
    }


    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      func = func.substr(0, func.length - 1);
    }

    // console.log('Function ' + func);
    this.result = eval(func);
  }

  getAnswer() {
    this.calculatorResult();
    this.input = '';
    if (this.input == '0') {
      this.input = '';
    }
  }
}
