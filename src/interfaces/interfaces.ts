export interface IEvent {
	company: ICompany;
	product: IProduct;
	variants?: IVariant[];
	categories: ICategory[];
}

export interface ICategory {
	id: string;
	name: string;
	nameResourceKey: string;
	type: number;
	productTypes: number[];
	parentCategoryId: null;
	orderingNumber: number;
	isFilterable: boolean;
	isPublic: boolean;
	dateCreated: Date;
	dateModified: Date;
}

export interface ICompany {
	email: string;
	url: string;
	phone: string;
	streetAddress: string;
	city: string;
	postalCode: string;
	country: string;
	latitude: number;
	longitude: number;
	organizationType: number;
	isFavorited: boolean;
	productCount: number;
	id: string;
	name: string;
	description: string;
	ingress: string;
	mediaFilename: string;
	favoritedTimes: number;
	dateCreated: Date;
	dateModified: Date;
}

export interface IProduct {
	productType: number;
	city: string;
	country: string;
	dateActualFrom: Date;
	dateActualUntil: Date;
	latitude: number;
	longitude: number;
	postalCode: string;
	streetAddress: string;
	place: string;
	companyId: string;
	datePublishFrom: Date;
	datePublishUntil: Date;
	dateSalesFrom: Date;
	dateSalesUntil: Date;
	isDeleted: boolean;
	isPublic: boolean;
	isPublished: boolean;
	isFavorited: boolean;
	pricingInformation: string;
	minTotalReservationsPerCheckout: null;
	maxTotalReservationsPerCheckout: null;
	availability: number;
	maxPrice: IPrice;
	minPrice: IPrice;
	hasFreeInventoryItems: boolean;
	hasInventoryItems: boolean;
	isLong: boolean;
	isActual: boolean;
	salesStarted: boolean;
	salesEnded: boolean;
	salesOngoing: boolean;
	salesPaused: boolean;
	time: number;
	timeUntilSalesStart: number;
	id: string;
	name: string;
	description: string;
	ingress: string;
	mediaFilename: string;
	favoritedTimes: number;
	dateCreated: Date;
	dateModified: Date;
}

export interface IPrice {
	eur: number;
}

export interface IVariant {
	inventoryId: string;
	currencyCode: string;
	pricePerItem: number;
	vat: number;
	notesInstructions: string;
	requiredInventoryIdReservations: any[];
	availability: number;
	isProductVariantActive: boolean;
	isProductVariantMarkedAsOutOfStock: boolean;
	isProductVariantTransferable: boolean;
	isProductVariantVisible: boolean;
	isProductVariantHakaAuthenticationRequired: boolean;
	productVariantMaximumItemQuantityPerUser: number;
	productVariantMaximumReservableQuantity: number;
	productVariantMinimumReservableQuantity: number;
	linkedProductVariants: any[];
	accessControlMemberships: any[];
	contentsMemberships: any[];
	productId: string;
	productType: number;
	dateActualFrom: null;
	dateActualUntil: null;
	dateSalesFrom: Date;
	dateSalesUntil: null;
	salesStarted: null;
	salesEnded: null;
	salesOngoing: null;
	id: string;
	name: string;
	description: string;
	ingress: string;
	mediaFilename: null;
	favoritedTimes: number;
	dateCreated: Date;
	dateModified: Date;
}

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
