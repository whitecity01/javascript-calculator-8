import Calculator from './calculator.js';

class App {
  async run() {
    const calculator = new Calculator();

    await calculator.input(); // 입력
    const result = calculator.calculate();

    calculator.output(result); // 출력
  }
}

export default App;
