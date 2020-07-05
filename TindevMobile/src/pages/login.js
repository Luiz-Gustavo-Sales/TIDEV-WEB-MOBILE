import React, {useState, useEffect} from 'react';
import AsyncStorege from '@react-native-community/async-storage';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//importando a LOGO do APP
import logo from '../assets/logo.png';
//importando API
import api from '../services/api';
//import {asin} from 'react-native-reanimated';
const login = ({navigation: {navigate}}) => {
  const [user, setUser] = useState('');
  const [userPerfil, setUserPerfil] = useState([]);
  useEffect(() => {
    try {
      AsyncStorege.getItem('user').then((user) => {
        if (user) {
          navigate('Routes', {screen: 'Main', params: {user}});
        }
      });
      //deixando o [] - vazio vai se executado apenas uma vez
    } catch (error) {
      console.log('erro bem aqui no useEffect Login', error);
    }
  }, []);

  async function handleLogin() {
    try {
      //cadastrando um novo dev ou logando um dev na API( WEB)
      const response = await api.post('/devs', {username: user});
      //pegando ID do usuário
      const {_id} = response.data;
      //uma função assincona, vai salvar o usuário cadastrado
      await AsyncStorege.setItem('user', _id);
      AsyncStorege.setItem('perfil',JSON.stringify(response.data));
      //passando ID como parametro para a rota
      //usando setUser limpado o dado quando volta
      //navigate('Main', {user: _id});

      navigate('Routes', {screen: 'Main', params: {user: _id}});
    } catch (error) {
      console.log('DEU ERRO no handleLogin', error);
    }
  }

  /*
usando  onppress no botão (ENVIAR) para chamar a função para fazer login dos devs no APP

onChangeText=capturar o text digitado pelo usuário


*/
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        placeholder="Digite seu usuario"
        style={styles.input}
        placeholderTextColor="#f95"
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.TextButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingVertical: 250,
  },
  input: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 30,
    backgroundColor: '#fff',
    borderColor: '#ff4501',
    borderRadius: 20,
    paddingVertical: 15,
  },
  button: {
    marginTop: 25,
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#ff4501',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 25,
  },
  TextButton: {
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
