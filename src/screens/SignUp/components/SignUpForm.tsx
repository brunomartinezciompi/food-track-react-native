import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColors } from '@hooks/useColors';
import { useSignUpForm } from '../hooks/useSignUpForm';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';

export default function SignUpForm() {
  const { t } = useTranslation();
  const colors = useColors();
  
  const {
    formData,
    errors,
    loading,
    isSubmitDisabled,
    updateField,
    handleEmailValidation,
    handlePasswordValidation,
    handleSubmit,
    handleSignInPress,
  } = useSignUpForm();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormInput
          label={t('auth.signUp.email')}
          placeholder={t('auth.signUp.emailPlaceholder')}
          icon="mail-outline"
          value={formData.email}
          onChangeText={(value: string) => updateField('email', value)}
          onBlur={handleEmailValidation}
          onSubmitEditing={handleEmailValidation}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          editable={!loading}
        />

        <FormInput
          label={t('auth.signUp.password')}
          placeholder={t('auth.signUp.passwordPlaceholder')}
          icon="lock-closed-outline"
          value={formData.password}
          onChangeText={(value: string) => updateField('password', value)}
          onBlur={handlePasswordValidation}
          onSubmitEditing={handlePasswordValidation}
          error={errors.password}
          secureTextEntry
          returnKeyType="done"
          editable={!loading}
        />
      </View>

      <SubmitButton
        title={t('auth.signUp.signUpButton')}
        loading={loading}
        disabled={isSubmitDisabled}
        onPress={handleSubmit}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSignInPress} disabled={loading}>
          <Text style={[styles.signInText, { color: colors.interactive.primary }]}>
            {t('auth.signUp.hasAccountLink')}
          </Text>
        </TouchableOpacity>
        
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          {t('auth.signUp.termsText')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    marginBottom: 32,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
  },
  signInText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
}); 