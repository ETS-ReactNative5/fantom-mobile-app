// @flow
import React, { useRef, useEffect } from "react";
import { Linking, Platform, StyleSheet } from "react-native";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import { getHeight, getWidth, Metrics } from "../../utils/pixelResolver";
import { setDopdownAlert as setDopdownAlertAction } from "~/redux/notification/actions";
import { Colors, FontSize } from "~/theme";

const DropdownNotification = (props: TDropDownNotificationTypes) => {
  const { type, text, style, cancelButton = {}, setDopdownAlert } = props;
  const _dropdown: any = useRef(null);
  const APP_STORE_LINK =
    "itms-apps://itunes.apple.com/us/app/id1436694080?mt=8";
  const PLAY_STORE_LINK = "market://details?id=com.fantomwallet";

  // on dropdownAlert Click
  const close = e => {
    if (e && e.action === "tap" && cancelButton) {
      if (Platform.OS == "ios")
        Linking.openURL(APP_STORE_LINK).catch(err =>
          console.error("An error occurred", err)
        );
      else
        Linking.openURL(PLAY_STORE_LINK).catch(err =>
          console.error("An error occurred", err)
        );
    } else if (e && e.action === "automatic" && !cancelButton)
      setDopdownAlert("", false);
    else setDopdownAlert("", false);
  };

  // on cancel button click
  const cancel = () => {
    setDopdownAlert("", false);
  };
  useEffect(() => {
    if (!text) return;
    _dropdown.current.alertWithType(type, text, "");
  }, [text]);
  return (
    <DropdownAlert
      containerStyle={{ backgroundColor: Colors.royalBlue, ...style }}
      ref={_dropdown}
      onClose={close}
      useNativeDriver
      showCancel={cancelButton}
      onCancel={cancel}
      cancelBtnImageStyle={styles.cancelBtnImageStyle}
      titleStyle={
        cancelButton
          ? { ...styles.tittle, textDecorationLine: "underline" }
          : styles.tittle
      }
    />
  );
};

const styles = StyleSheet.create({
  cancelBtnImageStyle: {
    width: getWidth(25),
    height: getWidth(25),
    top: Metrics.screenHeight > 800 ? getHeight(30) : 5
  },
  tittle: {
    color: "white",
    fontWeight: "bold",
    fontSize: FontSize.base
  }
});

export default connect(
  state => ({
    type: state.notification.type,
    text: state.notification.text,
    style: state.notification.style,
    cancelButton: state.notification.cancel
  }),
  {
    setDopdownAlert: setDopdownAlertAction
  }
)(DropdownNotification);
