import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {pxToDp} from '../utils/screen-utils';

interface HeaderNavProps {
  componentLeft?: any;
  componentRight?: any;
  title?: string;
  titlePosition?: 'center' | 'left' | 'right';
}

const HeaderNav: React.FC<HeaderNavProps> = ({
  componentLeft,
  componentRight,
  title,
  titlePosition = 'center',
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {textAlign: titlePosition}]}>{title}</Text>
      <View style={styles.componentLeft}>
        {componentLeft && componentLeft()}
      </View>
      <View style={styles.componentRight}>
        {componentRight && componentRight()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: pxToDp(50),
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: pxToDp(10),
    elevation: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  title: {
    flex: 1,
    color: '#000000',
    fontSize: pxToDp(20),
    fontWeight: 'bold',
  },
  componentLeft: {
    flex: 1,
    paddingLeft: pxToDp(10),
    position: 'absolute',
    left: 0,
  },
  componentRight: {
    flex: 1,
    paddingRight: pxToDp(10),
    position: 'absolute',
    right: 0,
  },
});

export default HeaderNav;
