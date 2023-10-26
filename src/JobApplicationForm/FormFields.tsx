import { Input, Label, RequiredMark, FormFieldWrapper, FormFieldError, TextArea, Select } from "./FormFields.styled";

type FormFieldBaseProps = {
    label: string;
    error?: string;
    id: string;
    render?: (hasError: boolean) => React.ReactNode;
    required?: boolean;
};

type InputFormFieldProps = FormFieldBaseProps & React.InputHTMLAttributes<HTMLInputElement>;
type TextAreaFormFieldProps = FormFieldBaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectFormFieldProps = FormFieldBaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
};

export function FormField({ label, id, error, required, render }: FormFieldBaseProps) {
    const hasError = !!error && error !== "";

    return (
        <FormFieldWrapper>
            <Label htmlFor={id}>{label} {required && <RequiredMark>*</RequiredMark>}</Label>
            {!!render && render(hasError)}
            {
                hasError && <FormFieldError role="alert">{error}</FormFieldError>
            }
        </FormFieldWrapper>
    );
}

export function InputFormField({ ...props }: InputFormFieldProps) {
    return (
        <FormField {...props} render={(hasError) => <Input {...props} aria-required={props.required} aria-describedby={props.error} aria-invalid={hasError} $error={hasError} />} />
    );
}

export function TextAreaFormField({ ...props }: TextAreaFormFieldProps) {
    return (
        <FormField {...props} render={(hasError) => <TextArea {...props} rows={props.rows || 5} $error={hasError} />} />
    );
}

export function SelectFormField({ options, ...props }: SelectFormFieldProps) {
    return (
        <FormField {...props} render={(hasError) => {
            return (
                <Select {...props} $error={hasError}>
                    {
                        props.placeholder !== "" &&
                        <option key={props.placeholder} hidden value="">{props.placeholder} </option>
                    }
                    {
                        options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))
                    }
                </Select>
            )
        }} />
    );
}
