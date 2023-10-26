import { isValidPhoneNumber } from "libphonenumber-js";

export function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export function isValidPhone(phone: string) {
    return isValidPhoneNumber(phone, 'US');
}

/**
 * 
 * @param field 
 * @param label 
 * @param value 
 * @param required 
 * @returns {null|string} null if there's no validation error
 */
export function validateField(field: string, label: string, value: string, required?: boolean) {
    if (required && value.trim() === "") {
        return `${label} is required`;
    }

    if (field === 'email' && !isValidEmail(value)) {
        return 'Please enter a valid email address';
    }

    if (field === 'phone' && !isValidPhone(value)) {
        return 'Please enter a valid phone, e.g +1 (123) 456-7890';
    }

    return null;
}