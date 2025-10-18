import { Console } from '@woowacourse/mission-utils';
import {
  ERROR_INVALID_FORMAT,
  INPUT_MESSAGE,
  OUTPUT_PREFIX,
} from './constants.js';

class Calculator {
  constructor() {
    this.inputText = ''; // 입력 문자열
  }

  // 문자열 입력
  async input() {
    try {
      const input = await Console.readLineAsync(INPUT_MESSAGE);

      this.inputText = input;
    } catch {
      throw new Error(ERROR_INVALID_FORMAT);
    }
  }

  // 결과 출력
  output(result) {
    Console.print(`${OUTPUT_PREFIX}${result}`);
  }
}

export default Calculator;
