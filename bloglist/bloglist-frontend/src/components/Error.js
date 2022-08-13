import { connect } from "react-redux";

const Error = (props) => {
  if (props.notification === null) {
    return null;
  }

  return <div className="error">{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.error,
  };
};

export default connect(mapStateToProps)(Error);
