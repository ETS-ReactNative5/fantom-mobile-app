import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * Address: This component is meant for rendering list of address saved in address book.
 */
class Address extends Component {
  onAddressSelection() {
    if (this.props.onSelection) {
      this.props.onSelection(this.props.id);
    }
  }

  handleEditContact(name, address) {
    let updatedName = name;
    if (!name) {
      updatedName = 'Anonymous';
    }
    if (this.props.handleEditContact) {
      this.props.handleEditContact(updatedName, address);
    }
  }

  render() {
    let starIcon = 'star-border';
    if (this.props.rate) {
      starIcon = 'star';
    }
    const isEditMode = this.props.isEditMode || false;
    // const isEditMode = true;
    const MainView = isEditMode ? TouchableOpacity : View;
    const propsToMainView = {};
    if (isEditMode) {
      propsToMainView.onPress = this.onAddressSelection.bind(this);
    }
    return (
      <MainView style={styles.container} {...propsToMainView}>
        <View style={styles.subContainer}>
          <View style={styles.subSubContainer}>
            {/* Left container */}
            <View style={styles.leftContainerStyle}>
              <TouchableOpacity onPress={() => this.props.rateChange(this.props.id)}>
                <Icon name={starIcon} size={25} color="rgb(0,177,251)" />
              </TouchableOpacity>
            </View>
            <View style={styles.lineSeparatorStyle} />
            {/* Middle container */}
            <View style={styles.mid}>
              <Text style={styles.nameContainer}>{this.props.name || 'Anonymous'}</Text>
              <Text style={styles.addressTextStyle}>{this.props.line1Text}</Text>
            </View>
            {/* Rightcontainer */}
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() => this.handleEditContact(this.props.name, this.props.line1Text)}
                style={styles.optionButtonStyle}
              >
                <MaterialCommunityIcons name="pencil" size={16} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.delete(this.props.id)}
                style={styles.optionButtonStyle}
              >
                <FontAwesomeIcons style={{ color: '#FFF' }} name="trash" size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MainView>
    );
  }
}

Address.propTypes = {
  id: PropTypes.string,
  delete: PropTypes.func,
  rateChange: PropTypes.func,
  line1Text: PropTypes.string,
  name: PropTypes.string,
  isEditMode: PropTypes.bool,
  rate: PropTypes.bool,
  onSelection: PropTypes.func,
};

export default Address;
