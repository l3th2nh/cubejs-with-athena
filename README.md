# cube-with-athena
S3->(Glue->)Athena->Cube->React

## create IAM user - programming access
policy
```
- AmazonAthenaFullAccess
- AmazonS3FullAccess
```

## add .env file on root
```
CUBEJS_AWS_KEY=<YOUR ATHENA AWS KEY HERE>
CUBEJS_AWS_SECRET=<YOUR ATHENA SECRET KEY HERE>
CUBEJS_AWS_REGION=<AWS REGION STRING, e.g. us-east-1>
# You can find the Athena S3 Output location here: https://docs.aws.amazon.com/athena/latest/ug/querying.html
CUBEJS_AWS_S3_OUTPUT_LOCATION=<S3 OUTPUT LOCATION>
CUBEJS_JDBC_DRIVER=athena
CUBEJS_DB_TYPE=athena
CUBEJS_API_SECRET=*******************************************
```

## run

### Cube.js Playground
```
$ yarn playground
```
- http://localhost:4000

### Dashboard website based on React
```
$ yarn dashboard
```
- http://localhost:3000
