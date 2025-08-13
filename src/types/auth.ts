// Auth related types
export interface SignUpFormData {
  email: string;
  password: string;
}

export interface SignUpFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Supabase error codes enum based on official documentation
// https://supabase.com/docs/reference/javascript/auth-error-codes
export enum SupabaseErrorCode {
  // Authentication errors
  EMAIL_EXISTS = 'email_exists',
  USER_ALREADY_EXISTS = 'user_already_exists',
  EMAIL_NOT_CONFIRMED = 'email_not_confirmed',
  WEAK_PASSWORD = 'weak_password',
  VALIDATION_FAILED = 'validation_failed',
  SESSION_NOT_FOUND = 'session_not_found',
  USER_NOT_FOUND = 'user_not_found',
  
  // Provider and signup errors
  SIGNUP_DISABLED = 'signup_disabled',
  EMAIL_PROVIDER_DISABLED = 'email_provider_disabled',
  PROVIDER_DISABLED = 'provider_disabled',
  
  // Rate limiting
  OVER_EMAIL_SEND_RATE_LIMIT = 'over_email_send_rate_limit',
  OVER_REQUEST_RATE_LIMIT = 'over_request_rate_limit',
  OVER_SMS_SEND_RATE_LIMIT = 'over_sms_send_rate_limit',
  
  // Security and validation
  CAPTCHA_FAILED = 'captcha_failed',
  SAME_PASSWORD = 'same_password',
  REAUTHENTICATION_NEEDED = 'reauthentication_needed',
  REAUTHENTICATION_NOT_VALID = 'reauthentication_not_valid',
  
  // Phone auth
  PHONE_EXISTS = 'phone_exists',
  PHONE_NOT_CONFIRMED = 'phone_not_confirmed',
  PHONE_PROVIDER_DISABLED = 'phone_provider_disabled',
  
  // MFA
  MFA_CHALLENGE_EXPIRED = 'mfa_challenge_expired',
  MFA_VERIFICATION_FAILED = 'mfa_verification_failed',
  MFA_VERIFICATION_REJECTED = 'mfa_verification_rejected',
  INSUFFICIENT_AAL = 'insufficient_aal',
  
  // General errors
  UNEXPECTED_FAILURE = 'unexpected_failure',
  CONFLICT = 'conflict',
  BAD_JWT = 'bad_jwt',
  NO_AUTHORIZATION = 'no_authorization',
}

// User-friendly error messages in Spanish
export const AUTH_ERROR_MESSAGES = {
  // Authentication errors
  [SupabaseErrorCode.EMAIL_EXISTS]: 'Ya existe una cuenta con este email.',
  [SupabaseErrorCode.USER_ALREADY_EXISTS]: 'El usuario ya está registrado.',
  [SupabaseErrorCode.EMAIL_NOT_CONFIRMED]: 'Por favor confirma tu email antes de iniciar sesión.',
  [SupabaseErrorCode.WEAK_PASSWORD]: 'La contraseña debe tener al menos 6 caracteres.',
  [SupabaseErrorCode.VALIDATION_FAILED]: 'Los datos ingresados no son válidos.',
  [SupabaseErrorCode.SESSION_NOT_FOUND]: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
  [SupabaseErrorCode.USER_NOT_FOUND]: 'Usuario no encontrado.',
  
  // Provider and signup errors
  [SupabaseErrorCode.SIGNUP_DISABLED]: 'El registro está temporalmente deshabilitado.',
  [SupabaseErrorCode.EMAIL_PROVIDER_DISABLED]: 'El registro por email está deshabilitado.',
  [SupabaseErrorCode.PROVIDER_DISABLED]: 'Este método de autenticación está deshabilitado.',
  
  // Rate limiting
  [SupabaseErrorCode.OVER_EMAIL_SEND_RATE_LIMIT]: 'Se han enviado demasiados emails. Intenta más tarde.',
  [SupabaseErrorCode.OVER_REQUEST_RATE_LIMIT]: 'Demasiadas solicitudes. Intenta en unos minutos.',
  [SupabaseErrorCode.OVER_SMS_SEND_RATE_LIMIT]: 'Se han enviado demasiados SMS. Intenta más tarde.',
  
  // Security and validation
  [SupabaseErrorCode.CAPTCHA_FAILED]: 'Error en la verificación de seguridad. Intenta nuevamente.',
  [SupabaseErrorCode.SAME_PASSWORD]: 'La nueva contraseña debe ser diferente a la actual.',
  [SupabaseErrorCode.REAUTHENTICATION_NEEDED]: 'Necesitas verificar tu identidad para continuar.',
  [SupabaseErrorCode.REAUTHENTICATION_NOT_VALID]: 'Código de verificación incorrecto.',
  
  // Phone auth
  [SupabaseErrorCode.PHONE_EXISTS]: 'Ya existe una cuenta con este número de teléfono.',
  [SupabaseErrorCode.PHONE_NOT_CONFIRMED]: 'Por favor confirma tu número de teléfono.',
  [SupabaseErrorCode.PHONE_PROVIDER_DISABLED]: 'El registro por teléfono está deshabilitado.',
  
  // MFA
  [SupabaseErrorCode.MFA_CHALLENGE_EXPIRED]: 'El código de verificación ha expirado.',
  [SupabaseErrorCode.MFA_VERIFICATION_FAILED]: 'Código de verificación incorrecto.',
  [SupabaseErrorCode.MFA_VERIFICATION_REJECTED]: 'Verificación rechazada.',
  [SupabaseErrorCode.INSUFFICIENT_AAL]: 'Se requiere autenticación adicional.',
  
  // General errors
  [SupabaseErrorCode.UNEXPECTED_FAILURE]: 'Error inesperado. Intenta nuevamente.',
  [SupabaseErrorCode.CONFLICT]: 'Error de conflicto. Intenta nuevamente.',
  [SupabaseErrorCode.BAD_JWT]: 'Tu sesión no es válida. Por favor inicia sesión nuevamente.',
  [SupabaseErrorCode.NO_AUTHORIZATION]: 'No autorizado. Inicia sesión para continuar.',
  
  // Fallback for unknown errors
  default: 'Ha ocurrido un error. Por favor intenta nuevamente.',
} as const; 