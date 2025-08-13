import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColors } from '@hooks/useColors';
import { useSignInForm } from '../hooks/useSignInForm';
import { FormInput, SubmitButton } from '../../SignUp/components';

export default function SignInForm() {
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
    handleSignUpPress,
  } = useSignInForm();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <FormInput
          label={t('auth.signIn.email')}
          placeholder={t('auth.signIn.emailPlaceholder')}
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
          label={t('auth.signIn.password')}
          placeholder={t('auth.signIn.passwordPlaceholder')}
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
        title={t('auth.signIn.signInButton')}
        loading={loading}
        disabled={isSubmitDisabled}
        onPress={handleSubmit}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSignUpPress} disabled={loading}>
          <Text style={[styles.signUpText, { color: colors.interactive.primary }]}>
            {t('auth.signIn.noAccountLink')}
          </Text>
        </TouchableOpacity>
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
  signUpText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
}); 