/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {pxToDp} from '../../utils/screen-utils';
import {login} from '../../request/userapi';
import {toastError} from '../../utils/toasts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountName, setAcountName] = useState('');
  const [password, setPassword] = useState('');

  async function requestLogin() {
    setIsLoading(true);
    const res = await login({
      username: accountName,
      password: password,
    });
    if (!res) {
      setIsLoading(false);
      return;
    }

    if (res.data.success) {
      AsyncStorage.setItem('user_token', res.data.data.token);
      console.log('token  ', res.data.data.token);
      navigation.replace('Home');
    } else {
      toastError('错误', res.data.msg);
    }
    setIsLoading(false);
  }

  function handleLogin() {
    if (!accountName) {
      toastError('请输入帐号');
      return;
    }
    if (!password) {
      toastError('请输入密码');
      return;
    }
    try {
      requestLogin();
    } catch (error) {
      toastError(String(error));
    }
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        gap: pxToDp(16),
        backgroundColor: '#FFFFFF',
        padding: pxToDp(30),
      }}>
      <Text
        style={{
          marginBottom: pxToDp(30),
          fontSize: pxToDp(26),
          fontWeight: 'bold',
          color: '#1F41BB',
        }}>
        登录
      </Text>
      <TextInput
        placeholder="帐号"
        onChangeText={setAcountName}
        value={accountName}
        style={styles.loginInput}
      />
      <TextInput
        placeholder="密码"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.loginInput}
      />

      <TouchableOpacity onPress={handleLogin} style={{width: '100%'}}>
        <Text
          style={[
            styles.loginInput,
            {
              marginTop: pxToDp(30),
              backgroundColor: '#1F41BB',
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
            },
          ]}>
          进入
        </Text>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator size={'large'} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  loginInput: {
    width: '100%',
    backgroundColor: '#F1F4FF',
    borderColor: '#1F41BB',
    borderWidth: pxToDp(2),
    borderRadius: pxToDp(8),
    padding: pxToDp(10),
    fontSize: pxToDp(18),
  },
});

export default LoginScreen;
