import { TokensResponseType } from "./tokens-response.type"
import { UserInfoType } from "./user-info.type"

export type LoginResponseType = {
    tokens: TokensResponseType,
    user: UserInfoType
}