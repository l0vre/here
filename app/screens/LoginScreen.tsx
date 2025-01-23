import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';

const StudentScreen = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [isWriting, setIsWriting] = useState(false);
  const [nfcStatus, setNfcStatus] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  useEffect(() => {
    NfcManager.start()
      .then(() => {
        checkNfcStatus();
        addLog('NFC Manager started.');
      })
      .catch((err) => addLog(`Error starting NFC Manager: ${err}`));

    return () => {
      addLog('Stopping NFC Manager...');
      NfcManager.stop();
    };
  }, []);

  const checkNfcStatus = async () => {
    const isSupported = await NfcManager.isSupported();
    if (!isSupported) {
      addLog('NFC is not supported on this device.');
      Alert.alert('NFC Not Supported', 'Your device does not support NFC.');
      return;
    }

    const isEnabled = await NfcManager.isEnabled();
    setNfcStatus(isEnabled);
    addLog(`NFC is ${isEnabled ? 'ON' : 'OFF'}`);

    if (!isEnabled) {
      promptEnableNfc();
    }
  };

  const promptEnableNfc = () => {
    Alert.alert(
      'NFC is Off',
      'Please enable NFC to use this feature.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go to Settings',
          onPress: () => NfcManager.goToNfcSetting(),
        },
      ],
      { cancelable: false }
    );
  };
  const writeNdef = async () => {
    let result = false;
    addLog('Attempting to write NFC tag...');

    try {
      addLog('Requesting NFC technology...');
      let resp = await NfcManager.requestTechnology(NfcTech.Ndef);
      addLog(`Technology response: ${resp}`);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
        addLog("Successfully wrote NFC tag with message 'Hello NFC'");
      }
    } catch (ex) {
      addLog(`Error writing NFC tag: ${ex}`);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  };

  const handleContainerPress = async () => {
    if (isWriting) {
      addLog('Tag already being written!');
      return;
    }

    setIsWriting(true);
    const success = await writeNdef();
    setIsWriting(false);

    if (success) {
      addLog('NFC Tag Written Successfully!');
    } else {
      addLog('Failed to write NFC Tag!');
    }
  };

  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
      <View style={styles.container}>
        <Text style={[styles.nfcStatus, nfcStatus ? styles.nfcOn : styles.nfcOff]}>
          NFC is {nfcStatus ? 'ON' : 'OFF'}
        </Text>

        <Text style={styles.subtitle}>Scan your card to mark attendance</Text>
        <Animated.View style={[styles.card, { transform: [{ scale: pulseAnim }] }]}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.profileImage}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cardName}>Lovre Gradac</Text>
            <Text style={styles.cardInfo}>Student ID: 123456</Text>
            <Text style={styles.cardInfo}>Department: Računarstvo (250)</Text>
            <Text style={styles.cardInfo}>Year: 2.</Text>
          </View>
        </Animated.View>

        <Text style={styles.logHeader}>Console log:</Text>
        <ScrollView style={styles.logContainer}>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logText}>
              {log}
            </Text>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
  },
  nfcStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  nfcOn: {
    color: '#FFFFFF',
    backgroundColor: '#00A86B',
  },
  nfcOff: {
    color: '#FFFFFF',
    backgroundColor: '#FF4500',
  },
  subtitle: {
    fontSize: 18,
    color: '#194aa4',
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#194aa4',
    width: '90%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 15,
  },
  cardDetails: {
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardInfo: {
    fontSize: 14,
    color: '#D3E3FF',
    marginBottom: 3,
  },
  logHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  logContainer: {
    width: '100%',
    maxHeight: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  logText: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 3,
  },
});

export default StudentScreen;
