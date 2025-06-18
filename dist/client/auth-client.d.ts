import { AuthClientConfig, TokenParams, AccessTokenResponse, LogoutParams, VerifyParams, VerificationType, OAuthAuthorizeParams, SignUpParams, RecoverParams, ResendParams, MagicLinkParams, OTPParams } from "../types";
export declare class AuthClient {
    private baseUrl;
    private fetch;
    constructor(config: AuthClientConfig);
    private request;
    token(params: TokenParams): Promise<AccessTokenResponse>;
    logout(accessToken: string, params?: LogoutParams): Promise<void>;
    buildVerifyRedirectUrl(params: {
        token: string;
        type: VerificationType;
        redirect_to?: string;
    }): string;
    verify(params: VerifyParams): Promise<AccessTokenResponse>;
    buildOAuthAuthorizeUrl(params: OAuthAuthorizeParams): string;
    signup(params: SignUpParams): Promise<AccessTokenResponse | any>;
    recover(params: RecoverParams): Promise<void>;
    resend(params: ResendParams): Promise<{
        message_id: string;
    }>;
    sendMagicLink(params: MagicLinkParams): Promise<void>;
    sendOTP(params: OTPParams): Promise<{
        message_id: string;
    }>;
}
