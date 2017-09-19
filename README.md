## Deploy

a) Set up an AWS profile ([instructions here](https://serverless.com/framework/docs/providers/aws/guide/credentials/)).

b) Deploy the project to dev:

```
serverless deploy --aws-profile my-profile
```

Then you can test it in your browser to see if it works (e.g. `https://xxx.execute-api.us-east-1.amazonaws.com/dev/geoip`). You can get this URL from the API Gateway section in AWS (go to the Dashboard to see your URL).

## Local Testing

You can test the service offline by starting the local dev server:

```
npm run start
```

Then in your browser, run the funciton at `http://localhost:4566/geoip`.
