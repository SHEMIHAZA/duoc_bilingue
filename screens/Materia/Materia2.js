import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const Materia2 = () => {
  const navigation = useNavigation();
  const handlePress = (questionIndex, selectedImage) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages[questionIndex] = selectedImage;
    setSelectedImages(updatedSelectedImages);
  };

  const [audioInstance, setAudioInstance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/21114043535.mp3?alt=media&token=daafc33b-6001-47b4-a760-fa0544eaeb58';

  const playAudio = async () => {
    try {
      if (audioInstance !== null) {
        await audioInstance.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
      setAudioInstance(sound);
      setIsPlaying(true);
    } catch (error) {
      console.log('Error al cargar y reproducir el audio:', error);
    }
  };

  const stopAudio = async () => {
    try {
      if (audioInstance) {
        await audioInstance.stopAsync();
        await audioInstance.unloadAsync();
      }
      setIsPlaying(false);
      setSliderValue(0);
    } catch (error) {
      console.log('Error al detener el audio:', error);
    }
  };

  useEffect(() => {
    if (audioInstance !== null) {
      // Obtener la posición y la duración actual del audio
      audioInstance.getStatusAsync().then(status => {
        setPositionMillis(status.positionMillis);
        setDurationMillis(status.durationMillis);
      });

      // Actualizar la posición del slider cada 500 milisegundos mientras se reproduce el audio
      const interval = setInterval(async () => {
        const status = await audioInstance.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          setPositionMillis(status.positionMillis);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [audioInstance]);

  // Nueva función para controlar el cambio en el valor del slider
  const onSliderValueChange = (value) => {
    setSliderValue(value);
  };

  // Nueva función para ajustar la posición del audio cuando se completa el deslizamiento del slider
  const onSlidingComplete = async (value) => {
    if (audioInstance !== null) {
      await audioInstance.setPositionAsync(value);
      setSliderValue(value);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "TIEMPOS VERBALES",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#6f6f5d",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, [navigation]);

  const [selectedImages, setSelectedImages] = useState([
    { questionIndex: 0, selectedImage: null },
    { questionIndex: 1, selectedImage: null },
    { questionIndex: 2, selectedImage: null },
    { questionIndex: 3, selectedImage: null },
    { questionIndex: 4, selectedImage: null },
  ]);

  // Función para manejar el evento de presionar una imagen
  const handleImagePress = (questionIndex, imageName) => {
    const updatedSelectedImages = [...selectedImages];
    updatedSelectedImages[questionIndex] = imageName;
    setSelectedImages(updatedSelectedImages);
  };
  const correctAnswers = ['image2', 'image1', 'image3', 'image2', 'image1'];
  const [results, setResults] = useState(Array(5).fill(null));

  const checkAnswers = () => {
    let correctCount = 0;
    const newResults = selectedImages.map((selectedImage, index) => {
      const isCorrect = selectedImage === correctAnswers[index];
      if (isCorrect) {
        correctCount++;
      }
      return isCorrect;
    });
    setResults(newResults);
    // Muestra una alerta con el puntaje obtenido
    alert(`You got ${correctCount} out of 5 questions correct.`);
  };

  return (
    <>
      <ImageBackground source={require("../assets/images/oatmeal-11.jpg")} style={{ flex: 1, resizeMode: "cover" }}>
        <SafeAreaView>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {/*  Titulo   */}
              <Text style={{
                textAlign: 'center', marginTop: 20, fontFamily: "Poppins", textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15, fontSize: 18, marginLeft: 10, marginRight: 10
              }}>
                For each question, choose the correct answer.
              </Text>
            </View>
            {/* Audio */}
            <View style={{ marginLeft: 10, marginRight: 10, borderRadius: 5, marginBottom: 25, opacity: 0.9, marginTop: 30 }}>
              <TouchableOpacity onPress={isPlaying ? stopAudio : playAudio}>
                {isPlaying ? (
                  <Ionicons name="ios-pause" size={24} color="black" />
                ) : (
                  <Ionicons name="ios-play" size={24} color="black" />
                )}
              </TouchableOpacity>
              {/* barra de navegación de audio */}
              <View style={{ marginHorizontal: 20, textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 15 }}>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0}
                  maximumValue={durationMillis}
                  value={sliderValue}
                  minimumTrackTintColor="#6f6f5d"
                  maximumTrackTintColor="#6f6f5d"
                  thumbTintColor="#6f6f5d"
                  onValueChange={onSliderValueChange}
                  onSlidingComplete={onSlidingComplete}
                />
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins', marginTop: 5 }}>
                  {formatTime(positionMillis)} / {formatTime(durationMillis)}
                </Text>
              </View>
            </View>

            {/* Pregunta 1 */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>1. How did the woman travel to work this morning?</Text>
              <ScrollView horizontal showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(0, 'image1')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fauto.jpg?alt=media&token=e90550a1-6515-4408-acae-3cd198c80bff',
                      }}
                      style={[
                        styles.image,
                        selectedImages[0] === 'image1' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(0, 'image2')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Ftren.jpg?alt=media&token=28b867c4-32f0-4705-a62d-d760e715108c',
                      }}
                      style={[
                        styles.image,
                        selectedImages[0] === 'image2' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(0, 'image3')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fbus.jpg?alt=media&token=c064b3bd-67af-4933-b160-8cd4690ad61b',
                      }}
                      style={[
                        styles.image,
                        selectedImages[0] === 'image3' && styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.resultContainer}>
                {results[0] === true && <Text style={styles.correctText}>Correct</Text>}
                {results[0] === false && <Text style={styles.incorrectText}>Incorrect</Text>}
              </View>
            </View>

            {/* Pregunta 2 */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>2. What will the man eat first at the restaurant?</Text>
              <ScrollView horizontal showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(1, 'image1')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fplato.jpg?alt=media&token=452802fc-bd10-4e7d-b83e-68a76ad58888',
                      }}
                      style={[
                        styles.image,
                        selectedImages[1] === 'image1' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(1, 'image2')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fensalada.jpg?alt=media&token=a2597588-9c7f-431f-9dac-526a77d902a7',
                      }}
                      style={[
                        styles.image,
                        selectedImages[1] === 'image2' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(1, 'image3')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fsopa.jpg?alt=media&token=0fd88c9c-8826-4a1c-b5e0-a5ae71063092',
                      }}
                      style={[
                        styles.image,
                        selectedImages[1] === 'image3' && styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.resultContainer}>
                {results[1] === true && <Text style={styles.correctText}>Correct</Text>}
                {results[1] === false && <Text style={styles.incorrectText}>Incorrect</Text>}
              </View>
            </View>

            {/* Pregunta 3 */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>3. Which was the view from the woman's hotel room?</Text>
              <ScrollView horizontal showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(2, 'image1')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fisla.jpg?alt=media&token=bd5e3093-e30f-4651-a5a8-1342ea310ba7',
                      }}
                      style={[
                        styles.image,
                        selectedImages[2] === 'image1' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(2, 'image2')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fpiscina.jpg?alt=media&token=f67070a0-165d-46eb-aa3e-3c5ae338739b',
                      }}
                      style={[
                        styles.image,
                        selectedImages[2] === 'image2' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(2, 'image3')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fplaya.jpg?alt=media&token=fc01eaa6-74b6-40b2-8d21-1eb0f027bb0c',
                      }}
                      style={[
                        styles.image,
                        selectedImages[2] === 'image3' && styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.resultContainer}>
                {results[2] === true && <Text style={styles.correctText}>Correct</Text>}
                {results[2] === false && <Text style={styles.incorrectText}>Incorrect</Text>}
              </View>
            </View>

            {/* Preunta 4 */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>4. Why will the man miss the concert tonight?</Text>
              <ScrollView horizontal showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(3, 'image1')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fcabeza.jpg?alt=media&token=278d7e7a-9526-4635-9d66-4c7dd00c6bfa',
                      }}
                      style={[
                        styles.image,
                        selectedImages[3] === 'image1' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(3, 'image2')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fmuela.jpg?alt=media&token=e9940736-c3b9-442f-8828-798b610cf174',
                      }}
                      style={[
                        styles.image,
                        selectedImages[3] === 'image2' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(3, 'image3')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Festomago.jpg?alt=media&token=04c2d2c4-3b86-4f65-9715-43f6bc62f920',
                      }}
                      style={[
                        styles.image,
                        selectedImages[3] === 'image3' && styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.resultContainer}>
                {results[3] === true && <Text style={styles.correctText}>Correct</Text>}
                {results[3] === false && <Text style={styles.incorrectText}>Incorrect</Text>}
              </View>
            </View>

            {/* Pregunta 5 */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>5. What will the woman wear for the party?</Text>
              <ScrollView horizontal showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(4, 'image1')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fvestido.jpg?alt=media&token=fbae1bf9-67e7-42c8-8353-d2a056743c2c',
                      }}
                      style={[
                        styles.image,
                        selectedImages[4] === 'image1' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(4, 'image2')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fsweater.jpg?alt=media&token=2db88078-bae7-407b-93d0-00e189eb849c',
                      }}
                      style={[
                        styles.image,
                        selectedImages[4] === 'image2' && styles.selectedImage, // Updated here
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => handleImagePress(4, 'image3')}>
                    <Image
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/duoc-bilingue.appspot.com/o/Imagenes%2Fropa.jpg?alt=media&token=65fbb291-ec9d-4609-9726-5fff3a9c1b1d',
                      }}
                      style={[
                        styles.image,
                        selectedImages[4] === 'image3' && styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View style={styles.resultContainer}>
                {results[4] === true && <Text style={styles.correctText}>Correct</Text>}
                {results[4] === false && <Text style={styles.incorrectText}>Incorrect</Text>}
              </View>
            </View>
                        
            {/* Boton Check */}
            <TouchableOpacity onPress={checkAnswers} style={styles.checkButton}>
              <Text style={styles.checkButtonText}>Check your answers</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const formatTime = (timeInMillis) => {
  const minutes = Math.floor(timeInMillis / 60000);
  const seconds = ((timeInMillis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Materia2;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  answerButton: {
    backgroundColor: '#f7f3f2',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  correctButton: {
    backgroundColor: '#5f6f5d',
  },

  answerText: {
    fontSize: 13,
    color: '#272525',
  },
  title: {
    marginTop: 20,
    fontFamily: "Poppins",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 15,
    fontSize: 15,
    marginLeft: 15,
    marginRight: 10
  },
  questionContainer: {
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 10,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins'
  },
  checkButton: {
    backgroundColor: '#6f6f5d',
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  checkButtonText: {
    color: '#f7f3f2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  correctText: {
    color: 'green',
    fontSize: 14,
  },
  incorrectText: {
    color: 'red',
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 20,
  },

  // Nuevo estilo para las imágenes seleccionadas
  selectedImage: {
    borderWidth:3, // Opacidad reducida para imágenes seleccionadas
  },
});