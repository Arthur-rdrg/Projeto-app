import type { Dispatch, SetStateAction } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { shoppingStyles as styles } from '../../styles/shoppingStyles';
import { colors } from '../../styles/theme';
import type { ShoppingTab } from '../../types';

type BottomTab = {
  icon: keyof typeof Ionicons.glyphMap;
  id: ShoppingTab;
  label: string;
};

const tabs: BottomTab[] = [
  { icon: 'home-outline', id: 'home', label: 'Home' },
  { icon: 'list-outline', id: 'list', label: 'Lista' },
  { icon: 'checkmark-outline', id: 'check', label: 'Conferir' },
];

type BottomTabsProps = {
  activeTab: ShoppingTab;
  setActiveTab: Dispatch<SetStateAction<ShoppingTab>>;
};

export default function BottomTabs({ activeTab, setActiveTab }: BottomTabsProps) {
  return (
    <View style={styles.bottomTabs}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Pressable
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}
          >
            <Ionicons
              color={isActive ? colors.green : colors.mutedLight}
              name={tab.icon}
              size={22}
            />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
