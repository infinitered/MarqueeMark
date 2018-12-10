import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Animated,
  Easing
} from 'react-native'

export default class App extends Component {
  state = { fontSize: 18 }
  opacityValue = new Animated.Value(1)

  startAnimating = () => {
    let myAnimation
    // Fade out
    // this.opacityValue.setValue(1)
    // myAnimation = Animated.timing(this.opacityValue, {
    //   toValue: 0,
    //   duration: 5000,
    //   useNativeDriver: true
    // })

    // Pulse
    myAnimation = Animated.loop(
      Animated.timing(this.opacityValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      })
    )

    myAnimation.start()
  }

  onLayout = () => {
    const { width, height } = Dimensions.get('window')
    const isLandscape = height < width
    let fontSize = isLandscape ? 120 : 18
    this.setState({ fontSize, isLandscape })
    this.startAnimating()
  }

  editText = (inputValue, inputStyle, isLandscape) => (
    <View>
      <TextInput
        style={inputStyle}
        value={inputValue}
        onChangeText={val => this.setState({ inputValue: val.toUpperCase() })}
        editable={!isLandscape}
        autoFocus
      />
    </View>
  )

  render() {
    const { fontSize, inputValue, isLandscape } = this.state
    const inputStyle = {
      ...styles.input,
      borderWidth: isLandscape ? 0 : 1,
      fontSize
    }
    // const spin = this.opacityValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['1deg', '360deg']
    // })
    const animatedStyle = {
      opacity: this.opacityValue
      // transform: [{ rotate: spin }]
    }
    return (
      <View onLayout={this.onLayout} style={styles.container}>
        {isLandscape ? (
          <Animated.Text key="hey" style={[{ fontSize }, animatedStyle]}>
            {this.state.inputValue}
          </Animated.Text>
        ) : (
          this.editText(inputValue, inputStyle, isLandscape)
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    minHeight: 40,
    minWidth: '50%',
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 20
  }
})
