import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import formFieldsJson from "../assets/data/form-fields.json";

export type FormState = {
    values: { [key: string]: string };
    errors: { [key: string]: string };
    isSubmitted: boolean;
};

// Set initial form state values using id as the keys
const initialValues = formFieldsJson.flat().reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
}, {} as { [key: string]: string });

const initialState: FormState = {
    values: initialValues,
    errors: {},
    isSubmitted: false,
};

type FieldValuePayload = { 
    field: string; 
    value: string;
};

type FieldErrorPayload = { 
    field: string; 
    error: string;
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFieldValue: (state, action: PayloadAction<FieldValuePayload>) => {
            state.values[action.payload.field] = action.payload.value;
        },
        setFieldError: (state, action: PayloadAction<FieldErrorPayload>) => {
            state.errors[action.payload.field] = action.payload.error;
        },
        clearFieldError: (state, action: PayloadAction<string>) => {
            delete state.errors[action.payload];
        },
        setFormSubmitted: (state) => {
            state.isSubmitted = true;
        },
    },
});

export const { setFieldValue, setFieldError, clearFieldError, setFormSubmitted } = formSlice.actions;
export default formSlice.reducer;