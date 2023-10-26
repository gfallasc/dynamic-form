import formFieldsJson from "../assets/data/form-fields.json";
import ValueDisplay from "./ValueDisplay";
import { FormValuesDisplay, Title, ValueDisplayGroup } from "./ThankYouPage.styled";

type ThankYouPageProps = {
    formData: {
        [key: string]: string
    }
};

export default function ThankYouPage({ formData }: ThankYouPageProps) {
    const isFieldValid = (field: { id: string }) => !!formData[field.id];
    const filteredValues = formFieldsJson
        .map(field => Array.isArray(field) ? field : [field]) // Make single fields into an array group
        .filter((group) => group.filter(isFieldValid).length > 0); // Filter out empty values

    return (
        <>
            <Title>Thank you!</Title>
            <p>Your Job Application has been successful submitted</p>
            <FormValuesDisplay>
                {
                    filteredValues.map((formFieldGroup, index) => {
                        const fields = formFieldGroup.filter(field => !!formData[field.id]);
                        return (
                            <ValueDisplayGroup key={index}>
                                {
                                    fields.map((field) => <ValueDisplay key={field.id} label={field.label} value={formData[field.id]} />)
                                }
                            </ValueDisplayGroup>
                        );
                    })
                }
            </FormValuesDisplay>
        </>
    );
}