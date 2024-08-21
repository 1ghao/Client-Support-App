/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import ContactsScreen from '../contacts/ContactsScreen';
import MessagesScreen from '../chat/MessagesScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image} from 'react-native';

import messageIcon from '../../assets/common/icon_msg.png';
import contactIcon from '../../assets/common/icon_contacts.png';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      // tabBarPosition="bottom"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = messageIcon;

          if (route.name === '通讯录') {
            icon = contactIcon;
          }

          return (
            <Image
              source={icon}
              resizeMode="contain"
              style={{width: 20, height: 20}}
              tintColor={focused ? '#1F41BB' : 'black'}
            />
          );
        },
        tabBarActiveTintColor: '#1F41BB',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
      })}>
      <Tab.Screen name="信息" component={MessagesScreen} />
      <Tab.Screen name="通讯录" component={ContactsScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
