import React from 'react'
import { Form, Row, Col, Button } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import  isEmpty  from '../../utils/isEmpty';

import createField from './createField';
import styles from './index.less';

const FormItem = Form.Item;

// 获取最终的search对象
const transformSearch = (search, { fields }) => {
  const tmpSearch = _.clone(search);

  // 转换数据
  fields.forEach(({ key, type, searchKeys = ['startTime', 'endTime'] }) => {
    const value = tmpSearch[key];

    switch (type) {
      case 'dateRange': {
        const [startTime, endTime] = value || [];

        tmpSearch[searchKeys[0]] = startTime ? `${startTime.format('YYYY-MM-DD')} 00:00:00` : '';
        tmpSearch[searchKeys[1]] = endTime ? `${endTime.format('YYYY-MM-DD')} 23:59:59` : '';
        delete tmpSearch[key];
        break;
      }
      case 'date': {
        tmpSearch[key] = value ? moment(value).valueOf() : '';
        break;
      }
      case 'month': {
        tmpSearch[key] = value ? `${value.format('YYYY-MM')}-01 00:00:00` : '';
        break;
      }
      default: break;
    }
  });

  // 重置页码为1
  return { ...tmpSearch};
};

/**
 * 查询表单
 *
 * @props fields 表单字段定义
 * @props search 查询字段初始值
 * @props btns 按钮
 * @props formItemLayout 查询框布局定义
 * @props onSearch 查询的回调函数
 * @props onChange 修改的回调函数
 *
 */
@Form.create({})

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: props.search || {}, // 以传入的查询条件为默认
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(key, value) {
    const { onChange } = this.props;
    const {search}=this.state;
    let data = { [key]: value };

    // 输入框处理
    if (value && value.target) {
      data = { [key]: !isEmpty(value.target.value) ? value.target.value : undefined };
    }

    this.setState(prevState => ({ search: { ...prevState.search, ...data } }), () => {
      if(onChange&&typeof onChange==='function'){
        onChange(data, search);
      }
    });
  }

  handleSearch(search, type) {
    const { fields = [], onSearch } = this.props;

    onSearch(transformSearch(search, { fields }), type);
  }

  handleReset() {
    const { fields = [] } = this.props;
    const initialSearch = fields.reduce((obj, { key }) => {
      const copyObj=obj;
      copyObj[key] = undefined;
      return copyObj;
    }, {});
    initialSearch.syncStatus = 6;

    this.setState({ search: initialSearch }, () => {
      this.handleSearch(initialSearch, 'reset');
    });
  }

  render() {
    const { search } = this.state;
    const { fields, formItemLayout = {} } = this.props;

    const itemLayout = {
      itemCol: {
        span: 6
      },
      labelCol: {
        span: 7
      },
      wrapperCol: {
        span: 15
      },
      ...formItemLayout,
    };

    return (
      <Row>
        {fields.map((field) => (
          <Col {...itemLayout.itemCol} key={field.key}>
            <FormItem
              className="h-form-item"
              label={field.name}
              help={field.help}
              key={field.key}
              labelCol={itemLayout.labelCol}
              wrapperCol={itemLayout.wrapperCol}
            >
              {createField(field, search, this.handleChange)}
            </FormItem>
          </Col>
        ))}
        <Col {...itemLayout.itemCol}>
          <FormItem
            className="h-form-item"
            label=' '
            colon={false}
            labelCol={itemLayout.labelCol}
            wrapperCol={itemLayout.wrapperCol}
          >
            <div className={styles.btns}>
              <Button type="primary" onClick={() => this.handleSearch(search)}>搜索</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </div>
          </FormItem>

        </Col>
      </Row>
    );
  }
}
export default SearchForm
