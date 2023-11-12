import { CustomUserResponse } from "src/user/user.interface";

export interface CustomPostResponse {
    id: number;
    title: string;
    body: string;
    user: CustomUserResponse;
}