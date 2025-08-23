import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function Splash({ navigation }) {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      // Navigate to Home after animation completes
      setTimeout(() => {
        navigation.replace('Login');
      }, 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/icon.png')} style={styles.logoImage} />
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            {
                             width: progressAnim.interpolate({
                 inputRange: [0, 1],
                 outputRange: ['0%', '100%'],
               }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  progressContainer: {
    width: 200,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },
});
