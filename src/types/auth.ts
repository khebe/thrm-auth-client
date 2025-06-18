export type GrantType = "password" | "refresh_token" | "id_token" | "pkce";
export type LogoutScope = "global" | "local" | "others";
export type VerificationType =
	| "signup"
	| "invite"
	| "recovery"
	| "magiclink"
	| "email_change"
	| "sms"
	| "phone_change";
export type ChannelType = "sms" | "whatsapp";
export type CodeChallengeMethod = "plain" | "s256";

export interface GoTrueSecurity {
	captcha_token?: string;
}

export interface AccessTokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	user?: object;
}

export interface TokenParamsBase {
	gotrue_meta_security?: GoTrueSecurity;
}

export interface PasswordGrantParams extends TokenParamsBase {
	email?: string;
	phone?: string;
	password: string;
}

export interface RefreshTokenGrantParams extends TokenParamsBase {
	refresh_token: string;
}

export interface PKCEGrantParams extends TokenParamsBase {
	auth_code: string;
	code_verifier: string;
}

export type TokenParams =
	| ({ grant_type: "password" } & PasswordGrantParams)
	| ({ grant_type: "refresh_token" } & RefreshTokenGrantParams)
	| ({ grant_type: "pkce" } & PKCEGrantParams);

export interface LogoutParams {
	scope?: LogoutScope;
}

export interface VerifyParams {
	token: string;
	type: VerificationType;
	redirect_to?: string;
}
