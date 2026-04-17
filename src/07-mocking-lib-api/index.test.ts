import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
	const PATH = '/api';
	const BASE_URL = 'https://jsonplaceholder.typicode.com';

	const mockData = 'some string';

	const axiosMock = { get: jest.fn().mockResolvedValue({ data: mockData }) };

	beforeEach(() => {
		axiosMock.get.mockResolvedValue({ data: mockData });
		(axios.create as jest.Mock).mockReturnValue(axiosMock);
	});

	afterEach(() => {
		throttledGetDataFromApi.cancel();
		jest.clearAllMocks();
	});

	test('should create instance with provided base url', async () => {
		await throttledGetDataFromApi(PATH);

		expect(axios.create).toHaveBeenCalledWith({ baseURL: BASE_URL });
	});

	test('should perform request to correct provided url', async () => {
		await throttledGetDataFromApi(PATH);

		expect(axiosMock.get).toHaveBeenLastCalledWith(PATH);
	});

	test('should return response data', async () => {
		expect(await throttledGetDataFromApi(PATH)).toBe(mockData);
	});
});
