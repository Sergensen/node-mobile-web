import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class CameraComponent extends Component {
  constructor(props) {
    super(props);
    this.height = Dimensions.get('window').height;
    this.width = Dimensions.get('window').width;

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

  deleteImage() {
    this.setState((prev, props) => {
      return {
        image: null
      }
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
    const { hasCameraPermission, image } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (image){
      return (
        <View style={styles.camera}>
          <Image
            style={{
              width: this.width,
              height: this.width*(4/3),
              transform: [{scaleX: -1}]
            }}
            source={{ uri: image }}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.deleteImage.bind(this)}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Camera
          ratio='4:3'
          ref={ref => { this.camera = ref; }}
          style={{
            width: this.width,
            height: this.width*(4/3)
          }}
          type={this.state.type}>
          <View style={styles.mainView}>
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
          </View>
        </Camera>
      );
    }
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  mainView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipButton: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  takeButton: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  delete: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black'
  }
});
