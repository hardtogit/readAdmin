import React from "react";
import { Upload, Icon, Modal,message } from "antd";

const styles = require("./index.less");

interface ImageUploadProps {
  value?: { fileList: any[] }
}

interface ImageUploadState {
  previewVisible: boolean,
  previewImage: string,
  value: { fileList: any[] },
}


class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileType: '0',// 0-图片   1-PDF
      value: this.props.value || { fileList: [] },
    }
    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);

  }

  /** 提供绑定Form 的 onChange 事件 */
  handleChange: (value) => void = function (value) {
    this.setState({ value })
    this.triggerChange(value)
  }

  triggerChange: (changedValue) => void = function (changedValue) {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      if (changedValue && changedValue.fileList && changedValue.fileList.length > 0) {
        const file = changedValue.fileList[changedValue.fileList.length-1];
        const { response = {} } = file || {}
        if (response.fid) {
          onChange(Object.assign({}, changedValue));
        } else {
          onChange(null);
        }
      } else {
        onChange(null);
      }
    }
  };

  handleCancel: () => void = function () {
    this.setState({ previewVisible: false })
  }

  handlePreview: (file) => void = function (file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      fileType: file.name && file.name.endsWith('.pdf') ? '1' : '0',
      previewVisible: true,
    });
  }

  getDataParams: (file) => void = function (file) {
    const formData = new FormData();
    formData.append('local_file', file);
    formData.append("proj", "waha_ga");
    return formData;
  }

  beforeUpload: (file,fileList) => void = function (file,fileList) {
    const formData = new FormData();
    formData.append('local_file', file);
    formData.append("proj", "waha_ga");
    return true;
  }

  render(): JSX.Element {
    let { maxNum, multiple=false } = this.props;
    const { previewVisible, previewImage, value, fileType } = this.state;

    maxNum = maxNum || 1;
    const uploadButton = (
      <div>
        <Icon type="upload" />
        <div>上传文件</div>
      </div>
    );

    // "http://47.98.249.32/cgi-bin/upload.pl"
    return (
      <div className="clearfix">
        <Upload
          accept="image/jpg,image/jpeg,image/png,application/pdf"
          action="https://wahalife.cn/cgi-bin/upload.pl"
          listType="picture-card"
          multiple={multiple || false}
          fileList={value.fileList}
          onPreview={this.handlePreview}
          data={this.getDataParams}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          withCredentials
          headers={{ 'X-Requested-With': null , withCredentials: null}}
        >
          {value.fileList.length >= maxNum ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          {fileType == '1' ? (<embed style={{ width: '100%', height: '600px' }} src={previewImage} />)
            : (<img alt="" style={{ width: '100%' }} src={previewImage} />)}
        </Modal>
      </div>)
  }
}

export default ImageUpload
