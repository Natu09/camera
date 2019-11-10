import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { bold } from 'ansi-colors';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {   
    console.log(this.camera);
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
        //  FileSystem.documentDirectory + 'C:\Users\natuo\OneDrive\Documents\SHOOL\CodeTheChange\camera\pics'    
          photo.exif.Orientation = 1;            
           console.log(photo);            
           });     
     }

  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} type={this.state.type}
            ref={ref => { this.camera = ref }}
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log("BUtton pressed.")
                  this.snapPhoto()
                  snap = async () => {
                    if (this.camera) {
                      let photo = await this.camera.takePictureAsync();
                    }
                  };
                  // this.setState({
                  //   type:
                  //     this.state.type === Camera.Constants.Type.back
                  //       ? Camera.Constants.Type.front
                  //       : Camera.Constants.Type.back,
                  
                }}>
                <Text style={{textAlign:"center" ,fontWeight:"bold" , fontSize: 28, marginBottom: 30, color: 'green' }}> Capture </Text>
              </TouchableOpacity>
            </View>

          </Camera>
        </View>
      );
    }
  }
}