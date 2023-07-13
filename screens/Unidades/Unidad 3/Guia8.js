import { View, Text } from 'react-native'
import React from 'react'

const Guia8 = () => {
  return (
    
   
    <TouchableOpacity
        key={index}
        style={getOptionButtonStyle(option)}
        onPress={() => handleOptionPress(option)}
        disabled={showResult}
    >
        <LinearGradient
        colors={[
            isCorrectAnswer ? '#4CAF50' : '#F44336',
            isCorrectAnswer ? '#DCDCD1' : '#ffffff',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.optionButton}
        >
        <Text>{option}</Text>
        </LinearGradient>
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
};

export default Guia8


