import { simpleCalculator, Action } from '01-simple-tests';

describe('simpleCalculator tests', () => {
	test('should add two numbers', () => {
		const result = simpleCalculator({ a: 9, b: 3, action: Action.Add });
		expect(result).toBe(12);
	});

	test('should subtract two numbers', () => {
		const result = simpleCalculator({ a: 9, b: 3, action: Action.Subtract });
		expect(result).toBe(6);
	});

	test('should multiply two numbers', () => {
		const result = simpleCalculator({ a: 9, b: 3, action: Action.Multiply });
		expect(result).toBe(27);
	});

	test('should divide two numbers', () => {
		const result = simpleCalculator({ a: 9, b: 3, action: Action.Divide });
		expect(result).toBe(3);
	});

	test('should exponentiate two numbers', () => {
		const result = simpleCalculator({ a: 9, b: 3, action: Action.Exponentiate });
		expect(result).toBe(729);
	});

	test('should return null for invalid action', () => {
		const result = simpleCalculator({ a: 9, b: 3, action: 'sum' });
		expect(result).toBe(null);
	});

	test('should return null for invalid arguments', () => {
		const result = simpleCalculator({ a: 'nine', b: 3, action: Action.Add });
		expect(result).toBe(null);
	});
});
