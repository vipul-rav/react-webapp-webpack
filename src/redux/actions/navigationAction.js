import { REDIRECT_SCREEN } from '../../constants/actionTypes';

export const navigateToNextScreen = (nextScreen) => (dispatch) => {
  dispatch({
    type: REDIRECT_SCREEN,
    path: nextScreen
  });
};
