import React from 'react';
import { View, TouchableOpacity, Image, TouchableOpacityProps, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { useFonts, LilitaOne_400Regular } from '@expo-google-fonts/lilita-one';
import CustomText from '../../components/CustomText';

interface CustomButtonProps extends TouchableOpacityProps {
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...props }) => (
  <TouchableOpacity {...props} style={styles.inputSubmit}>
    <CustomText style={styles.buttonText}>{text}</CustomText>
  </TouchableOpacity>
);

export default function Index() {
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    LilitaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><CustomText>Carregando...</CustomText></View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.containerTitle}>
        <CustomText style={styles.title}>PARABÉNS!</CustomText>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/images/parabens.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.containerTitle}>
        <CustomText style={styles.text}>
          Parabéns, sua saúde bucal está excelente!
        </CustomText>
      </View>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </View>
  );
}