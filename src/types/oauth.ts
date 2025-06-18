import { CodeChallengeMethod } from "./auth";

export type OAuthProvider =
	| "google"
	| "apple"
	| "azure"
	| "facebook"
	| "keycloak";

export interface OAuthAuthorizeParams {
	provider: OAuthProvider;
	scopes: string;
	invite_token?: string;
	redirect_to?: string;
	code_challenge_method?: CodeChallengeMethod;
}
