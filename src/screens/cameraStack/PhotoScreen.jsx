import React, { useEffect } from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import BackButton from "../../components/commons/buttons/BackButton";
import { useMoveToScreen } from "../../components/commons/hooks/useMoveToScreen";
import { useLoading } from "../../context/loadingContext";

export default function PhotoScreen({ route, navigation }){
  const { photoUri } = route.params;
    const { onPressMoveToPage } = useMoveToScreen();
    const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
  const fetchData = async () => {
    showLoading();
    try {
      const ingredients = await getIngredients(photoUri);
      const recipes = await getRecipeFromIngredients(ingredients);
      const data = {
        recipes,
        ingredients,
      };
      onPressMoveToPage("SearchResult", data);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start", margin: 20 }}>
        <BackButton color="black" />
      </View>
      <Image source={{ uri: photoUri }} style={styles.photo} />
      <Button title="사용하기" onPress={fetchData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  photo: {
    width: "100%",
    height: "80%",
  },
});