export interface LetuscStatusEventPayload {
    connected: boolean;
    alive: boolean;
}

export interface LoginEventPayload {
    student_id: string;
    discord_id: string;
    password: string;
    username: string;
    discriminator: string;
}

export interface ExtendedLoginEventPayload extends LoginEventPayload {
    client: string;
}

export enum StatusType {
    START = "start",
    SUCCESS = "success",
    WAIT = "wait",
    CLICK = "click",
    INPUT = "input",
    END = "end",
    ERROR = "error",
}

export interface LoginProgressEventPayload {
    client: string;
    type: string;
    message: string;
    status: StatusType;
    progress: number;
    total: number;
}


//イベントの送信およびブロードキャスト時に使用される型定義
export type ServerToClientEvents = {
    progress: (payload: LoginProgressEventPayload) => void;
};

//イベント受信時に使用する型定義
export type ClientToServerEvents = {
    login: (payload: LoginEventPayload) => void;
};
