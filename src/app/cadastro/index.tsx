import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text, TouchableHighlight, StatusBar, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import MaskInput from 'react-native-mask-input';
import CustomText from '../components/CustomText';
import Body from '../components/Body';
import { styles } from './styles';

export default function Index() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const sexo = [
    { id: 1, texto: 'Feminino' },
    { id: 2, texto: 'Masculino' },
    { id: 3, texto: 'Voltar' },
  ];

  const handleSubmit = async () => {
    if (!nome || !cpf || !idade || !genero) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    
    try {
      const response = await fetch('http://192.168.1.2:3535/addpaciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          idade: idade,
          sexo: genero,
          cod_paciente: id,
        }),
      });
  
      if (response.ok) {
        // Se a resposta estiver OK, podemos prosseguir com a navegação ou outra ação necessária
        Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
        setId('');
        setNome('');
        setCPF('');
        setIdade('');
        setGenero('');
        router.replace('/');
      } else {
        // Se houve um erro na requisição, vamos verificar se a resposta não está vazia antes de tentar analisar como JSON
        const responseData = await response.text();
        const errorMessage = responseData || 'Erro ao cadastrar paciente. Por favor, tente novamente.';
        Alert.alert('Erro', errorMessage);
      }
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
      Alert.alert('Erro', 'Erro ao cadastrar paciente. Por favor, tente novamente.');
    }
  };
  
  
  

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View><CustomText>Carregando...</CustomText></View>;
  }

  const CPF_MASK = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Body />
      <TouchableOpacity style={styles.smallSquareButton} onPress={() => router.back()}>
        <CustomText style={styles.smallSquareButtonText}>←</CustomText>
      </TouchableOpacity>
      <View style={styles.overlayContent}>
        <CustomText style={styles.title}>CADASTRO</CustomText>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CÓDIGO:</CustomText>
            <TextInput
              keyboardType='numeric'
              style={styles.input}
              onChangeText={setId}
              value={id}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>NOME:</CustomText>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              value={nome}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>CPF:</CustomText>
            <MaskInput
              keyboardType='numeric'
              placeholder='000.000.000-00'
              style={styles.input}
              value={cpf}
              onChangeText={(masked, unmasked) => {
                setCPF(masked); // store masked value in state
              }}
              mask={CPF_MASK}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>IDADE:</CustomText>
            <TextInput
              keyboardType='numeric'  
              style={styles.input}
              onChangeText={setIdade}
              value={idade}
            />
          </View>

          <View style={styles.inputContainer}>
            <CustomText style={styles.text}>SEXO:</CustomText>
            <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
              <CustomText style={styles.textSelected}>{genero || 'Selecionar'}</CustomText>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={styles.inputSubmit} onPress={handleSubmit}>
          <CustomText style={styles.buttonText}>CADASTRAR </CustomText>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {sexo.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    if(item.texto !== 'Voltar') {
                      setGenero(item.texto);
                    }
                    setModalVisible(!modalVisible);
                  }}
                 
                >
                  <Text >{item.texto}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
