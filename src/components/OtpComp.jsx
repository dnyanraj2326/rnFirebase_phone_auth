import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';
import {Colors, FontFamily} from '../constant/Theme';

const OtpComp = ({setOtp, otp}) => {
  let valuesRef = useRef([]);
  const handleChnages = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length !== 0) {
      valuesRef.current.setNativeProps;
      return valuesRef.current[index + 1]?.focus();
    }
    return valuesRef.current[index - 1]?.focus();
  };

  const handleBackPress = (event, index) => {
    let {nativeEvent} = event;
    if (nativeEvent.key == 'Backspace') {
      handleChnages('', index);
    }
  };
  return (
    <View style={styles.container}>
      {[...new Array(6)].map((_, index) => (
        <TextInput
          ref={ref => {
            if (ref) {
              valuesRef.current = [...valuesRef.current, ref];
            }
          }}
          key={index}
          style={[
            styles.otpInput,
            otp[index].length == 1 ? {borderColor: 'green'} : {},
          ]}
          keyboardType="number-pad"
          maxLength={1}
          testID={`OtpInput${index}`}
          contextMenuHidden
          selectTextOnFocus
          onChangeText={text => handleChnages(text, index)}
          onKeyPress={event => handleBackPress(event, index)}
        />
      ))}
    </View>
  );
};

export default OtpComp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
  otpInput: {
    flex: 1,
    padding: moderateScale(5),
    backgroundColor: Colors.white,
    marginTop: moderateVerticalScale(20),
    borderWidth: 1,
    borderColor: Colors.Gray40,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: scale(20),
    fontFamily: FontFamily.fontBold,
    paddingVertical:moderateVerticalScale(10)
  },
});
