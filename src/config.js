const dev = {
  s3: {
    REGION: "us-west-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-6wbhcogxihbo" //todo
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://yka1wxom8b.execute-api.us-west-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_tlHIHtNpD",
    APP_CLIENT_ID: "4vmhje0s56u83qu242s1dqjhdc",
    IDENTITY_POOL_ID: "us-west-2:7d83dd7c-e310-4523-983e-426b84fee9ec"
  }
};

//todo
const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1h5n5ttet1hy0"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.serverless-stack.seed-demo.club/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_TwYpMXIJH",
    APP_CLIENT_ID: "6kfg0o7qo2i3ndk2ur906sc5fd",
    IDENTITY_POOL_ID: "us-east-1:f4c754b4-24f0-4754-8596-30afedece1fc"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
