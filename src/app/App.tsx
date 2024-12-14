import { GraphQLWrapper } from './wrappers/GraphQLWrapper';
import { LayoutWrapper } from './wrappers/LayoutWrapper';

function App() {
  return (
    <GraphQLWrapper>
      <LayoutWrapper />
    </GraphQLWrapper>
  );
}

export default App;
