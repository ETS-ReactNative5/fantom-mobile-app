import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const style = {
    imageBackground: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'

    },
}

export default style;