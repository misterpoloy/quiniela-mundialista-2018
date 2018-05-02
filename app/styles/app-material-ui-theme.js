import { blueGrey800,
    fullWhite, red600, grey50, grey900
} from 'material-ui/styles/colors'; // Color for material
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: '#173f87', // MainColor
        primary2Color: red600, // Super Color
        primary3Color: blueGrey800, // Info and Rules
        accent1Color: blueGrey800,
        accent2Color: blueGrey800,
        accent3Color: blueGrey800,
        alternateTextColor: fullWhite, // text navigation
        textColor: grey900, // text content
        secondaryTextColor: fade(fullWhite, 0.7),
        canvasColor: grey50,
        borderColor: fade(fullWhite, 0.3),
        disabledColor: fade(fullWhite, 0.3),
        pickerHeaderColor: fade(fullWhite, 0.12),
        clockCircleColor: fade(fullWhite, 0.12),
    },
};
