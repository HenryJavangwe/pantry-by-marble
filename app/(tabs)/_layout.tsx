import React from "react";
import { Tabs } from "expo-router";

import { useColorScheme } from "@/shared/components/useColorScheme";
import { useClientOnlyValue } from "@/shared/components/useClientOnlyValue";
import { NAV_TABS } from "@/core/constants/Tabs/tabs";
import { Colors } from "@/core/constants";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "#54634B",
          paddingTop: 10,
        },
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      {NAV_TABS.map(({ name, Icon, options }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            headerShown: options.headerShown,
            tabBarShowLabel: options.tabBarShowLabel,
            tabBarIcon: options.tabBarIcon,
          }}
        />
      ))}
    </Tabs>
  );
}
