/*import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
export default function Pickphoto() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const takePicture = async () => {
      if (camera) {
        const photo = await camera.takePictureAsync();
        setCapturedImage(photo.uri);
      }
    };
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setCapturedImage(result.uri);
      }
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={(ref) => (camera = ref)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={takePicture}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={pickImage}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Pick Image </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        {capturedImage && (
          <Image source={{ uri: capturedImage }} style={{ flex: 1 }} />
        )}
      </View>
    );
  }
  */
  import React, { useState, useEffect } from 'react';
  import { View, Text, TouchableOpacity, Image } from 'react-native';
  import { Camera } from 'expo-camera';
  export default function Pickphoto() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isReady, setIsReady] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleCameraReady = () => {
      setIsReady(true);
    };
  
    const takePicture = async () => {
      if (camera && isReady) {
        try {
          const photo = await camera.takePictureAsync();
          setCapturedImage(photo.uri);
          setShowCamera(false); // Hide the camera after capturing the image
        } catch (error) {
          console.error('Error taking picture:', error);
        }
      }
    };
  
    const openCamera = () => {
      setShowCamera(true); // Show the camera when the button is clicked
    };
  
    if (hasPermission === null) {
      return <View />;
    }
  
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {showCamera ? (
          <Camera
            style={{ flex: 1, width: '100%' }}
            type={type}
            onCameraReady={handleCameraReady}
            ref={(ref) => (camera = ref)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={takePicture}
              >
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Capture </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <TouchableOpacity onPress={openCamera}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Open Camera</Text>
          </TouchableOpacity>
        )}
  
        {capturedImage && (
          <View style={{ marginTop: 20 }}>
            <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200 }} />
          </View>
        )}
      </View>
    );
  }