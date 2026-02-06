// Validation Functions

// Validate email
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Validate password
export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
};

// Get password strength
export const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { level: 'weak', color: 'red' };
    if (strength <= 4) return { level: 'medium', color: 'yellow' };
    return { level: 'strong', color: 'green' };
};

// Validate phone number
export const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
};

// Validate credit card number (basic Luhn algorithm)
export const validateCreditCard = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleaned)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
};

// Validate CVV
export const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
};

// Validate expiry date
export const validateExpiryDate = (month, year) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const expMonth = parseInt(month);
    const expYear = parseInt(year);

    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;

    return true;
};

// Validate ZIP code
export const validateZipCode = (zip) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
};

// Validate required field
export const validateRequired = (value) => {
    return value && value.trim().length > 0;
};

// Validate min length
export const validateMinLength = (value, minLength) => {
    return value && value.length >= minLength;
};

// Validate max length
export const validateMaxLength = (value, maxLength) => {
    return value && value.length <= maxLength;
};

// Validate number range
export const validateRange = (value, min, max) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
};

export default {
    validateEmail,
    validatePassword,
    getPasswordStrength,
    validatePhone,
    validateCreditCard,
    validateCVV,
    validateExpiryDate,
    validateZipCode,
    validateRequired,
    validateMinLength,
    validateMaxLength,
    validateRange,
};
