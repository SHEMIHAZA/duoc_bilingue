import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Exercise = ({
  question,
  options,
  answer,
  handleOptionPress,
  selectedOption,
  showResult,
}) => {
  const isCorrect = selectedOption === answer;
  const incorrectMessage = 'The correct answer is "' + answer + '".';
  const correctMessage = 'Correct!';
  const getOptionButtonStyle = (option) => {
    if (showResult) {
      if (option === answer) {
        return styles.correctOptionButton;
      } else if (option === selectedOption) {
        return styles.incorrectOptionButton;
      }
    }
    if (option === selectedOption) {
      return styles.selectedOptionButton;
    }
    return styles.optionButton;
  };

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
          style={getOptionButtonStyle(option)}
          onPress={() => handleOptionPress(option)}
          disabled={showResult}
        >
          <Text>{option}</Text>
            {isChosenAnswer && (
              <Text
                style={[
                  styles.answerText,
                  isCorrectAnswer ? styles.correctAnswerText : styles.incorrectAnswerText,
                ]}
              >
                {isCorrectAnswer ? correctMessage : incorrectMessage}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Guia1 = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (option, index) => {
    if (!showResult) {
      const updatedSelectedOptions = [...selectedOptions];
      updatedSelectedOptions[index] = option;
      setSelectedOptions(updatedSelectedOptions);
    }
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
      title: 'Simple Past of Be: was/were',
      justifyContent: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#6f6f5d',
        height: 110,
        borderBottomColor: '#6f6f5d',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  return (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.exercisesContainer}>
          {exercises.map((exercise, index) => (
            <Exercise
              key={index}
              question={exercise.question}
              options={exercise.options}
              answer={exercise.answer}
              handleOptionPress={(option) =>
                handleOptionPress(option, index)
              }
              selectedOption={selectedOptions[index]}
              showResult={showResult}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={checkAnswer}
          disabled={showResult}
        >
          <Text style={styles.checkButtonText}>Check your answers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetQuiz}
          disabled={!showResult}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quiz Results</Text>
            <Text style={styles.modalText}>
              Correct Answers: {countCorrectAnswers()}
            </Text>
            <Text style={styles.modalText}>
              Incorrect Answers: {countIncorrectAnswers()}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const exercises = [
  // Ejercicios...
  {
    question: '1. Daniel’s behaviour is bad, but Brian’s is____________',
    options: ['a) much worst', 'b) more worse', 'c) much worse', 'd) worst'],
    answer: 'c) much worse',
  },
  {
    question: '1. Daniel’s behaviour is bad, but Brian’s is____________',
    options: ['a) much worst', 'b) more worse', 'c) much worse', 'd) worst'],
    answer: 'c) much worse',
  },
  {
    question: '1. Daniel’s behaviour is bad, but Brian’s is____________',
    options: ['a) much worst', 'b) more worse', 'c) much worse', 'd) worst'],
    answer: 'c) much worse',
  },
  {
    question: '1. Daniel’s behaviour is bad, but Brian’s is____________',
    options: ['a) much worst', 'b) more worse', 'c) much worse', 'd) worst'],
    answer: 'c) much worse',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  exercisesContainer: {
    marginBottom: 20,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  questionText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOptionButton: {
    borderColor: '#6f6f5d',
    backgroundColor: '#DCDCD1',
    borderWidth: 2,
    opacity: 0.9,
    marginBottom:10,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  correctOptionButton: {
    borderColor: '#4CAF50',
  },
  incorrectOptionButton: {
    borderColor: '#F44336',
  },
  answerText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  correctAnswerText: {
    color: '#4CAF50',
  },
  incorrectAnswerText: {
    color: '#F44336',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
  },
  checkButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F44336',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 10,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  correctOptionButton: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  incorrectOptionButton: {
    borderWidth: 2,
    borderColor: '#F44336',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
});

export default Guia1;