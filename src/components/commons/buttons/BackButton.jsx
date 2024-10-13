import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
export default function BackButton({ color, style }) {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <TouchableOpacity onPress={goBack}>
      <ChevronLeftIcon style={{ color: `${color}`, ...style }}></ChevronLeftIcon>
    </TouchableOpacity>
  );
}
