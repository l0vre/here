import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const StudentScreen = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
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
    </View>
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
});

export default StudentScreen;
