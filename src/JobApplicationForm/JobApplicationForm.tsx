
import formFieldsJson from "../assets/data/form-fields.json";
import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppState } from "../appStore";
import { clearFieldError, setFieldError, setFieldValue, setFormSubmitted } from "./formReducer";
import { validateField } from "../utils/validation";
import { InputFormField, SelectFormField, TextAreaFormField } from "./FormFields";
import { Form, FormFieldGroup, SubmitButton, Title } from "./JobApplicationForm.styled";

type FormFieldObj = {
    id: string,
    placeholder: string,
    label: string,
    required?: boolean,
    type: string,
    options?: string[],
}

type FormFieldProps = {
    error?: string,
    value: string,
    onChange?: (e: any) => void
    onBlur?: (e: any) => void
} & FormFieldObj;

function FormField({ type, ...props }: FormFieldProps) {
    if (type === 'textarea') {
        return <TextAreaFormField {...props} />
    } if (type === 'select') {
        return <SelectFormField options={props.options || []} {...props} />
    }
    return <InputFormField {...props} />
}

export function JobApplicationForm() {
    const formFields: FormFieldObj[][] = formFieldsJson.map((field) => Array.isArray(field) ? field : [field]);
    // Form handles the state using a redux state, FormField children are stateless
    const dispatch = useDispatch();
    const values = useSelector((state: AppState) => state.form.values);
    const errors = useSelector((state: AppState) => state.form.errors);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let isValid = true;
        formFields.flat().forEach((field) => {
            const errorMessage = validateField(field.id, field.label, values[field.id], field.required);
            if (errorMessage) {
                dispatch(setFieldError({ field: field.id, error: errorMessage }));
                isValid = false;
            }
        });


        // Form is valid, dispatch action to go to success page
        if (isValid) {
            dispatch(setFormSubmitted());
        }
    };

    const handleFieldChange = (field: FormFieldObj, value: string) => {
        dispatch(setFieldValue({ field: field.id, value }));
        dispatch(clearFieldError(field.id));
    };

    const handleFieldBlur = (field: FormFieldObj, value: string) => {
        dispatch(setFieldValue({ field: field.id, value }));
        const errorMessage = validateField(field.id, field.label, value, field.required);
        if (errorMessage) {
            dispatch(setFieldError({ field: field.id, error: errorMessage }));
        } else {
            dispatch(clearFieldError(field.id));
        }
    };

    return (
        <>
            <Title>Job Application</Title>
            <Form onSubmit={handleSubmit} noValidate>
                {
                    formFields.map((formFieldGroup, index) => {
                        return (
                            <FormFieldGroup key={index}>
                                {
                                    formFieldGroup.map((field) => {
                                        return <FormField
                                            {...field}
                                            key={field.id}
                                            value={values[field.id]}
                                            error={errors[field.id]}
                                            onChange={(e) => { handleFieldChange(field, e.target.value) }}
                                            onBlur={(e) => { handleFieldBlur(field, e.target.value) }} />
                                    })
                                }
                            </FormFieldGroup>
                        )
                    })
                }
                <SubmitButton type="submit">
                    <span>SUBMIT</span>
                </SubmitButton>
            </Form>
        </>
    );
}