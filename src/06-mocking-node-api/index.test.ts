import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

afterEach(() => {
	jest.restoreAllMocks();
});

describe('doStuffByTimeout', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	test('should set timeout with provided callback and timeout', () => {
		const setTimeout = jest.spyOn(global, 'setTimeout');
		const callback = jest.fn();

		doStuffByTimeout(callback, 1000);

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
	});

	test('should call callback only after timeout', () => {
		jest.spyOn(global, 'setTimeout');
		const callback = jest.fn();

		doStuffByTimeout(callback, 1000);

		expect(callback).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1000);

		expect(callback).toHaveBeenCalled();
		expect(callback).toHaveBeenCalledTimes(1);
	});
});

describe('doStuffByInterval', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	test('should set interval with provided callback and timeout', () => {
		const setInterval = jest.spyOn(global, 'setInterval');
		const callback = jest.fn();

		doStuffByInterval(callback, 1000);

		expect(setInterval).toHaveBeenCalledTimes(1);
		expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
	});

	test('should call callback multiple times after multiple intervals', () => {
		jest.spyOn(global, 'setInterval');
		const callback = jest.fn();

		doStuffByInterval(callback, 1000);

		expect(callback).not.toHaveBeenCalled();

		jest.advanceTimersByTime(1000);

		expect(callback).toHaveBeenCalled();
		expect(callback).toHaveBeenCalledTimes(1);
	});
});

describe('readFileAsynchronously', () => {
	const SOME_PATH = '/some-path';
	const SOME_STRING = 'some string';

	jest.mock('fs');

	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('should call join with pathToFile', async () => {
		const joinSpy = jest.spyOn(path, 'join');

		await readFileAsynchronously(SOME_PATH);

		expect(joinSpy).toHaveBeenCalledTimes(1);
		expect(joinSpy).toHaveBeenLastCalledWith(__dirname, SOME_PATH);
	});

	test('should return null if file does not exist', async () => {
		const existsSyncSpy = jest.spyOn(fs, 'existsSync');
		existsSyncSpy.mockReturnValueOnce(false);

		expect(await readFileAsynchronously(SOME_PATH)).toBe(null);
	});

	test('should return file content if file exists', async () => {
		jest.spyOn(path, 'join');
		const existsSyncSpy = jest.spyOn(fs, 'existsSync');
		const readFileSpy = jest.spyOn(fsPromises, 'readFile');

		existsSyncSpy.mockReturnValueOnce(true);
		readFileSpy.mockResolvedValueOnce(SOME_STRING);

		expect(await readFileAsynchronously(SOME_PATH)).toBe(SOME_STRING);
	});
});
