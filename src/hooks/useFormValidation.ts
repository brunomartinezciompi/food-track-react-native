import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpFormData, SignUpFormErrors } from '@/types/auth';

// Email validation regex (basic but robust)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
const PASSWORD_MIN_LENGTH = 8;

/**
 * Hook for form validation logic
 * Separates validation concerns from UI components
 */
export function useFormValidation() {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<SignUpFormErrors>({});

  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return t('auth.validation.emailRequired');
    }
    if (!EMAIL_REGEX.test(email)) {
      return t('auth.validation.emailInvalid');
    }
    return undefined;
  }, [t]);

  const validatePassword = useCallback((password: string): string | undefined => {
    if (!password) {
      return t('auth.validation.passwordRequired');
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
      return t('auth.validation.passwordMinLength', { min: PASSWORD_MIN_LENGTH });
    }
    return undefined;
  }, [t]);

  // Validate email field in real time (always validate format)
  const validateEmailField = useCallback((email: string) => {
    const error = validateEmail(email);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors.email = error;
      } else {
        delete newErrors.email;
      }
      return newErrors;
    });
  }, [validateEmail]);

  // Validate password field in real time (only if not empty)
  const validatePasswordField = useCallback((password: string) => {
    if (password.trim() === '') {
      // Clear password error if empty
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
      return;
    }

    const error = validatePassword(password);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) {
        newErrors.password = error;
      } else {
        delete newErrors.password;
      }
      return newErrors;
    });
  }, [validatePassword]);

  const validateSignUpForm = useCallback((formData: SignUpFormData): SignUpFormErrors => {
    const newErrors: SignUpFormErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return newErrors;
  }, [validateEmail, validatePassword]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: keyof SignUpFormErrors) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const isFormValid = useCallback((formData: SignUpFormData): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    
    return !emailError && !passwordError;
  }, [validateEmail, validatePassword]);

  return {
    errors,
    validateSignUpForm,
    clearErrors,
    clearFieldError,
    isFormValid,
    validateEmail,
    validatePassword,
    validateEmailField,
    validatePasswordField,
  };
} 