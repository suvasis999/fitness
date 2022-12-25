import { NavigationContainer } from '@react-navigation/native';
import RootStack from './app/RootStack';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: 'https://apidev4.sapien.systems/graphql',
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default function App() {
  return (
    <ApolloProvider client={client}>
    <PaperProvider>
     <NavigationContainer>
          <RootStack />
      </NavigationContainer>
    </PaperProvider>
    </ApolloProvider>
  );
}

