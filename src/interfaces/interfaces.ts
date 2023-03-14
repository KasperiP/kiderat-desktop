export interface IUser {
	birthday: null;
	email: string;
	phone: string;
	streetAddress: string;
	city: string;
	country: string;
	school: string;
	postalCode: string;
	isBlocked: boolean;
	isDeleted: boolean;
	isHakaAuthenticated: boolean;
	isProfileComplete: boolean;
	isEmailReal: boolean;
	isLimited: boolean;
	locale: string;
	dateLastLogin: Date;
	dateLastActivity: Date;
	username: string;
	checkoutMobilePayPhone: string;
	checkoutPivoPhone: string;
	hasPassword: boolean;
	newUserInventoryItems: number;
	dateDeletionRequested: null;
	cart: ICart;
	memberships: IMembership[];
	order: null;
	settings: ISettings;
	externalAccessTokens: any[];
	hasUsername: boolean;
	firstName: string;
	lastName: string;
	gender: string;
	initials: string;
	fullName: string;
	id: string;
	name: string;
	description: string;
	ingress: string;
	mediaFilename: string;
	favoritedTimes: number;
	dateCreated: Date;
	dateModified: Date;
}

export interface ICart {
	finalPrice: number;
	serviceFee: number;
	reservations: null;
	currencyCode: null;
	reservationsCount: number;
	reservationsTimeLeft: number;
}

export interface IMembership {
	id: string;
	isDateValid: boolean;
	isDisabled: boolean;
	isMembershipToUserBindingDisabled: boolean;
}

export interface ISettings {
	completedOnboarding: boolean;
	hideSuccessfulCheckoutDialog: boolean;
	hideOrderBeingProcessedDialog: boolean;
	directMarketingPermissionGranted: boolean;
}
