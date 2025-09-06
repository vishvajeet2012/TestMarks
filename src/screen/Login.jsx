import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import imageBanner from "../../assets/pexels-willoworld-3768005.jpg"
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { login } from "../redux/slices/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading, error, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    checkExistingToken();
  }, []);

  useEffect(() => {
    if (token) {
      try {
        navigation.replace('Home');
      } catch (error) {
        console.log('Home not found, trying other routes...');
      }
      
    }
  }, [token]);

  const checkExistingToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('userToken');
      if (savedToken) {
        
        try {
          navigation.replace('Home');
        } catch (error) {
          console.log('Navigation error, will handle after component loads');
        }
      }
    } catch (error) {
      console.error('Error checking token:', error);
    } finally {
      setIsCheckingToken(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      console.log('Login successful:', result);
      
      if (result.token) {
        await AsyncStorage.setItem('userToken', result.token);
      }
      
    } catch (error) {
      Alert.alert('Login Failed', error || 'Something went wrong');
    }
  };

  if (isCheckingToken) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#e11b23" />
        <Text style={styles.loadingText}>Checking authentication...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.imageContainer}>
        <Image
          source={imageBanner}
          style={styles.logo}
          resizeMode="cover" 
        />
        <View style={styles.imageOverlay} />
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.welcomeText}>
          Welcome 
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            autoCorrect={false}
            style={styles.loginInput}
            placeholderTextColor="#ccc"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            autoCorrect={false}
            style={styles.loginInput}
            placeholderTextColor="#ccc"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Pressable 
            style={[styles.buttonContainer, loading && styles.buttonDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.btn}>Login</Text>
            )}
          </Pressable>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    height: "45%",
    width: "100%",
    position: "relative",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  loginContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  loginInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#e11b23",
    height: 50,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  btn: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#ffe6e6",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    width: "100%",
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    fontSize: 14,
  },
});