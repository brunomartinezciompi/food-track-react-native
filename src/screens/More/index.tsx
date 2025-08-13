import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useColors } from '@/hooks/useColors';
import { useAuthContext } from '../../contexts/AuthContext';
import { RestaurantInfoModal } from '../Home/components';

type NavigationProp = NativeStackNavigationProp<any>;

interface MenuItemProps {
  title: string;
  subtitle: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  isSignOut?: boolean;
}

function MenuItem({ title, subtitle, iconName, onPress, isSignOut }: MenuItemProps) {
  const colors = useColors();
  
  return (
    <TouchableOpacity 
      style={[
        styles.menuItem, 
        { 
          backgroundColor: colors.background.card,
          borderColor: isSignOut ? colors.status.error : colors.border.primary,
          borderWidth: 1,
        }
      ]} 
      onPress={onPress}
    >
      <View style={[
        styles.menuItemIcon, 
        { backgroundColor: isSignOut ? colors.status.errorLight : colors.background.tertiary }
      ]}>
        <Ionicons 
          name={iconName} 
          size={24} 
          color={isSignOut ? colors.status.error : colors.interactive.primary} 
        />
      </View>
      <View style={styles.menuItemContent}>
        <Text style={[
          styles.menuItemTitle, 
          { color: isSignOut ? colors.status.error : colors.text.primary }
        ]}>
          {title}
        </Text>
        <Text style={[styles.menuItemSubtitle, { color: colors.text.secondary }]}>
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.text.tertiary} />
    </TouchableOpacity>
  );
}

export function More() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();
  const colors = useColors();
  const { signOut } = useAuthContext();
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setInfoModalVisible(true)}
        >
          <Ionicons name="information-circle-outline" size={24} color={colors.interactive.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

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
    {
      title: t('auth.signOut'),
      subtitle: 'Cerrar tu sesión actual',
      iconName: 'log-out-outline' as keyof typeof Ionicons.glyphMap,
      onPress: signOut,
      isSignOut: true,
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.secondary }]}>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            iconName={item.iconName}
            onPress={item.onPress}
            isSignOut={item.isSignOut}
          />
        ))}
      </View>
      
      <RestaurantInfoModal
        visible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerButton: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
  },
});
