import { REDIRECT_SCREEN } from '../../constants/actionTypes';

export const navigateToNextScreen = (nextScreen) => ({
    type: REDIRECT_SCREEN,
    path: nextScreen,
});
