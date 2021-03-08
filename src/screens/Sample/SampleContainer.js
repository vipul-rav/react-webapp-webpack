import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { getPostList } from '../../redux/actions/postAction';
import { navigateToNextScreen } from '../../redux/actions/navigationAction';
import { withContent } from '../../hocs/withContent';
import { SampleScreen } from './SampleScreen';

const mapStateToProps = (state) => ({ postList: state.post.postList });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      navigateToNextScreen,
      getPostList
    },
    dispatch
  );

const SampleContainer = compose(withContent(), connect(mapStateToProps, mapDispatchToProps))(SampleScreen);

export { SampleContainer };
