/**
 * Keeps a history of roll entries and allows navigating through them.
 * It works similarly to the history in a browsers console, meaning:
 * - it always has an empty entry as its "newest" entry
 * - it only stores an entry that's different from the last one
 * - it keeps track of the current index in the history until the next entry is submitted
 */
export class RollHistory {

  private history: string[] = [''];
  private index: number = 0;
  private readonly size: number;

  constructor(size: number = 20) {
    this.size = size;
  }

  /**
   * Submits a new entry to the history if it is different from the last one.
   * @param entry the entry to submit to the history
   */
  submit(entry: string): void {
    if (this.history.at(-2) !== entry) { // -2 to skip the empty entry
      this.history[this.history.length - 1] = entry;
      this.history.push('');
    }
    if (this.history.length > this.size + 1) // +1 because of the initial empty entry
      this.history.shift();
    this.index = this.history.length - 1;
  }

  /**
   * Goes forward in the history, meaning it returns the next/newer entry.
   * @returns the next entry or an empty string
   */
  goForward(): string {
    if (this.index >= this.history.length - 1)
      return '';
    return this.history[++this.index]!;
  }

  /**
   * Goes backward in the history, meaning it returns the previous/older entry.
   * @returns the previous entry or the first entry if at the beginning
   */
  goBackward(): string {
    if (this.index === 0)
      return this.history[0] ?? '';
    return this.history[--this.index]!;
  }

  /** @returns true if the history has at least one entry stored */
  hasHistory(): boolean {
    return this.history.length > 1; // longer than the initial empty entry
  }

}
