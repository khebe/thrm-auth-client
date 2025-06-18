import {
	AuthClientConfig,
	FetchAPI,
	TokenParams,
	AccessTokenResponse,
	LogoutParams,
	VerifyParams,
	VerificationType,
	OAuthAuthorizeParams,
	SignUpParams,
	RecoverParams,
	ResendParams,
	MagicLinkParams,
	OTPParams,
} from "../types";

export class AuthClient {
	private baseUrl: string;
	private fetch: FetchAPI;

	constructor(config: AuthClientConfig) {
		this.baseUrl = config.baseUrl;

		// Handle fetch implementation
		if (config.fetch) {
			this.fetch = config.fetch;
		} else if (typeof globalThis.fetch === "function") {
			this.fetch = globalThis.fetch.bind(globalThis);
		} else {
			throw new Error(`
        No fetch implementation found. Please provide a fetch implementation in the config.
        For Node.js <18, you can install and pass a fetch polyfill:
        
        import fetch from 'node-fetch';
        
        const auth = new AuthClient({
          baseUrl: '...',
          fetch
        });
      `);
		}
	}

	private async request(
		endpoint: string,
		options: RequestInit
	): Promise<Response> {
		const url = `${this.baseUrl}${endpoint}`;
		const headers = {
			"Content-Type": "application/json",
			...options.headers,
		};

		const response = await this.fetch(url, {
			...options,
			headers,
		});

		if (!response.ok) {
			const error = await response
				.json()
				.catch(() => ({ message: response.statusText }));
			throw new Error(
				`Auth error [${response.status}]: ${
					error.message || response.statusText
				}`
			);
		}

		return response;
	}

	async token(params: TokenParams): Promise<AccessTokenResponse> {
		const { grant_type, ...body } = params;
		const response = await this.request(`/token?grant_type=${grant_type}`, {
			method: "POST",
			body: JSON.stringify(body),
		});
		return response.json();
	}

	async logout(accessToken: string, params?: LogoutParams): Promise<void> {
		const query = params?.scope ? `?scope=${params.scope}` : "";
		await this.request(`/logout${query}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	buildVerifyRedirectUrl(params: {
		token: string;
		type: VerificationType;
		redirect_to?: string;
	}): string {
		const url = new URL(`${this.baseUrl}/verify`);
		url.searchParams.append("token", params.token);
		url.searchParams.append("type", params.type);
		if (params.redirect_to) {
			url.searchParams.append("redirect_to", params.redirect_to);
		}
		return url.toString();
	}

	async verify(params: VerifyParams): Promise<AccessTokenResponse> {
		const response = await this.request("/verify", {
			method: "POST",
			body: JSON.stringify(params),
		});
		return response.json();
	}

	buildOAuthAuthorizeUrl(params: OAuthAuthorizeParams): string {
		const url = new URL(`${this.baseUrl}/authorize`);
		url.searchParams.append("provider", params.provider);
		url.searchParams.append("scopes", params.scopes);
		if (params.invite_token)
			url.searchParams.append("invite_token", params.invite_token);
		if (params.redirect_to)
			url.searchParams.append("redirect_to", params.redirect_to);
		if (params.code_challenge_method) {
			url.searchParams.append(
				"code_challenge_method",
				params.code_challenge_method
			);
		}
		return url.toString();
	}

	async signup(params: SignUpParams): Promise<AccessTokenResponse | any> {
		const response = await this.request("/signup", {
			method: "POST",
			body: JSON.stringify(params),
		});
		return response.json();
	}

	async recover(params: RecoverParams): Promise<void> {
		await this.request("/recover", {
			method: "POST",
			body: JSON.stringify(params),
		});
	}

	async resend(params: ResendParams): Promise<{ message_id: string }> {
		const response = await this.request("/resend", {
			method: "POST",
			body: JSON.stringify(params),
		});
		return response.json();
	}

	async sendMagicLink(params: MagicLinkParams): Promise<void> {
		await this.request("/magiclink", {
			method: "POST",
			body: JSON.stringify(params),
		});
	}

	async sendOTP(params: OTPParams): Promise<{ message_id: string }> {
		const response = await this.request("/otp", {
			method: "POST",
			body: JSON.stringify(params),
		});
		return response.json();
	}
}
