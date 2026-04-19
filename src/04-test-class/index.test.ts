import { random } from 'lodash';
import {
	BankAccount,
	getBankAccount,
	InsufficientFundsError,
	SynchronizationFailedError,
	TransferFailedError,
} from '.';

jest.mock('lodash', () => ({
	random: jest.fn(),
}));

describe('BankAccount', () => {
	let bankAccount: BankAccount;
	let otherBankAccount: BankAccount;

	beforeEach(() => {
		bankAccount = getBankAccount(888);
		otherBankAccount = getBankAccount(0);
	});

	test('should create account with initial balance', () => {
		expect(bankAccount.getBalance()).toBe(888);
	});

	test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
		expect(() => bankAccount.withdraw(999)).toThrow(InsufficientFundsError);
	});

	test('should throw error when transferring more than balance', () => {
		expect(() => bankAccount.transfer(999, otherBankAccount)).toThrow(InsufficientFundsError);
	});

	test('should throw error when transferring to the same account', () => {
		expect(() => bankAccount.transfer(999, bankAccount)).toThrow(TransferFailedError);
	});

	test('should deposit money', () => {
		bankAccount.deposit(111);
		expect(bankAccount.getBalance()).toBe(999);
	});

	test('should withdraw money', () => {
		bankAccount.withdraw(888);
		expect(bankAccount.getBalance()).toBe(0);
	});

	test('should transfer money', () => {
		bankAccount.transfer(888, otherBankAccount);
		expect(bankAccount.getBalance()).toBe(0);
		expect(otherBankAccount.getBalance()).toBe(888);
	});

	test('fetchBalance should return number in case if request did not failed', async () => {
		(random as jest.Mock).mockReturnValueOnce(100).mockReturnValueOnce(1);
		const balance = await bankAccount.fetchBalance();
		expect(balance).toBe(100);
	});

	test('should set new balance if fetchBalance returned number', async () => {
		jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(200);
		await bankAccount.synchronizeBalance();
		const balance = bankAccount.getBalance();
		expect(balance).toBe(200);
	});

	test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
		jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
		await expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
	});
});
