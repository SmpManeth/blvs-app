import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../auth/AuthContext';

export default function AuthLoadingScreen({ navigation }) {
  const { user, loading } = useContext(AuthContext);
  useEffect(() => {
    
    if (!loading) {
      if (user) {
        navigation.replace('Home'); // Replace with your main screen name
      } else {
        navigation.replace('Login');
      }
    }
  }, [user, loading]);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
