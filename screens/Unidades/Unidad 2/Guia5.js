import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const initialSentences = [
  { id: 1, sentence: "I ___ happy.", options: ['was', 'were'], answer: 'was', selected: null },
  { id: 2, sentence: "Where ___ you born?", options: ['was', 'were'], answer: 'were', selected: null },
  { id: 3, sentence: "In 1979, home consoles ___ very cheap.", options: ['was', 'were'], answer: 'were', selected: null },
  { id: 4, sentence: "The Tetris ___ an American game.", options: ['was', 'were'], answer: 'was', selected: null },
  { id: 5, sentence: "Sega Rally ___ a racing game.", options: ['was', 'were'], answer: 'was', selected: null },
  { id: 6, sentence: "Who ___ your first teacher?", options: ['was', 'were'], answer: 'was', selected: null },
  { id: 7, sentence: "When ___ your last birthday?", options: ['was', 'were'], answer: 'was', selected: null },
  { id: 8, sentence: "What ___ your favourite subjects last year?", options: ['was', 'were'], answer: 'were', selected: null },
  { id: 9, sentence: "Where ___ you at 8 o'clock this morning?", options: ['was', 'were'], answer: 'were', selected: null },
  { id: 10, sentence: "Alice ___ my best friend.", options: ['was', 'were'], answer: 'was', selected: null },
];

const QuizScreen = () => {
  const [sentences, setSentences] = useState(initialSentences);
  const [score, setScore] = useState(0);

  const handleAnswer = (sentenceId, option) => {
    const updatedSentences = sentences.map(sentence => {
      if (sentence.id === sentenceId) {
        return { ...sentence, selected: option };
      }
      return sentence;
    });
    setSentences(updatedSentences);
  };

  const checkAnswers = () => {
    const newScore = sentences.filter(sentence => sentence.selected === sentence.answer).length;
    setScore(newScore);
  };

  const restartQuiz = () => {
    setSentences(initialSentences);
    setScore(0);
  };

  const renderSentences = () => {
    return sentences.map(sentence => (
      <View key={sentence.id} style={styles.sentenceContainer}>
        <Text style={styles.sentence}>{sentence.sentence}</Text>
        <View style={styles.optionsContainer}>
          {sentence.options.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                { backgroundColor: sentence.selected === option ? '#6f6f5d' : '#f7f3f2' },
                sentence.selected === option ? styles.selectedOption : null,
              ]}
              onPress={() => handleAnswer(sentence.id, option)}
              disabled={score > 0}
            >
              <Text style={[styles.optionText, sentence.selected === option && styles.selectedOptionText]}>{option}</Text>
              {score > 0 && (
                <Ionicons
                  name={sentence.selected === option ? (option === sentence.answer ? 'checkmark-circle' : 'close-circle') : null}
                  size={24}
                  color={option === sentence.answer ? 'green' : 'red'}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    ));
  };

  const renderResults = () => {
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>Your score is {((score / sentences.length) * 100).toFixed(0)}%</Text>
      </View>
    );
  };

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Simple Past of Be: was/were',
      justifyContent: 'center',
      fontFamily: 'Poppins',
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete the sentences using was or were:</Text>
      {renderSentences()}
      {score > 0 && renderResults()}
      <View style={styles.buttonContainer}>
        <Button title="Check Answers" onPress={checkAnswers} disabled={score > 0} />
        <Button title="Restart Quiz" onPress={restartQuiz} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sentenceContainer: {
    marginBottom: 20,
  },
  sentence: {
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6f6f5d',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 16,
    color: '#6f6f5d',
    marginRight: 8,
  },
  selectedOption: {
    backgroundColor: '#6f6f5d',
  },
  selectedOptionText: {
    color: '#f7f3f2',
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default QuizScreen;
