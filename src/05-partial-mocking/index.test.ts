import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
	const originalModule = jest.requireActual<typeof import('./index')>('./index');

	return {
		unmockedFunction: originalModule.unmockedFunction,
		mockOne: jest.fn(),
		mockTwo: jest.fn(),
		mockThree: jest.fn(),
	};
});

describe('partial mocking', () => {
	let logSpy: jest.SpyInstance;

	afterAll(() => {
		jest.unmock('./index');
	});

	beforeEach(() => {
		logSpy = jest.spyOn(console, 'log').mockImplementation();
	});

	afterEach(() => {
		logSpy.mockRestore();
	});

	test('mockOne, mockTwo, mockThree should not log into console', () => {
		mockOne();
		mockTwo();
		mockThree();

		expect(logSpy).not.toHaveBeenCalled();
	});

	test('unmockedFunction should log into console', () => {
		unmockedFunction();

		expect(logSpy).toHaveBeenCalledWith('I am not mocked');
	});
});
