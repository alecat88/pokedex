## Notes from the Interviewee

Hello, and first of all, thank you for giving me the opportunity to participate in this interview.

Here are a few notes worth considering:

### 1. Fixing the Jest Setup

I installed the app using yarn, as suggested by the inclusion of the yarn.lock file in the original project.
While doing so, I encountered an issue with running Jest due to the react-markdown package. To resolve this, I added Jest configuration to ignore this module in the package.json.

### 2. Fixing the React Testing Library Setup

The `@testing-library/dom` package was not installed. Additionally, the version of react-scripts in the original setup required Node <16, which meant that I needed to use an older version of `@testing-library/dom` to maintain compatibility with the Node environment.

### 3. TDD and BDD with Randomised Data

I approached the exercise using Test-Driven Development (TDD), with a particular focus on Behaviour-Driven Development (BDD).
I created integration tests to simulate a "happy path" for users, mocking the API and randomising data using the `chance` package. This approach ensured 100% code coverage on the new code, while keeping the implementation minimal and focused on requirements.
Although the tests cover various scenarios, I did not include tests for CSS changes, as this was beyond the scope of the exercise.
If you run the test files individually, you’ll see descriptive test cases addressing specific scenarios.

### 4. Minimal Focus on UI Design

I didn’t prioritise the design aspects of the app, as this wasn’t part of the requirements.

### 5. Implementation Choices

The initial implementation of the search bar with filtering capabilities was straightforward. However, I noticed a performance issue: when clearing the input field after searching for a Pokémon, the UI was slow to re-render all the Pokémon images.
To address this, I opted for a solution that hides the Pokémon instead of removing them from the DOM. This approach ensures the UI feels faster, as no additional image loading is required.

### 6. Potential Improvements

The app could be further improved with the following enhancements:

- State management: Reusing existing data, such as when opening the dialog, could reduce redundant operations.
- Lazy-loading images: Implementing a lazy loader for images would improve performance as the list grows.
- Virtualised list: Using a virtual list could further enhance performance when handling a large number of Pokémon.
- Additional tests: Adding more tests would increase reliability and ensure broader coverage.
- Error handling: Adding error handling for API requests, including user-friendly messages for failed requests or network issues.
- Optimised bundle size: Analysing and reducing the JavaScript bundle size using tools like Webpack Bundle Analyzer or Vite, ensuring faster load times for users.
- Accessibility improvements: Enhancing accessibility features, such as keyboard navigation, ARIA roles, and better screen reader support, to make the app usable for all users.
- Debounced search input: Implementing a debounced search input to reduce the number of unnecessary renders or API calls when the user is typing quickly.
- Dark mode support: Adding a dark mode option for improved usability in low-light conditions.
- Performance monitoring: Integrating a tool like Lighthouse or Sentry to monitor the app's performance and detect potential bottlenecks in real-time.
- Offline support: Implementing offline capabilities with a service worker to allow users to browse cached Pokémon data when not connected to the internet.
- Think about tests for edge cases: Expanding the test suite to cover edge cases, such as invalid search queries or handling extremely large datasets.

## Thank you again for this opportunity. If you need any clarification, feel free to reach out to me at alecat88@gmail.com.

---

# UI Assessment - Pokédex (Senior)

This is a small application that will leverage various frontend technologies to assess your aptitude. This is a take home assignment and can be done at your own pace. Your recruiter will communicate with you when you should turn this assessment in.

## Requirements

### Leveraging Open API GraphQL

In this assessment you will utilize a Pokémon open API (GraphQL). This will help show knowledge and aptitude with graphql which ReliaQuest heavy leverages.

[API Docs](https://wayfair.github.io/dociql/)

Apollo Client Config - `src/app/client.ts`

---

### App-wide requirements

1. Should use jss for all styling - no css files. `<PokemonList />` (`src/components/PokemonList/PokemonList.tsx`) already does this. Feel free to use this component as an example of how to implement jss. _All styling contexts are already provided and implemented for you_
1. Must use TypeScript for all files

---

### List Page

In this assessment you will expand the existing list page with the following. You will need to retrieve more data from the useGetPokemons (src/hooks/useGetPokemons.ts) hook where the graphql query is defined.

1. Create list items that display the name, number, and types of each Pokémon
1. Each list item should also include a picture of the Pokémon (available through the api)
1. Each list item should have some hover effect

---

### Searching on List Page

In order for a user to be able to find a Pokémon quickly, they should be able to search on the Pokémon list page and see filtered results based on their search.

1. Implement a search box that filters the list of Pokémon
1. Should be case insensitive
1. List should only show Pokémon that match the search
1. **Searching will be client side only and NOT server side** -- The api does not support search

---

### Dialog for Pokémon Details

When a user wants to see more information about a Pokémon, they should be able to click on a list item and see a dialog/modal with that information. Feel free to use any 3rd party component library for the dialog/modal so you don't have to worry about building one. The [Mui Dialog](https://mui.com/components/dialogs/) is a good option if you don't already have on you like.

1. The dialog/modal will be route dependent meaning that whether or not it's shown and what Pokémon's details it's showing is based on the route. This should use `react-router`. React router is already set up in the app.
1. What additional you display and how you display it is up to you.
1. When the dialog/modal appears, a new data hook will be used to grab the details for a single Pokémon. This should be done using this graphql query

```gql
query pokemon($id: String, $name: String) {
  pokemon(id: $id, name: $name) {
    id
    number
    name
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
  }
}
```

---

## Useful Tools

- [Apollo Docs](https://www.apollographql.com/docs/react/)
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [React Router Docs](https://reactrouter.com/docs/en/v6)
- [MUI component library (optional)](https://mui.com/getting-started/usage/)
