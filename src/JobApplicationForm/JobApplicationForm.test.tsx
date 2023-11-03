import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../appStore';
import { JobApplicationForm } from './JobApplicationForm';
import { ThemeProvider } from 'styled-components';
import theme from '../ui/theme';
import { clearFieldError, setFieldError, setFormSubmitted } from './formReducer';
import formFieldsJson from "../assets/data/form-fields.json";


function renderWithTheme(component: JSX.Element) {
    return <ThemeProvider theme={theme}>
        {component}
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

describe('JobApplicationForm', () => {

    beforeEach(() => {
        // Mock store.dispatch
        jest.spyOn(store, 'dispatch');
    });

    afterEach(() => {
        jest.spyOn(store, 'dispatch').mockRestore();

    })

    it('should render the form with all fields', () => {
        renderWithRedux(<JobApplicationForm />);
        const title = screen.getByText('Job Application');
        expect(title).toBeInTheDocument();

        allFields.forEach((field) => {
            const fieldEl = screen.getByLabelText(new RegExp(field.label));
            expect(fieldEl).toBeInTheDocument();
        });
    });


    it('should dispatch setFieldError when submitting invalid form', () => {
        renderWithRedux(<JobApplicationForm />);

        const firstName = screen.getByLabelText(/First name/);
        fireEvent.change(firstName, { target: { value: '' } });

        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.submit(submitButton);

        expect(store.dispatch).toHaveBeenCalledWith(setFieldError({ field: 'firstName', error: 'First name is required' }));

        expect(store.dispatch).not.toHaveBeenLastCalledWith(setFormSubmitted());
    });

    it('should dispatch setFieldError after blur "First name" required invalid input', () => {
        renderWithRedux(<JobApplicationForm />);

        const firstName = screen.getByLabelText(/First name/);
        fireEvent.blur(firstName);

        const submitButton = screen.getByText(/submit/i);
        fireEvent.submit(submitButton);

        expect(store.dispatch).toHaveBeenCalledWith(setFieldError({ field: 'firstName', error: 'First name is required' }));

        expect(store.dispatch).not.toHaveBeenLastCalledWith(setFormSubmitted());
    });

    it('should dispatch clearFieldError after blur "First name" required valid input', () => {
        renderWithRedux(<JobApplicationForm />);

        const firstName = screen.getByLabelText(/First name/);
        fireEvent.change(firstName, { target: { value: 'User' } });
        fireEvent.blur(firstName);

        const submitButton = screen.getByText(/submit/i);
        fireEvent.submit(submitButton);

        expect(store.dispatch).toHaveBeenCalledWith(clearFieldError('firstName'));

        expect(store.dispatch).not.toHaveBeenLastCalledWith(setFormSubmitted());
    });

    it('should dispatch setFormSubmitted for valid form', () => {
        renderWithRedux(<JobApplicationForm />);

        const validFormData = {
            "firstName": 'Test',
            "lastName": 'User',
            "email": 'me@example.com',
            "phone": '+1 213 373 4253',
            "jobTitle": 'Engineer - full stack'
        };
        requiredFields.forEach(field => {
            const fieldEl = screen.getByLabelText(new RegExp(field.label));
            // @ts-ignore
            const value = validFormData[field.id];
            fireEvent.change(fieldEl, { target: { value } });
            //console.log(`Setting element ${fieldEl.} with value: ${value}`);
        });


        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.submit(submitButton);

        expect(store.dispatch).toHaveBeenLastCalledWith(setFormSubmitted());
    });
});
