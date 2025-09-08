import { RollHistory } from './roll-history';

describe('RollHistory', () => {

  it('should work', () => {
    const history = new RollHistory(20);

    expect(history.hasHistory()).toBe(false);
    expect(history.goBackward()).toBe('');
    expect(history.goForward()).toBe('');

    history.submit('1d6');
    expect(history.hasHistory()).toBe(true);
    expect(history.goBackward()).toBe('1d6');
    expect(history.goForward()).toBe('');

    history.submit('2d6');
    history.submit('3d6');
    expect(history.goBackward()).toBe('3d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goForward()).toBe('3d6');
    expect(history.goForward()).toBe('');
  });

  it('should delete the oldest entry', () => {
    const history = new RollHistory(3);

    history.submit('1d6');
    history.submit('2d6');
    history.submit('3d6');
    expect(history.hasHistory()).toBe(true);
    expect(history.goBackward()).toBe('3d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goBackward()).toBe('1d6');
    expect(history.goBackward()).toBe('1d6');

    history.submit('4d6');
    expect(history.goBackward()).toBe('4d6');
    expect(history.goBackward()).toBe('3d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goBackward()).toBe('2d6');
  });

  it('should not add the same entry twice', () => {
    const history = new RollHistory(20);

    history.submit('1d6');
    expect(history.goBackward()).toBe('1d6');

    history.submit('1d6');
    expect(history.goBackward()).toBe('1d6');

    history.submit('2d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goForward()).toBe('');
  });

  it('should repeat the oldest entry and return empty string when going beyond newest entry', () => {
    const history = new RollHistory(1);

    history.submit('1d6');
    expect(history.goBackward()).toBe('1d6');
    expect(history.goBackward()).toBe('1d6');
    expect(history.goForward()).toBe('');
    expect(history.goForward()).toBe('');

    history.submit('2d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goForward()).toBe('');
    expect(history.goForward()).toBe('');
  });

  it('should reset the index when submitting an entry', () => {
    const history = new RollHistory(20);

    history.submit('1d6');
    expect(history.goBackward()).toBe('1d6');

    history.submit('2d6');
    expect(history.goBackward()).toBe('2d6');
    expect(history.goBackward()).toBe('1d6');
    expect(history.goForward()).toBe('2d6');

    history.submit('3d6');
    expect(history.goBackward()).toBe('3d6');
    expect(history.goForward()).toBe('');
  });

});
