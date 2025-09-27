import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/sign-up">
        <Text>Sign up</Text>
      </Link>
      <Link href="/sign-in">
        <Text>Sign in</Text>
      </Link>
    </View>
  );
}
