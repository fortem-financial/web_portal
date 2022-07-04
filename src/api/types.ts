export interface Config {
	api: {
		authzURL: string;
		transactionURL: string;
		switchURL: string;
		downstreamURL: string;
		ieoURL: string;
	};
	minutesUntilAutoLogout?: string;
	rangerReconnectPeriod?: string;
	withCredentials: boolean;
	storage: {
		defaultStorageLimit?: number;
		orderBookSideLimit?: number;
	};
	gaTrackerKey?: string;
	msAlertDisplayTime?: string;
	incrementalOrderBook: boolean;
	finex: boolean;
	isResizable: boolean;
	isDraggable: boolean;
	languages: string[];
	usernameEnabled: boolean;
	sessionCheckInterval: string;
	balancesFetchInterval: string;
	passwordEntropyStep: number;
	showLanding: boolean;
	sentryEnabled?: boolean;
	kycSteps?: string[];
}
