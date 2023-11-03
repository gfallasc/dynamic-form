import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { InputFormField, TextAreaFormField, SelectFormField } from './FormFields';
import { ThemeProvider } from 'styled-components';
import theme from '../ui/theme';

function renderWithTheme(component: JSX.Element) {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
}

describe('FormFields', () => {
    it('should render FormField with an error', () => {
        renderWithTheme(<InputFormField label="Test Input" id="test-input" error="Test error" />);
        expect(screen.getByRole('alert')).toHaveTextContent('Test error');
    });

    it('should render InputFormField and accept input', () => {
        renderWithTheme(<InputFormField label="Test Input" id="test-input" />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test value' } });
        expect(screen.getByRole('textbox')).toHaveValue('test value');
    });

    it('should show a required mark for required fields', () => {
        renderWithTheme(<InputFormField label="Test Input" id="test-input" required />);
        expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render TextAreaFormField and accept input', () => {
        renderWithTheme(<TextAreaFormField label="Test TextArea" id="test-textarea" />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test value' } });
        expect(screen.getByRole('textbox')).toHaveValue('test value');
    });

    it('should render SelectFormField, display options and accept input', () => {
        renderWithTheme(<SelectFormField label="Test Select" id="test-select" options={['Option 1', 'Option 2']} />);
        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 1' } });
        expect(screen.getByRole('combobox')).toHaveValue('Option 1');
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('should render SelectFormField with placeholder', () => {
        renderWithTheme(<SelectFormField label="Test Select" id="test-select" options={['Option 1', 'Option 2']} placeholder="Select an option" />);
        expect(screen.getByText('Select an option')).toBeInTheDocument();
    });
});
