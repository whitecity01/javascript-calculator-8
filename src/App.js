import Calculator from './calculator.js';

class App {
  async run() {
    const calculator = new Calculator();

    await calculator.input(); // 입력
    const result = 0; // TODO: 실제 계산 결과로 대체

    calculator.output(result); // 출력
  }
}

export default App;
