import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {

  describe('converts cents into dollars', () => {

    it('test 1', () => {
      expect(formatCurrency(2095)).toEqual('20.95');
    });
  
    it('test 2', () => {
      expect(formatCurrency(20005)).toEqual('200.05');
    });

  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});



