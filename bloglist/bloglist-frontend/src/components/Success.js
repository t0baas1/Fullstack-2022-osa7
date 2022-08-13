import { connect } from "react-redux";

const Success = (props) => {
  if (props.notification === null) {
    return null;
  }

  return <div className="success">{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.success,
  };
};

export default connect(mapStateToProps)(Success);
