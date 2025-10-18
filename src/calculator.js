import { Console } from '@woowacourse/mission-utils';
import {
  DEFAULT_DELIMITERS,
  ERROR_INVALID_FORMAT,
  INPUT_MESSAGE,
  OUTPUT_PREFIX,
} from './constants.js';

class Calculator {
  constructor() {
    this.delimiterList = [...DEFAULT_DELIMITERS]; // 구분자
    this.inputText = ''; // 입력 문자열
  }

  // 문자열 길이 반환
  size() {
    return this.inputText.length;
  }

  // 커스텀 구분자 파싱
  parseCustomDelimiter() {
    if (this.size() < 5) return;

    // 구분자가 없거나 틀린 형식일 시 return
    if (this.inputText[0] !== '/') return;
    if (this.inputText[1] !== '/') return;
    if (this.inputText[3] !== '\\') return;
    if (this.inputText[4] !== 'n') return;

    this.delimiterList.push(this.inputText[2]); // 커스텀 구분자 추가
    this.inputText = this.inputText.substring(5); // 커스텀 구분자 문자열 삭제
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
