import { simpleCalculator, Action } from './index';

const testCases = [
	{ a: 9, b: 3, action: Action.Add, expected: 12 },
	{ a: 9, b: 3, action: Action.Subtract, expected: 6 },
	{ a: 9, b: 3, action: Action.Multiply, expected: 27 },
	{ a: 9, b: 3, action: Action.Divide, expected: 3 },
	{ a: 9, b: 3, action: Action.Exponentiate, expected: 729 },
	{ a: 9, b: 3, action: 'sum', expected: null },
	{ a: 'nine', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
	it.each(testCases)(
		'simpleCalculator(%a, %b) → %action → %expected ',
		({ a, b, action, expected }) => {
			expect(simpleCalculator({ a, b, action })).toBe(expected);
		},
	);
});
