/**
 * 图片上传组建
 */
import React from 'react';
import { Upload, Icon, message } from 'antd';
import { looseEqual } from '../../utils/share';
import previewImg from '../ImgPreview';

const defaultFileList = {
  uid: 0,
  name: '',
  status: 'done',
  isReturn: true,
  url: '',
};
const getAttachId = (url) => {
  const arr = url.split('/');
  const nameUrl = arr[arr.length - 1];
  const arrTwo = nameUrl.split('.');
  return arrTwo[0];
};
const handleList = (pic) => {
  const fileLists = [];
  if (Array.isArray(pic)) {
    pic.forEach((url, uid) => {
      fileLists.push({ ...defaultFileList, url, uid });
    });
  } else {
    fileLists.push({ ...defaultFileList, url: pic });
  }
  return fileLists;
};

const uploadBtn = (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">点击上传</div>
  </div>
);
export default class Index extends React.Component {
  static defaultProps={
    uploadButton: uploadBtn, // 上传button
    picLength: 1, // 上传最大张数
    fileBizType: 'resource', // 配置参数
    listType: 'picture-card', // 图片上传样式类型，详见antd
  };

  constructor(props) {
    super(props);
    const pic = props.pic || '';
    let fileLists = [];
    if (pic) {
      fileLists = handleList(pic);
    }
    this.state = {
      pic,
      fileLists,
      uploading: false,
      previewImage: ''
    };
    this.onRemove = this.onRemove.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.formatImgData = this.formatImgData.bind(this);
  }

  componentDidMount() {
    const fileLists = [];
    const { pic } = this.state;
    if (Array.isArray(pic)) {
      pic.forEach((url, uid) => {
        fileLists.push({ ...defaultFileList, url, attachId: getAttachId(url), uid });
      });
    } else {
      fileLists.push({ ...defaultFileList, url: pic, attachId: getAttachId(pic) });
    }
  }

  componentWillReceiveProps({ pic }) {
    const fileLists = [];
    if (!looseEqual(pic, this.props.pic)) {
      if (pic) {
        if (Array.isArray(pic)) {
          pic.forEach((url, uid) => {
            fileLists.push({ ...defaultFileList, url, attachId: getAttachId(url), uid });
          });
        } else {
          fileLists.push({ ...defaultFileList, url: pic, attachId: getAttachId(pic) });
        }
        this.setState({ fileLists });
        this.setState({ pic });
      } else {
        this.setState({
          pic: '',
          fileLists: []
        });
      }
    }
  }

  onRemove(file) {
    const { fileLists } = this.state;
    const { onChange } = this.props;
    const index = fileLists.indexOf(file);
    const newFileList = fileLists.slice();
    newFileList.splice(index, 1);
    this.setState({
      fileLists: newFileList,
    });
    const content = this.formatImgData(newFileList).join(',');
    if (onChange) {
      onChange(content);
    }
  }

  formatImgData(fileList) {
    const { returnType = false } = this.props;
    const formatData = [];
    fileList.forEach((obj) => {
      if (obj.isReturn) {
        formatData.push(obj.attachId);
      }
      if (obj.response && obj.response.status === 'OK') {
        if (returnType) {
          formatData.push(obj.response.content[0].url);
        } else {
          formatData.push(obj.response.content[0].storeId);
        }
      }
    });
    return formatData;
  }

  beforeUpload = (file) => {
    const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
    if (!isJPG) {
      message.error('文件格式须为jpg、jpeg、png');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('文件须小于5兆');
    }
    return isJPG && isLt2M;
  };

  handleUploadChange(info) {
    const { fileLists } = this.state;
    const { onChange, getChange } = this.props;
    const { fileList, file } = info;
    this.setState({ fileLists: fileList });
    const content = this.formatImgData(fileList).join(',');
    if (onChange) {
      content && onChange(content);
    }
    if (getChange) {
      getChange(info);
    }
    if (file.status === 'done') {
      if (file.response.status === 'ERROR') {
        message.error(file.response.errorMsg || '图片上传失败');
        const index = fileLists.indexOf(file);
        const newFileList = fileLists.slice();
        newFileList.splice(index, 1);
        this.setState({ fileLists: newFileList });
      }
    }
    if (file.status === 'error') {
      message.error('图片上传失败');
      const index = fileLists.indexOf(file);
      const newFileList = fileLists.slice();
      newFileList.splice(index, 1);
      this.setState({ fileLists: newFileList });
    }
  }

  getDataParams=(file)=>{
    const formData = new FormData();
    formData.append('local_file', file);
    formData.append("proj", "yyqq");
    return formData;
  }

  render() {
    const { uploadButton = uploadBtn, picLength, listType,multiple } = this.props;
    const { fileLists = [] } = this.state;
    // 上传之前校验
    return (
      <div>
        <Upload
          action='http://116.62.164.251/cgi-bin/upload.pl'
          fileList={fileLists}
          data={this.getDataParams}
          listType={listType}
          accept="image/jpg,image/jpeg,image/png"
          withCredentials
          onRemove={this.onRemove}
          onPreview={file => previewImg({ imgUrl: (file.url || file.thumbUrl) })}
          beforeUpload={this.beforeUpload}
          multiple={multiple || false}
          onChange={this.handleUploadChange}
          headers={{ 'X-Requested-With': null , withCredentials: null}}
        >
          {fileLists.length >= picLength ? null : uploadButton}
        </Upload>
      </div>
    );
  }
}
