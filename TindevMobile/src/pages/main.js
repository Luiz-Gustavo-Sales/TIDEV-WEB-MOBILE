import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import {useRoute} from '@react-navigation/native';
//Story
import AsyncStorege from '@react-native-community/async-storage';

export default function main({navigation: {navigate}}) {
  //usando useRoute para pegar os parametros da outra rota
  const route = useRoute();
  //pegando o parametro e passado para a variavel ID
  const id = route.params.user;
 
  //const id =route.params;

  const [users, setUsers] = useState([]);

  //reload do usuário quando fizer login
  useEffect(() => {
    try {
    
    async function loadUser() {
      const response = await api.get('/devs', {
        headers: {
          user: id,
        },
      });
      setUsers(response.data);
    }
    loadUser();
  } catch (error) {
      console.log('ERRO NO USEREFFECT')
  }
  
  }, [id]);

  async function Like() {
    /*pegando o array users
    
    e passando o primeiro valor para o (user)=0
    ...rest recebe o resto do array que sobrar
    */
    try {
      const [user, ...rest] = users;

      await api.post(`/devs/${user._id}/likes`, null, {
        headers: {user: id},
      });
      setUsers(rest);
      console.log('deu like');
    } catch (error) {
      console.log('ERRO NA FUNÇÃO LIKE', error);
    }
  }

  async function Dislike() {
    try {
      const [user, ...rest] = users;
      //seungundo params é o corpo da requisições só com terceiro parametro consigo enviar os headers
      await api.post(`/devs/${user._id}/dislikes`, null, {
        headers: {user: id},
      });
      setUsers(rest);
      console.log('deu dislike');
    } catch (error) {
      console.log('ERRO NA FUNÇÃO DISLIKE', error);
    }
  }

  async function logot() {
    await AsyncStorege.clear();
navigate('Login');
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => logot()}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.containerCards}>
        {users.length === 0 ? (
          <Text>ACABOU</Text>
        ) : (
          users.map((user, index) => (
            <View
              key={user._id}
              style={[styles.cards, {zIndex: users.length - index}]}>
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
          ))
        )}
      </View>

      <View style={styles.containerCurtidas}>
        <TouchableOpacity style={styles.Buttom} onPress={() => Like()}>
          <Image source={like} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.Buttom} onPress={() => Dislike()}>
          <Image source={dislike} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
