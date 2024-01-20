import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Colors, FontFamily} from '../constant/Theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const ButtonsComp = ({
  title,
  handleButton = () => {},
  disabled = false,
  loading,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnSection,
        disabled ? {backgroundColor: Colors.Gray40} : {},
      ]}
      onPress={handleButton}
      disabled={loading}>
      <Text style={styles.btnText}>{title}</Text>
      {loading && (
        <Image
          source={require('../assets/icons/loadding.gif')}
          style={styles.loading}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonsComp;

const styles = StyleSheet.create({
  btnSection: {
    backgroundColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    borderRadius: 20,
    height: verticalScale(50),
    marginHorizontal: moderateScale(20),
    justifyContent: 'center',
  },
  btnText: {
    fontSize: scale(18),
    fontFamily: FontFamily.fontSemiBold,
    color: Colors.white,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  loading: {
    width: scale(25),
    height: scale(25),
    marginLeft: moderateScale(10),
    tintColor: Colors.white,
  },
});
