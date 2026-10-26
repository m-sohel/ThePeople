import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/context/SettingsContext';
import { useTranslation } from '@/i18n';

export default function TabLayout() {
  const { colors } = useSettings();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.saffron,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.tabBarBackground,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarLabel: t('tabs.home'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={(color as string) || colors.tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: t('tabs.browse'),
          tabBarLabel: t('tabs.browse'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={24} color={(color as string) || colors.tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="rights"
        options={{
          title: t('tabs.rights'),
          tabBarLabel: t('tabs.rights'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'shield-checkmark' : 'shield-checkmark-outline'} size={24} color={(color as string) || colors.tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: t('tabs.quiz'),
          tabBarLabel: t('tabs.quiz'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'ribbon' : 'ribbon-outline'} size={24} color={(color as string) || colors.tabIconDefault} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: t('tabs.bookmarks'),
          tabBarLabel: t('tabs.bookmarks'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bookmark' : 'bookmark-outline'} size={24} color={(color as string) || colors.tabIconDefault} />
          ),
        }}
      />
    </Tabs>
  );
}
