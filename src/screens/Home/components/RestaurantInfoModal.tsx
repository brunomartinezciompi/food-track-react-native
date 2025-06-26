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

interface RestaurantInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function RestaurantInfoModal({ visible, onClose }: RestaurantInfoModalProps) {
  const { t } = useTranslation();
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('restaurantInfo.title')}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <Ionicons name="restaurant" size={32} color="#059669" />
            </View>
            <Text style={styles.sectionTitle}>Our Story</Text>
            <Text style={styles.sectionText}>
              FoodTrack has been serving delicious, authentic pizzas since 2020. 
              We're passionate about using fresh, locally-sourced ingredients to create 
              unforgettable dining experiences for our community.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <Ionicons name="leaf" size={32} color="#059669" />
            </View>
            <Text style={styles.sectionTitle}>Fresh Ingredients</Text>
            <Text style={styles.sectionText}>
              Every pizza is made with hand-selected ingredients. From our signature 
              dough made fresh daily to our organic vegetables and premium meats, 
              quality is our top priority.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <Ionicons name="time" size={32} color="#059669" />
            </View>
            <Text style={styles.sectionTitle}>Quick Delivery</Text>
            <Text style={styles.sectionText}>
              Our efficient kitchen and delivery team ensure your order arrives hot 
              and fresh, typically within 15-25 minutes of ordering.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.iconContainer}>
              <Ionicons name="heart" size={32} color="#059669" />
            </View>
            <Text style={styles.sectionTitle}>Community First</Text>
            <Text style={styles.sectionText}>
              We're proud to be part of this amazing community. We support local 
              farmers, participate in community events, and strive to make every 
              customer feel like family.
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Get in Touch</Text>
            <View style={styles.contactItem}>
              <Ionicons name="location" size={20} color="#6B7280" />
              <Text style={styles.contactText}>123 Pizza Street, Food City</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="call" size={20} color="#6B7280" />
              <Text style={styles.contactText}>(555) 123-PIZZA</Text>
            </View>
            <View style={styles.contactItem}>
              <Ionicons name="mail" size={20} color="#6B7280" />
              <Text style={styles.contactText}>hello@foodtrack.com</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
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
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
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
    color: '#374151',
  },
}); 