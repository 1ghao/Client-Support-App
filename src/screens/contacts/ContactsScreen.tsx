import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Button} from 'react-native';

const ContactsScreen = ({navigation}) => {
  return (
    <Button
      title="reset"
      onPress={() => {
        AsyncStorage.removeItem('user_token');
        navigation.replace('Splash');
      }}
    />
  );
};

export default ContactsScreen;
