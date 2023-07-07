import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';

const GoogleLogin = () => {
    const GOOGLE_IOS_CLIENT_ID = '102386478714-31c49kh2k68tesptnfpnru8954o3d7jq.apps.googleusercontent.com';
    const GOOGLE_WEB_CLIENT_ID = '102386478714-tuohlkgdqhbh2bucif82qreaue1n5v8s.apps.googleusercontent.com';

    const [user, setUser] = useState({})
    
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile    
            webClientId: GOOGLE_WEB_CLIENT_ID,
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            iosClientId: GOOGLE_IOS_CLIENT_ID, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        isSignedIn()
    }, []);

const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      setUser(userInfo);
    } 
    catch (error) {
        console.log('Message', error.message);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
        } else {
        console.log('Some Other Error Happened');
        }
    }
  };

const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();

    if (!!isSignedIn) {
      getCurrentUserInfo()
    } else {
      console.log('Please Login')
    }
  };

const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
    } 
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } 
    catch (error) {
      console.error(error);
    }
  };

return (
    <View style={styles.main}>
      {!user.idToken ? 
        <GoogleSigninButton 
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        /> :
        <TouchableOpacity onPress={signOut}>
          <Text>Logout</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default GoogleLogin;