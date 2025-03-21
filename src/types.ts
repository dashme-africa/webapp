export interface IBank {
	id: 302;
	name: string;
	code: string;
}

export type APIResponse<D = unknown> =
	| {
			ok: false;
			message: string;
			error: { details: unknown };
	  }
	| { ok: true; message: string; data: D };

export interface Admin {
	id: string;
	v: number | null;
	email: string;
	password: string;
}
export interface User {
	id: string;
	v: number | null;
	accountName: string | null;
	accountNumber: string | null;
	bankName: string | null;
	bio: string | null;
	city: string | null;
	country: string | null;
	street: string | null;
	email: string;
	fullName: string;
	isVerified: boolean;
	password: string;
	phoneNumber: string | null;
	profilePicture: string | null;
	state: string | null;
	username: string;
	resetPasswordToken: string | null;
	resetPasswordExpires: Date | null;
	createdAt: Date;
	updatedAt: Date;
	refID: string;
	referredBy: string;
	referrals: User[];
	referralCount: string;
	products: Product[];
	notification: Notification[];
	transaction: Transaction[];
	order: Order[];
}

export interface Product {
	id: string;
	v: number | null;
	availability: boolean;
	category: string;
	condition: string;
	createdAt: Date;
	description: string;
	images: string[];
	location: string;
	price: number;
	priceCategory: string | null;
	primaryImage: string;
	specification: string;
	status: string;
	tag: string;
	title: string;
	updatedAt: Date;
	uploader: string;
	videoUrl: string | null;
	user: User;
	adminNotification: AdminNotification[];
	order: Order[];
}

export interface Order {
	id: string;
	v: number | null;
	amount: number;
	buyerEmail: string;
	createdAt: Date;
	productAmount: number;
	productId: string;
	quantity: number;
	rateAmount: number;
	rateId: string;
	redisKey: string;
	sellerId: string;
	shipmentReference: string | null;
	subaccount: string;
	transactionCharge: number;
	transactionReference: string;
	updatedAt: Date;
	userId: string;
	product: Product;
	user: User;
	Transaction: Transaction[];
}
export interface Transaction {
	id: string;
	v: number | null;
	amount: number;
	createdAt: Date;
	currency: string;
	customerEmail: string;
	gatewayResponse: string;
	orderId: string | null;
	paidAt: Date;
	paymentMethod: string;
	reference: string;
	status: string;
	transactionId: string;
	updatedAt: Date;
	order: Order | null;
	user: User;
}

export interface Notification {
	id: string;
	v: number | null;
	message: string;
	read: boolean;
	userId: string;
	createdAt: Date;
	user: User;
}

export interface AdminNotification {
	id: string;
	v: number | null;
	createdAt: Date;
	message: string;
	productId: string;
	read: boolean;
	type: string;
	product: Product;
}
