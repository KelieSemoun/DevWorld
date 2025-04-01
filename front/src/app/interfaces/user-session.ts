export interface UserSession {
    token: string;
    type: string;
    user: {
      id: number;
      username: string;
      email: string;
      subscribedTopicIds: number[];
    };
}
