import { Text } from '@react-navigation/elements';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useTranslation } from 'react-i18next';

type ProfileScreenRouteProp = RouteProp<{
  Profile: { user?: string };
}, 'Profile'>;

export function Profile() {
  const route = useRoute<ProfileScreenRouteProp>();
  const colors = useColors();
  const { t } = useTranslation();
  // Default user if no params provided
  const userName = route.params?.user || 'Bruno Martinez';
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <View style={styles.avatarContainer}>
        <View style={[styles.avatar, { backgroundColor: colors.interactive.primary }]}>
          <Text style={styles.avatarText}>BM</Text>
        </View>
      </View>
      
      <Text style={[styles.name, { color: colors.text.primary }]}>{userName}</Text>
      <Text style={[styles.email, { color: colors.text.secondary }]}>bruno@foodtrack.com</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text.primary }]}>24</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{t('accountDetails.orders')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.text.primary }]}>⭐ 4.8</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{t('accountDetails.rating')}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.status.success }]}>$127</Text>
          <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{t('accountDetails.saved')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
  },
});
