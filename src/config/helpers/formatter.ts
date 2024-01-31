
export class Formatter {
  
  static capitalize(str: string, allWords: boolean = false) {
    if (allWords) {
      return str.replace(/\b\w/g, (l) => l.toUpperCase());
    } else {
      return str.replace(/\b\w/, (l) => l.toUpperCase());
    }
  }

}