# cube-with-athena
S3->(Glue->)Athena->Cube->React

## add .env file on root
```
CUBEJS_AWS_KEY=<YOUR ATHENA AWS KEY HERE>
CUBEJS_AWS_SECRET=<YOUR ATHENA SECRET KEY HERE>
CUBEJS_AWS_REGION=<AWS REGION STRING, e.g. us-east-1>
# You can find the Athena S3 Output location here: https://docs.aws.amazon.com/athena/latest/ug/querying.html
CUBEJS_AWS_S3_OUTPUT_LOCATION=<S3 OUTPUT LOCATION>
CUBEJS_JDBC_DRIVER=athena
CUBEJS_DB_TYPE=athena
CUBEJS_API_SECRET=ecd311445389818ecc8c9985e2ee6d589e9dc2b7b757f2fccd617ad5ecb8596c08afad7cc9e0de56f21b2af6dccc004c3ee27a211aedb50418a298b84cbe5bba
```

## install dependancy
```
$npm install
or
$yarn
```

## run
```
$npm run dev
or
$yarn dev
```

## Cube.js API
http://localhost:4000

## Dashboard website based on React
http://localhost:3000
