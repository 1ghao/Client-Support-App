import React, {useState} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {getToken} from '../../request';

const SplashScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(true);

  getToken().then(value => {
    setIsLoading(false);
    navigation.replace(value === null ? 'Login' : 'Home');
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={isLoading}
        color="#1F41BB"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
