import { connect } from "react-redux";
import Chat from "../Chat";
import { connectedUserReceivedAction } from "../actions/actions";

const mapStateToProps = state => ({
  connectedUser: state.connectedUser
});

const mapDispatchToProps = dispatch => ({
  getConnectedUser: connectedUser =>
    dispatch(connectedUserReceivedAction(connectedUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
