import { ChannelType, CodeChallengeMethod, GoTrueSecurity, VerificationType } from "./auth";
export interface SignUpParams {
    email?: string;
    phone?: string;
    channel?: ChannelType;
    password?: string;
    data?: object;
    code_challenge?: string;
    code_challenge_method?: CodeChallengeMethod;
    gotrue_meta_security?: GoTrueSecurity;
}
export interface RecoverParams {
    email: string;
    code_challenge?: string;
    code_challenge_method?: CodeChallengeMethod;
    gotrue_meta_security?: GoTrueSecurity;
}
export interface ResendParams {
    email?: string;
    phone?: string;
    type: VerificationType;
    gotrue_meta_security?: GoTrueSecurity;
}
export interface MagicLinkParams {
    email: string;
    data?: object;
    gotrue_meta_security?: GoTrueSecurity;
}
export interface OTPParams {
    email?: string;
    phone?: string;
    channel?: ChannelType;
    create_user?: boolean;
    data?: object;
    code_challenge_method?: CodeChallengeMethod;
    code_challenge?: string;
    gotrue_meta_security?: GoTrueSecurity;
}
