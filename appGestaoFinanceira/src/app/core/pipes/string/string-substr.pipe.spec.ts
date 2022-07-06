import { StringSubstrPipe } from './string-substr.pipe';

describe('StringSubstrPipe', () => {
  it('create an instance', () => {
    const pipe = new StringSubstrPipe();
    expect(pipe).toBeTruthy();
  });
});
