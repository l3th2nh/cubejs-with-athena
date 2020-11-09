import './body.css';
import 'antd/dist/antd.css';
import React from 'react';
import '@ant-design/compatible';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import cubejs from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';
import client from './graphql/client';
import Header from './components/Header';

const CUBEJS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDQ3NDY0NDcsImV4cCI6MTYwNDgzMjg0N30.34krqe0XEn7uxyEVAGpEN6kyGS7xc_J9RkS3Y4lHZmA";
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${process.env.REACT_APP_API_URL}/cubejs-api/v1`
});

const AppLayout = ({
  children
}) => <Layout style={{
  height: '100%'
}}>
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>;

const App = ({
  children
}) => <CubeProvider cubejsApi={cubejsApi}>
    <ApolloProvider client={client}>
      <AppLayout>{children}</AppLayout>
    </ApolloProvider>
  </CubeProvider>;

export default App;