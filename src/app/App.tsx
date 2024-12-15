import { GraphQLWrapper } from './wrappers/GraphQLWrapper';
import { LayoutWrapper } from './wrappers/LayoutWrapper';

function App() {
  /*
  Components have been separated to follow SRP from solid principle and to enable integration testing with API mocks.
  */
  return (
    <GraphQLWrapper>
      <LayoutWrapper />
    </GraphQLWrapper>
  );
}

export default App;
