import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ChevronLeftIcon, ViewfinderCircleIcon } from "react-native-heroicons/solid";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import BackButton from "../../components/commons/buttons/BackButton";

export default function CameraScreen({ navigation }){
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Tab navigator 숨기기
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "flex" },
      });
      unsubscribe();
    };
  }, [navigation]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePictureHandler = async () => {
    // console.log(cameraRef.current);
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true, skipProcessing: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      if (photo) {
        navigation.navigate("Photo", { photoUri: photo.uri });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <BackButton color="white" />
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
          <View style={styles.shotCover}>
            <TouchableOpacity style={styles.shotBtn} onPress={takePictureHandler}></TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    margin: 34,
  },
  shotBtn: {
    borderRadius: "100%",
    height: hp(7),
    width: hp(7),
    backgroundColor: "white",
    alignSelf: "center",
  },
  shotCover: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    height: hp(11),
    width: hp(11),
    borderRadius: "100%",
    borderWidth: 13,
    borderColor: "white",
    alignSelf: "center",
  },
});