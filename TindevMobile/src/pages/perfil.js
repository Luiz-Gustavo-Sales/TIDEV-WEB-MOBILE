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
import {useRoute} from '@react-navigation/native';
import api from '../services/api';
const Perfil = ({navigation: {navigate}}) => {
  const route = useRoute();
  const id = route.params.user;
  const [users, setUsers] = useState([]);
  console.log('VERIFICAR O NOME ' + id);

  useEffect(() => {
    try {
    
    async function UserPerfil() {
    
      const response = await api.get('/devs', {
        headers: {
          user: id,
        },
      });
      setUsers(response.data);
    }
    UserPerfil();
  } catch (error) {
      console.log('ERRO NO USEREFFECT')
  }
  
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerCards}>
        {users.map((user) => (
          <View key={user._id} style={styles.cards}>
            <Image
              alt={user.nameUser}
              style={styles.avatar}
              source={{
                uri: user.avatar,
              }}
            />
            <View style={styles.footer}>
              <Text style={styles.nameUser}>{user.name}</Text>
              <Text style={styles.BioUser} numberOfLines={2}>
                {user.bio}
              </Text>
            </View>
          </View>
        ))}
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
    backgroundColor: '#f5f5f5',
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
    borderRadius: 8,
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
