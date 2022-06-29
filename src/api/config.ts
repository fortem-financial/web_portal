import { DEFAULT_KYC_STEPS, ORDER_BOOK_DEFAULT_SIDE_LIMIT, STORAGE_DEFAULT_LIMIT } from '../constants';
import { Config } from './types';

export const defaultConfig: Config = {
	api: {
		authzURL: 'http://demo.fortem-financial.io/api/v2/authz',
		switchURL: 'http://demo.fortem-financial.io/api/v2/switch',
		transactionURL: 'http://demo.fortem-financial.io/api/v2/fortem',
		ieoURL: 'http://api.fortem-financial.io/api/v2/fortem',

		downstreamURL: 'ws://demo.fortem-financial.io/api/v2/downstream',
	},
	minutesUntilAutoLogout: '50',
	rangerReconnectPeriod: '1',
	withCredentials: true,
	storage: {},
	gaTrackerKey: '',
	msAlertDisplayTime: '5000',
	incrementalOrderBook: true,
	finex: false,
	isResizable: false,
	isDraggable: false,
	languages: ['en'],
	sessionCheckInterval: '15000',
	balancesFetchInterval: '3000',
	passwordEntropyStep: 0,
	showLanding: true,
	sentryEnabled: false,
};

export const Cryptobase = {
	config: defaultConfig,
};

declare global {
	interface Window {
		env: Config;
	}
}

window.env = window.env || defaultConfig;
Cryptobase.config = { ...window.env };
Cryptobase.config.api.ieoURL = Cryptobase.config.api.ieoURL || '/api/v2/ieoURL';
Cryptobase.config.storage = Cryptobase.config.storage || {};

export const transactionURL = () => Cryptobase.config.api.transactionURL;
export const authzURL = () => Cryptobase.config.api.authzURL;
export const switchURL = () => Cryptobase.config.api.switchURL;
export const ieoURL = () => Cryptobase.config.api.ieoURL;
export const downstreamURL = () => Cryptobase.config.api.downstreamURL;
export const minutesUntilAutoLogout = (): string => Cryptobase.config.minutesUntilAutoLogout || '5';
export const withCredentials = () => Cryptobase.config.withCredentials;
export const defaultStorageLimit = () => Cryptobase.config.storage.defaultStorageLimit || STORAGE_DEFAULT_LIMIT;
export const orderBookSideLimit = () => Cryptobase.config.storage.orderBookSideLimit || ORDER_BOOK_DEFAULT_SIDE_LIMIT;
export const gaTrackerKey = (): string => Cryptobase.config.gaTrackerKey || '';
export const msAlertDisplayTime = (): string => Cryptobase.config.msAlertDisplayTime || '5000';
export const rangerReconnectPeriod = (): number =>
	Cryptobase.config.rangerReconnectPeriod ? Number(Cryptobase.config.rangerReconnectPeriod) : 1;
export const incrementalOrderBook = (): boolean => Cryptobase.config.incrementalOrderBook || false;
export const isResizableGrid = (): boolean => Cryptobase.config.isResizable || false;
export const isDraggableGrid = (): boolean => Cryptobase.config.isDraggable || false;
export const languages =
	Cryptobase.config.languages && Cryptobase.config.languages.length > 0 ? Cryptobase.config.languages : ['en'];
export const sessionCheckInterval = (): string => Cryptobase.config.sessionCheckInterval || '15000';
export const balancesFetchInterval = (): string => Cryptobase.config.balancesFetchInterval || '3000';
export const isFinexEnabled = (): boolean => Cryptobase.config.finex || false;
export const passwordEntropyStep = (): number => Cryptobase.config.passwordEntropyStep;
export const showLanding = (): boolean => Cryptobase.config.showLanding;
export const sentryEnabled = () => Cryptobase.config.sentryEnabled || defaultConfig.sentryEnabled;
export const kycSteps = (): string[] => Cryptobase.config.kycSteps || DEFAULT_KYC_STEPS;
