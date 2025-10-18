import { Console } from '@woowacourse/mission-utils';
import {
  DEFAULT_DELIMITERS,
  ERROR_INVALID_FORMAT,
  ERROR_NON_POSITIVE,
  INPUT_MESSAGE,
  OUTPUT_PREFIX,
} from './constants.js';
import { isNumberChar } from './utils.js';

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

  // delimiterList(구분자)로 문자열의 숫자를 파싱해서 배열로 반환
  // 예외 발생 시 애플리케이션이 종료된다.
  parseNumber() {
    const numbers = [0]; // 기본값 : 0
    let chunk = '';

    for (let i = 0; i < this.size(); i++) {
      const c = this.inputText[i];

      // chunk에 숫자 추가
      if (isNumberChar(c)) {
        chunk += c;

        if (i + 1 < this.size()) continue;
      }

      // 문자열의 마지막이나 구분자를 만날 경우
      if (i + 1 === this.size() || this.delimiterList.includes(c)) {
        const number = Number(chunk); // 형변환

        // 숫자가 아닐 경우
        if (Number.isNaN(number)) throw new Error(ERROR_INVALID_FORMAT);

        // 양수가 아닐 경우
        if (number <= 0) throw new Error(ERROR_NON_POSITIVE);

        numbers.push(number);
        chunk = '';
        continue;
      }

      // 숫자, 구분자 모두 아닐 경우
      throw new Error(ERROR_INVALID_FORMAT);
    }

    return numbers; // 성공 시 분리된 숫자 배열을 반환
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
