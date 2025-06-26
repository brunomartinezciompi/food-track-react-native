import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<any>;

interface MenuItemProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

function MenuItem({ title, subtitle, iconName, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemIcon}>
        <Ionicons name={iconName} size={24} color="#007AFF" />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );
}

export function More() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('profile.accountDetails'),
      subtitle: t('profile.accountDetailsSubtitle'),
      iconName: 'person-outline' as keyof typeof Ionicons.glyphMap,
      onPress: () => navigation.navigate('AccountDetails'),
    },
    {
      title: t('profile.settings'),
      subtitle: t('profile.settingsSubtitle'),
      iconName: 'settings-outline' as keyof typeof Ionicons.glyphMap,
      onPress: () => navigation.navigate('ProfileSettings'),
    },
    {
      title: t('profile.other'),
      subtitle: t('profile.otherSubtitle'),
      iconName: 'ellipsis-horizontal-outline' as keyof typeof Ionicons.glyphMap,
      onPress: () => navigation.navigate('Other'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            iconName={item.iconName}
            onPress={item.onPress}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});
