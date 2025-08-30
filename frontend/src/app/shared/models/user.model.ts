export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister extends ILogin {
    firstName: string;
    lastName: string;
    // email: string;
    // password: string;
}

export interface ILoginResponse {
    accessToken: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}