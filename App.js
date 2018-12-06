import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  Animated
} from 'react-native'

const BUTTONS = ['One', 'Two', 'Three']

export default class App extends Component {
  state = { fontSize: 18, selected: null }
  opacityValue = new Animated.Value(1)

  startAnimating = () => {
    let myAnimation
    // Fade out
    this.opacityValue.setValue(1)
    myAnimation = Animated.timing(this.opacityValue, {
      toValue: 0,
      duration: 5000
    })

    // Pulse
    // myAnimation = Animated.loop(
    //   Animated.timing(this.opacityValue, {
    //     toValue: 0,
    //     duration: 250
    //   })
    // )

    myAnimation.start()
  }

  onLayout = () => {
    const { width, height } = Dimensions.get('window')
    const isLandscape = height < width
    let fontSize = isLandscape ? 120 : 18
    this.setState({ fontSize, isLandscape })
    this.startAnimating()
  }

  renderButtons = () => {
    const { selected } = this.state
    return BUTTONS.map((label, i) => {
      const backgroundColor = selected === i ? 'green' : 'lightgrey'
      return (
        <TouchableOpacity
          key={i}
          style={[styles.btnWrapper, { backgroundColor }]}
          onPress={() => this.setState({ selected: i })}
        >
          <Text>{label}</Text>
        </TouchableOpacity>
      )
    })
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
      <View style={styles.btnContainer}>{this.renderButtons()}</View>
    </View>
  )

  render() {
    const { fontSize, inputValue, isLandscape } = this.state
    const inputStyle = {
      ...styles.input,
      borderWidth: isLandscape ? 0 : 1,
      fontSize
    }
    const animatedStyle = {
      opacity: this.opacityValue
    }
    return (
      <View onLayout={this.onLayout} style={styles.container}>
        {isLandscape ? (
          <Animated.Text key="hey" style={[animatedStyle]}>
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
  },
  btnWrapper: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  },
  btnContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginTop: 10
  }
})
