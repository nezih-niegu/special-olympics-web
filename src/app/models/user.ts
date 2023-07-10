export class UserLoginRequest{
    email: string;
    password: string;
}

export class UserLoginResponse{
    user: {
        id: number,
        access: number,
        state_id: number
    };
    token: string;
    expires_in: number;
}

export class UserRequestIndexResponseItem{
    id: number;
    name: string;
    email: string;
}

export class UserRequestIndexResponse{
    user_requests: UserRequestIndexResponseItem[];
    total: number;
}

export class UserRequestUpdateRequest{
    accepted: boolean;
}

export class UserIndexResponseItem{
    id: number;
    name: string;
    email: string;
}

export class UserIndexResponse{
    users: UserIndexResponseItem[];
    total: number;
}

export class UserStatusShowResponse{
    status: number;
}

export class UserPasswordStoreRequest{
    password: number;
    password_confirmation: number;
    token: string;
}

export class PasswordRequestSendRequest{
    email: string;
}

export class PasswordResetRequest{
    token: string;
    password: string;
    password_confirmation: string;
}