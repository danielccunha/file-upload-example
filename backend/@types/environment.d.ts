declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      APP_URL: string;
      MORGAN_MODE?: string;
      MONGO_URL: string;
      AWS_BUCKET_NAME: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_DEFAULT_REGION: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}

export {};
