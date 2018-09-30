import React from 'react';
import PropTypes from 'prop-types';

class Operation extends React.Component {
  static defaultProps={
    disable: false,
    onClick: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { disable, onClick } = this.props;
    if (!disable) {
      onClick();
    }
  }

  render() {
    const { disable, className = '' } = this.props;
    let style = { color: '#1890ff', cursor: 'pointer' };
    if (disable) {
      style = { color: '#ddd', cursor: 'not-allowed' };
    }
    return (
      <span style={style} onClick={this.handleClick} className={className}>
        {this.props.children}
      </span>
    );
  }
}
Operation.propTypes = {
  disable: PropTypes.bool,
  onClick: PropTypes.func
};
export default Operation;
