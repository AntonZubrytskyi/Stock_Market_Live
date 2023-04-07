import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { setupStore } from '../redux';
import { clientId, formTextValues } from '../constants';
import TickerForm from '../components/TickerForm/TickerForm';

describe('test TickerForm component', () => {
  test('renders correctly', () => {
    render(
      <Provider store={setupStore()}>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <TickerForm />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>,
    );

    const textInput = screen.getByRole('textbox');
    const addButton = screen.getByRole('button');
    const inputErrorMessage = screen.queryByText(formTextValues.required);
    const existErrorMessage = screen.queryByText(formTextValues.exist);

    expect(textInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(inputErrorMessage).not.toBeInTheDocument();
    expect(existErrorMessage).not.toBeInTheDocument();
  });

  test('text input changes value', async () => {
    user.setup();
    render(
      <Provider store={setupStore()}>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <TickerForm />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>,
    );

    const textInput = screen.getByRole('textbox');

    await act(() => user.type(textInput, formTextValues.exist));
    expect(textInput).toHaveValue(formTextValues.exist);
  });
});
