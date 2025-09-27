import { Slot } from "expo-router";
import SaveScreen from "@/components/SaveScreen";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SaveScreen>
        <Slot />
      </SaveScreen>
    </ClerkProvider>
  )
}
