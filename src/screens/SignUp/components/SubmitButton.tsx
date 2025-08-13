import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, TouchableOpacityProps } from 'react-native';
import { useColors } from '@hooks/useColors';

interface SubmitButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

export default function SubmitButton({
  title,
  loading = false,
  disabled = false,
  onPress,
  ...touchableProps
}: SubmitButtonProps) {
  const colors = useColors();

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { 
          backgroundColor: isDisabled 
            ? colors.interactive.disabled 
            : colors.interactive.primary 
        }
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={colors.text.inverse} 
          testID="submit-button-loading"
        />
      ) : (
        <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
}); 