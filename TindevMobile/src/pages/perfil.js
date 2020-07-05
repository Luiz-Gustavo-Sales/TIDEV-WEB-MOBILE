import React, {useState, useEffect} from 'react';
import AsyncStorege from '@react-native-community/async-storage';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  findNodeHandle,
} from 'react-native';

const Perfil = () => {
  const [userPerfil, setPerfil] = useState('');
  useEffect(() => {
    const getUser = async () => {
      try {
        let user = await AsyncStorege.getItem('perfil');

       await setPerfil(JSON.parse(user));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerCards}>
        <View style={styles.cards}>
          <Image
            alt={userPerfil.nameUser}
            source={{
              uri: userPerfil.avatar,
            }}
            style={styles.avatar}
          />
          <View style={styles.footer}>
            <Text style={styles.nameUser}>{userPerfil.user}</Text>
            <Text style={styles.BioUser} numberOfLines={2}>
              {userPerfil.bio}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerCards: {
    marginBottom: -60,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },
  cards: {
    borderColor: '#DDD',
   borderTopLeftRadius: 800,
    borderTopRightRadius:800 ,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatar: {
    height: 300,
  },
  footer: {
    marginTop: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    margin: 10,
  },
  nameUser: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#332',
    marginVertical: 2,
  },
  BioUser: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  containerCurtidas: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  Buttom: {
    width: 60,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
  },
});
