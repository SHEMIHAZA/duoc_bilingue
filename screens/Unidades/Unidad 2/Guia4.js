import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Exercise = ({ question, options, answer, handleOptionPress, selectedOption, showResult }) => {
  const isCorrect = selectedOption === answer;
  const incorrectMessage = 'Incorrect! The correct answer is ' + answer + '.';
  const correctMessage = 'Correct!';

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isCurrentAnswer = answer === option;
        const isChosenAnswer = showResult && isSelected;
        const isCorrectAnswer = isChosenAnswer && isCorrect;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(option)}
            style={[
              styles.optionButton,
              isSelected && styles.selectedOptionButton,
              isChosenAnswer && isCorrectAnswer && styles.correctOptionButton,
              isChosenAnswer && !isCorrectAnswer && styles.incorrectOptionButton,
            ]}
          >
            <Text>{option}</Text>
            {isChosenAnswer && (
              <Text style={isCorrectAnswer ? styles.correctAnswerText : styles.incorrectAnswerText}>
                {isCorrectAnswer ? correctMessage : incorrectMessage}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Guia4 = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option, index) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[index] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedOptions([]);
    setShowResult(false);
    setModalVisible(false);
  };

  const showQuizResults = () => {
    setModalVisible(true);
  };

  const countCorrectAnswers = () => {
    let count = 0;
    selectedOptions.forEach((option, index) => {
      if (option === exercises[index].answer) {
        count++;
      }
    });
    return count;
  };

  const countIncorrectAnswers = () => {
    const totalQuestions = exercises.length;
    const correctAnswers = countCorrectAnswers();
    return totalQuestions - correctAnswers;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Simple Past of Be: was/were",
      justifyContent: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#C2185B",
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
  }, []);

  const exercises = [
    {
      question: "1. Daniel’s behaviour is bad, but Brian’s is____________",
      options: ["a) much worst", "b) more worse", "c) much worse", "d) worst"],
      answer: "c) much worse",
    },

    {
      question: "2. They___________a photo when I was on the podium",
      options: ["a) were taken", "b) had taken", "c) are taking", "d) took"],
      answer: "d) took",
    },

    {
      question: "3. What are you going to____________in the interview?",
      options: ["a) tell", "b) told", "c) say", "d) saying"],
      answer: "c) say",
    },

    {
      question: "4. What did your mother___________you when she found out?",
      options: ["a) tell", "b) say", "c) said", "d) told"],
      answer: "a) tell",
    },

  
    // ... Agrega más objetos de ejercicio aquí ...
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#34494E','#DCDCD1']} // Colores del degradado
          start={[1, 0]} // Punto de inicio del degradado (opcional)
          end={[1, 1]} // Punto de finalización del degradado (opcional)
          style={styles.gradientContainer} // Estilo del degradado
        >
          <Text style={styles.text}>
            Remember this: we often add -er or -or to a verb, e.g., writer, actor. We often add -ian, -ist or man / woman to a noun, e.g., musician.
          </Text>
        </LinearGradient>

      </View>

      {exercises.map((exercise, index) => (
        <View key={index} style={{ margin: 15 }}>
          <Exercise
            question={exercise.question}
            options={exercise.options}
            answer={exercise.answer}
            handleOptionPress={(option) => handleOptionPress(option, index)}
            selectedOption={selectedOptions[index]}
            showResult={showResult}
          />
        </View>
      ))}

      <View>
        <TouchableOpacity
          
          onPress={(showQuizResults, checkAnswer)}
          
        >
          <LinearGradient colors={["#009FAC","#009FAC"]} 
            style={styles.gradientButton}>

          <Text style={styles.btnAnswer}>
            Check your Answers
          </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Your quiz results:
            </Text>
            <Text style={styles.correctResultText}>
              Correct Answers: {countCorrectAnswers()}
            </Text>
            <Text style={styles.incorrectResultText}>
              Incorrect Answers: {countIncorrectAnswers()}
            </Text>
            <TouchableOpacity
              onPress={resetQuiz}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Guia4;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    
  },
  exerciseContainer: {
    marginBottom: 20,
    marginTop: 30,
  },
  questionText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black"
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: "#FF4081",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    height: 50,
  },
  checkAnswerButton: {
    marginTop: 20,
    borderColor: "#FF4081",
    color: "black",
  },
  checkAnswerButtonText: {
    color: "black",
  },
  correctAnswerText: {
    color: '#009966',
    marginTop: 10,
    margin: 25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  incorrectAnswerText: {
    color: '#D92121',
    marginTop: 10,
    margin: 25,
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedOptionButton: {
    backgroundColor: "#FF1151",
    opacity: 0.6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  correctResultText: {
    color: '#009966',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  incorrectResultText: {
    color: '#D92121',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'green',
    marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctOptionButton: {
    backgroundColor: '#009966',
    opacity: 0.6,
  },
  incorrectOptionButton: {
    backgroundColor: '#D92121',
    opacity: 0.6,
  },
  gradientButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    height: 50,
    overflow: 'hidden',
    marginBottom: 30,
    textAlign:"center",
    opacity: 0.7,
  },
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

  },
  btnAnswer:{
    fontSize: 15,
    marginTop:3,

  }
});
