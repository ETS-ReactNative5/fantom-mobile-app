import React, { useEffect } from "react";
import SuccessScreen from "../../general/SuccessScreen";
import { NavigationService, routes } from "~/navigation/helpers";
import { BackHandler } from "react-native";
import { Messages } from "../../theme";
const WalletImported = (props: TSettingsScreenTypes) => {
  const { navigation } = props;
  const publicKey = navigation.getParam("publicKey", "");
  const text = navigation.getParam("text");
  const navigationRoute = navigation.getParam("navigationRoute");
  useEffect(() => {
    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      handlePress
    );
    return () => handler.remove();
  }, []);
  console.log("navigationRoute", navigationRoute);
  const handlePress = () => {
    if (navigationRoute && navigationRoute === "Back") {
      NavigationService.navigate(routes.HomeScreen["Staking"], {
        isUnstaking: true
      });
      return;
    }
    if (navigationRoute) {
      NavigationService.navigate(navigationRoute);
      return;
    }
    NavigationService.navigate(routes.root.WalletInfo, { publicKey });
    return true;
  };
  console.log(text, "***** text  in Wallet Imported *****");
  return (
    <SuccessScreen
      onPress={handlePress}
      text={text || Messages.walletImp}
    ></SuccessScreen>
  );
};

export default WalletImported;
