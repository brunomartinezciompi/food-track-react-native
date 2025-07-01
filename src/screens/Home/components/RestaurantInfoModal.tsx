import React from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';

interface RestaurantInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function RestaurantInfoModal({ visible, onClose }: RestaurantInfoModalProps) {
  const { t } = useTranslation();
  const colors = useColors();
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
        <View style={[styles.header, { borderBottomColor: colors.border.primary }]}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>{t('restaurantInfo.title')}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={[styles.iconContainer, { backgroundColor: colors.status.success + '20' }]}>
              <Ionicons name="restaurant" size={32} color={colors.status.success} />
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Our Story</Text>
            <Text style={[styles.sectionText, { color: colors.text.secondary }]}>
              FoodTrack has been serving delicious, authentic pizzas since 2020. 
              We're passionate about using fresh, locally-sourced ingredients to create 
              unforgettable dining experiences for our community.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={[styles.iconContainer, { backgroundColor: colors.status.success + '20' }]}>
              <Ionicons name="leaf" size={32} color={colors.status.success} />
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Fresh Ingredients</Text>
            <Text style={[styles.sectionText, { color: colors.text.secondary }]}>
              Every pizza is made with hand-selected ingredients. From our signature 
              dough made fresh daily to our organic vegetables and premium meats, 
              quality is our top priority.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={[styles.iconContainer, { backgroundColor: colors.status.success + '20' }]}>
              <Ionicons name="time" size={32} color={colors.status.success} />
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Quick Delivery</Text>
            <Text style={[styles.sectionText, { color: colors.text.secondary }]}>
              Our efficient kitchen and delivery team ensure your order arrives hot 
              and fresh, typically within 15-25 minutes of ordering.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={[styles.iconContainer, { backgroundColor: colors.status.success + '20' }]}>
              <Ionicons name="heart" size={32} color={colors.status.success} />
            </View>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Community First</Text>
            <Text style={[styles.sectionText, { color: colors.text.secondary }]}>
              We're proud to be part of this amazing community. We support local 
              farmers, participate in community events, and strive to make every 
              customer feel like family.
            </Text>
          </View>

          <View style={[styles.contactSection, { backgroundColor: colors.background.secondary }]}>
            <Text style={[styles.contactTitle, { color: colors.text.primary }]}>Get in Touch</Text>
            <View style={styles.contactItem}>
              <Ionicons name="location" size={20} color={colors.text.secondary} />
              <Text style={[styles.contactText, { color: colors.text.primary }]}>123 Pizza Street, Food City</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color={colors.text.secondary} />
              <Text style={[styles.contactText, { color: colors.text.primary }]}>(555) 123-PIZZA</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color={colors.text.secondary} />
              <Text style={[styles.contactText, { color: colors.text.primary }]}>hello@foodtrack.com</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  contactSection: {
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    fontSize: 16,
  },
}); 