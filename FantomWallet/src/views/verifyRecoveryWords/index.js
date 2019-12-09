import React, { Component } from "react";
import { View, WebView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import CheckBox from "../../general/checkBox";
import styles from "./style";
import Button from "../../general/button";
import { Colors } from "../../theme";
export default class VerifyRecoveryWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      selectedWords: [],
      mnemonicWords: [],
      realWord: []
    };
  }
  componentDidMount() {
    const { navigation } = this.props;

    //navigation.getParam('seed', 'NO-ID'),
    const mnemonicWords = navigation.getParam("mnemonicWords", "NO-ID");
    this.setState({ mnemonicWords, realWord: mnemonicWords });
  }
  handleWordClick = selected => {
    
    const { selectedWords, mnemonicWords, realWord } = this.state;
    let newWords = selectedWords;
    let remainingWords = mnemonicWords;
    const index = remainingWords.findIndex(item => item === selected);
    remainingWords.splice(index, 1);
    newWords.push(selected);
    this.setState({ selectedWords: newWords, mnemonicWords: remainingWords });
    if (selectedWords.length === realWord.length) {
      this.setState({ isEnable: true });
    } else {
      this.setState({ isEnable: false });
    }
  };

  render() {
    const { isEnable, selectedWords, mnemonicWords } = this.state;

    return (
      <View style={styles.mainContainerStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBar barStyle="light-content" /> */}
          <View style={styles.flex1}>
            <View style={styles.mainHeadingContainer}>
              <Text style={styles.mainHeading}>Verify recovery words</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                Tap the words to put them in the correct order.
              </Text>
            </View>
            <View
              style={{
                ...styles.verfiyContainer,
                borderColor: !isEnable ? "transparent" : Colors.red
              }}
            >
              <View style={styles.textContainer}>
                {selectedWords && selectedWords.length ? (
                  selectedWords.map((val, i) => {
                    return (
                      <View key={i} style={styles.wordWrap}>
                        <Text style={styles.selectedTextView}>{val}</Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.selectedTextView} />
                )}
              </View>
              {!isEnable && (
                <Text style={styles.errorText}>
                  Incorrect order. Try again!
                </Text>
              )}
            </View>
          </View>

          {/* <View style={styles.flex1}> */}
          <View style={styles.textContainer}>
            {mnemonicWords && mnemonicWords.length ? (
              mnemonicWords.map((val, i) => {
                return (
                  <View key={i} style={styles.wordWrap}>
                    <Text
                      onPress={() => this.handleWordClick(val)}
                      style={styles.selectedTextView}
                    >
                      {val}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={styles.selectedTextView}>No Data</Text>
            )}
          </View>

          <View style={{flex:0.5}}>
            <Button
              buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor: isEnable
                  ? Colors.royalBlue
                  : Colors.greyOpacity
              }}
              textStyle={styles.buttonText}
              text={"CONTINUE"}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
