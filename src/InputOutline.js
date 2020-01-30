import * as React from "react";
import { Text, View, StyleSheet, Dimensions, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import PropTypes from "prop-types";

const { height, width } = Dimensions.get("window");
const INPUT_HEIGHT = height * 0.078;
const FONT_SIZE = 20;
const PADDING = 20;
const BORDER_WIDTH = 1;
const BG_COLOR = "#fff";
const COLOR_UNFOCUSED = "#c5b4b8";
const COLOR_FOCUSED = "blue";
const DURATION = 350;

export default class RoundedInputBox extends React.Component {
  state = {
    currColor: COLOR_UNFOCUSED,
    labelWidth: null,
    focused: false
  };
  labelRef = null;
  spacerRef = null;
  inputRef = null;

  handleFocus() {
    this.setState({ currColor: this.props.focusedColor, focused: true });
    this.labelRef.transitionTo(
      {
        transform: [
          { translateY: -(INPUT_HEIGHT / 2) },
          { translateX: -PADDING },
          { scale: 0.8 }
        ]
      },
      DURATION
    );
    this.spacerRef.transitionTo({ transform: [{ scaleX: 0.85 }] }, DURATION);
  }

  async handleUnFocus() {
    console.log(this.props.value.length);
    if (this.props.value.length == 0) {
      setTimeout(() => this.setState({ focused: false }), DURATION);
      this.setState({ currColor: this.props.defaultColor });
      this.labelRef.transitionTo(
        {
          transform: [{ translateY: 0 }, { translateX: 0 }, { scale: 1 }]
        },
        DURATION
      );
      this.spacerRef.transitionTo({ transform: [{ scaleX: 0 }] }, DURATION);
    }
  }

  render() {
    const { style, placeholder } = this.props;
    const { currColor, labelWidth, labelHeight, focused } = this.state;
    return (
      <View
        style={{
          ...styles.container,
          ...style,
          borderColor: currColor,
          marginTop: labelHeight
        }}
      >
        <TextInput
          style={{ ...styles.inputContainer, color: currColor }}
          ref={ref => (this.inputRef = ref)}
          onFocus={this.handleFocus.bind(this)}
          onSubmitEditing={this.handleUnFocus.bind(this)}
          placeholder={placeholder}
          placeholderTextColor={BG_COLOR}
          onChangeText={this.props.onChangeText}
        />
        <Animatable.View
          style={{
            position: "absolute",
            top: -BORDER_WIDTH,
            width: labelWidth,
            backgroundColor: focused ? BG_COLOR : currColor,
            height: BORDER_WIDTH,
            transform: [{ scaleX: 0 }]
          }}
          ref={ref => (this.spacerRef = ref)}
          useNativeDriver
        />
        <Animatable.View
          ref={ref => (this.labelRef = ref)}
          useNativeDriver
          style={{ ...styles.labelStyle }}
          onLayout={e =>
            this.setState({
              labelWidth: e.nativeEvent.layout.width,
              labelHeight: e.nativeEvent.layout.height
            })
          }
        >
          <Animatable.Text
            style={{ fontSize: FONT_SIZE, color: currColor }}
            onPress={() => this.inputRef.focus()}
          >
            {placeholder}
          </Animatable.Text>
        </Animatable.View>
      </View>
    );
  }
}

RoundedInputBox.propTypes = {
  focusedColor: PropTypes.string,
  defaultColor: PropTypes.string,
  placeholder: PropTypes.string
};

RoundedInputBox.defaultProps = {
  focusedColor: COLOR_FOCUSED,
  defaultColor: COLOR_UNFOCUSED,
  placeholder: "Placeholder"
};

const styles = StyleSheet.create({
  container: {
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: BG_COLOR
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: PADDING,
    fontSize: FONT_SIZE
  },
  labelStyle: {
    position: "absolute",
    top: INPUT_HEIGHT / 2 - FONT_SIZE / 2 - BORDER_WIDTH * 4,
    left: PADDING
  }
});