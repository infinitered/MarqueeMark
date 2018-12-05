import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text
} from "react-native"

const BUTTONS = ["One", "Two", "Three"]

export default class App extends Component {
  state = { fontSize: 18, selected: null }
  onLayout = () => {
    const { width, height } = Dimensions.get("window")
    const landscape = height < width
    let fontSize = landscape ? 120 : 18
    this.setState({ fontSize, landscape }, () => this.texty.focus())
  }

  renderButtons = () => {
    const { selected } = this.state
    return BUTTONS.map((label, i) => {
      const backgroundColor = selected === i ? "green" : "lightgrey"
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

  render() {
    const { fontSize, inputValue, landscape, selected } = this.state
    const inputStyle = {
      ...styles.input,
      borderWidth: landscape ? 0 : 1,
      fontSize
    }
    return (
      <View onLayout={this.onLayout} style={styles.container}>
        <Text>{BUTTONS[selected]}</Text>
        <TextInput
          ref={ref => (this.texty = ref)}
          style={inputStyle}
          value={inputValue}
          onChangeText={val => this.setState({ inputValue: val.toUpperCase() })}
          editable={!landscape}
          autoFocus
        />
        <View style={styles.btnContainer}>{this.renderButtons()}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    minHeight: 40,
    minWidth: "50%",
    borderColor: "black",
    borderWidth: 1,
    paddingLeft: 5,
    marginTop: 20
  },
  btnWrapper: {
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  btnContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginTop: 10
  }
})
