import React, { JSXElementConstructor } from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './appStore';
import { ThemeProvider } from 'styled-components';
import theme from './ui/theme';
import formFieldsJson from "./assets/data/form-fields.json";
import App from './App';


function renderWithTheme(Component:any) {
    return <ThemeProvider theme={theme}>
        <Component />
    </ThemeProvider>
}

function renderWithRedux(component: JSX.Element) {
    return render(
        <Provider store={store}>
            {renderWithTheme(component)}
        </Provider>
    );
}

const allFields = formFieldsJson.flat();
const requiredFields = allFields.filter((field: any) => field.required);



describe('App', () => {
    it('should display form check for form title', () => {
        renderWithRedux(<App />);
        const title = screen.getByText(/Job Application/);
        expect(title).toBeInTheDocument();
    });

    it('should display ThankYouPage after successful form submit', () => {
        renderWithRedux(<App />);

        const validFormData = {
            "firstName": 'Test',
            "lastName": 'User',
            "email": 'me@example.com',
            "phone": '+1 213 373 4253',
            "jobTitle": 'Engineer - full stack'
        };

        requiredFields.forEach((field) => {
            const fieldEl = screen.getByLabelText(new RegExp(field.label));
            const value = validFormData[field.id as keyof typeof validFormData];
            fireEvent.change(fieldEl, { target: { value } });
            //console.log(`Setting element ${fieldEl.} with value: ${value}`);
        });

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.submit(submitButton);

        const title = screen.getByText(/Thank you!/);
        expect(title).toBeInTheDocument();
    });
});
