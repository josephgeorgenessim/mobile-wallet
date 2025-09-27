import { Stack } from "expo-router";
import SaveScreen from "@/components/SaveScreen";
export default function RootLayout() {
  return <SaveScreen>
    <Stack  screenOptions={{ headerShown: false }} />
  </SaveScreen>
}
