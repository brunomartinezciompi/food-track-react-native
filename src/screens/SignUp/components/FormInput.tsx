import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@hooks/useColors';

interface FormInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  value: string;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
}

export default function FormInput({
  label,
  error,
  icon,
  secureTextEntry = false,
  onChangeText,
  value,
  onBlur,
  onSubmitEditing,
  ...textInputProps
}: FormInputProps) {
  const colors = useColors();
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry;
  const shouldShowPassword = isPasswordField && showPassword;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.primary }]}>
        {label}
      </Text>
      
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: colors.background.secondary,
          borderColor: error ? colors.status.error : colors.border.primary,
        }
      ]}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={colors.text.tertiary} 
            style={styles.inputIcon}
          />
        )}
        
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholderTextColor={colors.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={isPasswordField && !showPassword}
          {...textInputProps}
        />
        
        {isPasswordField && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            disabled={textInputProps.editable === false}
          >
            <Ionicons 
              name={shouldShowPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color={colors.text.tertiary} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={[styles.errorText, { color: colors.status.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    marginTop: 6,
    marginLeft: 4,
  },
}); 