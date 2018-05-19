import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraComponent extends Component {
  constructor(props) {
    super(props);
    this.height = Dimensions.get('window').height;
    this.width = this.height * (3 / 4);
    this.width = Dimensions.get('window').width;
    this.height = this.width * (4 / 3);

    this.widthOffset = -((this.newWidth - this.width) / 2);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      image: null
    };
  }

  async takePicture() {
    info = await this.camera.takePictureAsync();
    this.setState((prev, props) => {
      return { image: info.uri }
    });
  }

  toggleCamera() {
    if (this.state.type === Camera.Constants.Type.back)
      this.setState({ type: Camera.Constants.Type.front });
    else
      this.setState({ type: Camera.Constants.Type.back });
  }

  async requestPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentWillMount() {
    this.requestPermissions();
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.mainView}>
          <Camera
            ratio='4:3'
            ref={ref => { this.camera = ref; }}
            style={{
              width: this.width,
              height: this.height,
            }}
            type={this.state.type}>

          </Camera>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={this.toggleCamera.bind(this)}>
              <Text style={styles.text}>Flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.takeButton}
              onPress={this.takePicture.bind(this)}>
              <Text style={styles.text}>Take</Text>
            </TouchableOpacity>
            <Image
              style={{ width: 100 * (3 / 4), height: 100 }}
              source={{ uri: this.state.image }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  flipButton: {
    backgroundColor: 'grey'
  },
  takeButton: {
    backgroundColor: 'grey'
  },
  text: {
    fontSize: 18,
    margin: 10,
    color: 'black',
  }
});
