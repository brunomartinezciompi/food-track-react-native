import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFormValidation } from '@hooks/useFormValidation';
import { useAuthContext } from '../../../contexts/AuthContext';
import { SignUpFormData } from '@/types/auth';

export function useSignUpForm() {
  const navigation = useNavigation();
  const { errors, validateSignUpForm, clearFieldError, isFormValid, validateEmailField, validatePasswordField } = useFormValidation();
  const { signUp } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
  });

  // Update form field and clear its error, validate if there was an error
  const updateField = useCallback((field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If there was an error, validate in real time to clear it
    if (errors[field]) {
      if (field === 'email') {
        setTimeout(() => validateEmailField(value), 0);
      } else if (field === 'password') {
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

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    const validationErrors = validateSignUpForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      const success = await signUp(formData.email, formData.password);
      
      if (success) {
        // Reset form on success
        setFormData({
          email: '',
          password: '',
        });
      }
    } finally {
      setLoading(false);
    }
  }, [formData, validateSignUpForm, signUp]);

  // Navigate back to Sign In with natural pop animation (left slide)
  const handleSignInPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Calculate if submit is disabled - memoized to avoid re-renders
  const isSubmitDisabled = !isFormValid(formData) || loading;

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
    handleSignInPress,
  };
} 