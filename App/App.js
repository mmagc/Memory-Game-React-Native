import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const symbols = ['🍎', '🍉', '🍌', '🍊', '🍇', '🍓', '🍒', '🥭'];
    const initialCards = symbols.concat(symbols).sort(() => 0.5 - Math.random());
    setCards(initialCards);
    setFlipped([]);
    setMatched([]);
    setCurrentPlayer(1);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || matched.includes(index)) return;

    setFlipped([...flipped, index]);

    if (flipped.length === 1) {
      if (cards[flipped[0]] === cards[index]) {
        setMatched([...matched, flipped[0], index]);
        updateScore(currentPlayer);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1000);
      }
    }
  };

  const updateScore = (player) => {
    if (player === 1) {
      setPlayer1Score(player1Score + 1);
    } else {
      setPlayer2Score(player2Score + 1);
    }
  };

  const renderCard = (index) => {
    if (flipped.includes(index) || matched.includes(index)) {
      return <Text style={styles.card}>{cards[index]}</Text>;
    } else {
      return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => handleCardClick(index)}>
          <Text style={styles.card}>?</Text>
        </TouchableOpacity>
      );
    }
  };

  const checkGameEnd = () => {
    if (matched.length === cards.length) {
      const winner = player1Score > player2Score ? 'Player 1' : 'Player 2';
      Alert.alert('Congratulations!', `${winner} wins the game!`, [{ text: 'OK', onPress: initializeGame }]);
    }
  };

  useEffect(() => {
    checkGameEnd();
  }, [matched]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Player 1: {player1Score}</Text>
        <Text style={styles.score}>Player 2: {player2Score}</Text>
      </View>
      <View style={styles.board}>
        {cards.map((_, index) => (
          <View key={index} style={styles.cardWrapper}>
            {renderCard(index)}
          </View>
        ))}
      </View>
      <Text style={styles.currentPlayer}>Current Player: {currentPlayer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardWrapper: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  cardContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  card: {
    fontSize: 30,
    color: 'white',
  },
  currentPlayer: {
    fontSize: 20,
    marginTop: 10,
  },
});

export default MemoryGame;
