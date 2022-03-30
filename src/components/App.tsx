import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import styled, { ThemeProvider } from 'styled-components';

import theme from '../theme';
import { rootReducer } from '../redux/reducers';
import { PostList } from './PostList';
import { AddPostInput } from './AddPostInput';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  font-family: Open Sans, Arial;
  font-style: normal;
  letter-spacing: 0px;
`;

const store = createStore(rootReducer, applyMiddleware(thunk));

export const App = (): JSX.Element => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Container>
        <PostList />
        <AddPostInput />
      </Container>
    </ThemeProvider>
  </Provider>
);
