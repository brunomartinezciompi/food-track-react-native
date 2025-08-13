import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormValidation } from '@hooks/useFormValidation';
import { useAuthContext } from '../../../contexts/AuthContext';

interface SignInFormData {
  email: string;
  password: string;
}

export function useSignInForm() {
  const navigation = useNavigation();
  const {
    validateEmailField,
    validatePasswordField,
    validateEmail,
    validatePassword,
    isFormValid,
    errors,
    clearFieldError,
  } = useFormValidation();
  const { signIn } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });

  // Update form field and clear its error, validate if there was an error
  const updateField = useCallback((field: keyof SignInFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If there was an error, validate in real time to clear it
    if (errors[field]) {
      if (field === 'email') {
        // For email, validate immediately if there was an error
        setTimeout(() => validateEmailField(value), 0);
      } else if (field === 'password') {
        // For password, validate immediately if there was an error and it's not empty
        setTimeout(() => validatePasswordField(value), 0);
      }
    } else {
      // Clear field error if no error yet
      clearFieldError(field);
    }
  }, [errors, clearFieldError, validateEmailField, validatePasswordField]);

  // Handle email validation on blur/submit
  const handleEmailValidation = useCallback(() => {
    validateEmailField(formData.email);
  }, [formData.email, validateEmailField]);

  // Handle password validation on blur/submit (only if not empty)
  const handlePasswordValidation = useCallback(() => {
    validatePasswordField(formData.password);
  }, [formData.password, validatePasswordField]);

  // Validate form for submission using same rules as sign up
  const validateForm = useCallback((): boolean => {
    // trigger error messages state updates
    validateEmailField(formData.email);
    validatePasswordField(formData.password);

    // compute validity synchronously
    return isFormValid({ email: formData.email, password: formData.password });
  }, [formData, validateEmailField, validatePasswordField, isFormValid]);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const success = await signIn(formData.email, formData.password);
      
      if (success) {
        // Reset form on success
        setFormData({
          email: '',
          password: '',
        });
        // Navigation will be handled automatically by auth state change
      }
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm, signIn]);

  // Navigate to Sign Up with natural push animation (right slide)
  const handleSignUpPress = useCallback(() => {
    navigation.navigate('SignUp' as never);
  }, [navigation]);

  // Disable submit if there are validation errors or while loading
  const isSubmitDisabled = useCallback(() => {
    return Boolean(validateEmail(formData.email) || validatePassword(formData.password) || loading);
  }, [formData.email, formData.password, validateEmail, validatePassword, loading])();

  return {
    // State
    formData,
    errors,
    loading,
    isSubmitDisabled,
    
    // Actions
    updateField,
    handleEmailValidation,
    handlePasswordValidation,
    handleSubmit,
    handleSignUpPress,
  };
} 