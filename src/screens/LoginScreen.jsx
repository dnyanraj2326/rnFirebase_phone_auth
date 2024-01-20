import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, FontFamily} from '../constant/Theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import ButtonsComp from '../components/ButtonsComp';
import OtpComp from '../components/OtpComp';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  let {width} = Dimensions.get('window');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [resendCodeTime, setResendCodeTime] = useState();
  const [resentCodeStarted, setResentCodeStarted] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButton = () => {
    try {
      if (phoneNumber.length !== 10) {
        return null;
      }
      Keyboard.dismiss();
      signInWithPhoneNumber(phoneNumber);
    } catch (error) {
      console.log('Something wemt wrong in login with phone number', error);
    }
  };
  useEffect(() => {
    let interval;
    if (resendCodeTime == 0) {
      clearInterval(interval);
      setResentCodeStarted(false);
    }
    if (resentCodeStarted && resendCodeTime > 0) {
      interval = setInterval(() => {
        setResendCodeTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [resendCodeTime, resentCodeStarted]);

  const resendCode = () => {
    setResentCodeStarted(true);
    signInWithPhoneNumber(phoneNumber);
    setResendCodeTime(30);
  };
  // Sign with phone number hnadler
  const signInWithPhoneNumber = async phoneNumber => {
    try {
      setLoading(true);
      let countryCode = '+91';
      let moNumber = countryCode.concat(phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(moNumber);
      setConfirm(confirmation);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully!"',
        text2: 'Your phone number sent the OTP successfully! 👋',
      });
      setLoading(false);
    } catch (error) {
      console.log('Something went wrong login functinality', error);
    }
  };
  //Conformation otp
  async function confirmCode() {
    try {
      setLoading(true);
      Keyboard.dismiss();
      let finalOtp = otp.join('');
      let info = await confirm.confirm(finalOtp);
      Toast.show({
        type: 'success',
        text1: 'OTP Verified!',
        text2: 'Your one-time password has been successfully verified 👋',
      });
      navigation.navigate('home');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Incorrect OTP!',
        text2: 'The entered OTP is incorrect. Please try again 😌',
      });
    }
  }
  const allFieldsFilled = otp?.every(field => field.length === 1);
  // Show only a portion of the number
  const hiddenPhoneNumber =
    phoneNumber.substring(0, 3) + '***' + phoneNumber.substring(6);

  if (confirm) {
    return (
      <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'android' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Image
            source={require('../assets/images/otp.jpg')}
            style={[styles.loginImg, {width: moderateScale(width)}]}
          />
          <View style={styles.loginSection}>
            <View style={styles.containtSection}>
              <Text style={styles.mainHed}>Enter your code</Text>
              <Text style={styles.mainPara}>
                {`Please enter the 6 digit verification code send to ${hiddenPhoneNumber}`}
              </Text>
            </View>
            <View>
              <OtpComp setOtp={setOtp} otp={otp} />
            </View>
            <View style={styles.resendCodeSection}>
              <TouchableOpacity
                onPress={resendCode}
                disabled={resentCodeStarted}>
                <Text
                  style={[
                    styles.resendcodeText,
                    resentCodeStarted ? {color: Colors.Gray40} : {},
                  ]}>
                  Resend code
                </Text>
              </TouchableOpacity>
              {resentCodeStarted && (
                <Text style={styles.resendcodeValue}>{resendCodeTime}</Text>
              )}
            </View>
            <View style={styles.btnSection}>
              <ButtonsComp
                title="Verify Otp"
                handleButton={confirmCode}
                disabled={!allFieldsFilled ? true : false}
                loading={loading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'android' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <Image
          source={require('../assets/images/login.jpg')}
          style={[styles.loginImg, {width: moderateScale(width)}]}
        />
        <View style={styles.loginSection}>
          <View style={styles.containtSection}>
            <Text style={styles.mainHed}>Enter your phone number</Text>
            <Text style={styles.mainPara}>
              You will recive a 4 digit code for phone number verification
            </Text>
          </View>
          <View style={styles.inputSection}>
            <Text style={styles.countyCode}>+91</Text>
            <Text style={styles.midLine}></Text>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={Colors.Gray40}
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              onChangeText={text => setPhoneNumber(text)}
            />
          </View>
          <View style={styles.btnSection}>
            <ButtonsComp
              title="Submit"
              handleButton={handleButton}
              disabled={phoneNumber?.length !== 10 ? true : false}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingBottom: moderateVerticalScale(20),
  },
  loginImg: {
    flex: 1,
  },
  mainHed: {
    fontSize: scale(20),
    fontFamily: FontFamily.fontBold,
    color: Colors.black,
  },
  mainPara: {
    fontSize: scale(12),
    fontFamily: FontFamily.fontRegular,
    color: Colors.Gray60,
    marginTop: moderateVerticalScale(5),
  },
  containtSection: {
    paddingHorizontal: moderateScale(20),
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(20),
    backgroundColor: '#F2F2F2',
    paddingHorizontal: moderateScale(15),
    borderRadius: 20,
    gap: 10,
    marginTop: moderateVerticalScale(30),
    height: verticalScale(55),
  },
  input: {
    flex: 1,
    fontSize: scale(16),
    fontFamily: FontFamily.fontMedium,
  },
  countyCode: {
    fontSize: scale(16),
    fontFamily: FontFamily.fontMedium,
    color: Colors.black,
  },
  midLine: {
    borderRightWidth: 2,
    borderRightColor: '#b3b3b3',
    height: '70%',
    borderRadius: 5,
  },
  btnSection: {
    marginTop: moderateVerticalScale(30),
  },
  loginSection: {
    // flex: 1,
  },
  resendCodeSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: moderateVerticalScale(20),
    alignItems: 'center',
  },
  resendcodeText: {
    fontSize: scale(14),
    fontFamily: FontFamily.fontMedium,
    color: Colors.black,
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
  resendcodeValue: {
    fontSize: scale(14),
    fontFamily: FontFamily.fontMedium,
    color: Colors.black,
    marginLeft: moderateScale(5),
  },
});
