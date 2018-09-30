import React from 'react';

import { InputNumber } from 'antd';
import PropTypes from 'prop-types';

class Index extends React.Component {
  static defaultProps={
    addonBefore: '',
    addonAfter: ''
  };

  constructor(props) {
    super(props);
    const value = props.value || '';
    this.state = {
      value
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const {value} = nextProps;
      this.setState({ value });
    }
  }

  handleChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  };

  triggerChange = (changedValue) => {
    const {onChange} = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const {state} = this;
    const { addonAfter, addonBefore } = this.props;
    const inputNumberProps = {
      ...this.props,
      value: state.value,
      onChange: this.handleChange
    };
    return (
      <span className="ant-input-group-wrapper">
        <span className="ant-input-wrapper ant-input-group">
          {addonBefore && <span className="ant-input-group-addon">{addonBefore}</span>}
          <InputNumber style={{ padding: 0 }} className="ant-input" {...inputNumberProps} />
          {addonAfter && <span className="ant-input-group-addon">{addonAfter}</span>}
        </span>
      </span>
    );
  }
}
Index.propTypes = {
  addonBefore: PropTypes.string,
  addonAfter: PropTypes.string
};
export default Index;
