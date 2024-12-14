import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '../client';

export const GraphQLWrapper: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
