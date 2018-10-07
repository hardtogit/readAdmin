import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';
import './index.less';

export class ImgModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotateDeg: props.rotateDeg || 0,
      rotateOrign: 'center',
      width: 'auto',
      height: 'auto',
    };
  }

  handleChange(value) {
    let { rotateDeg, rotateOrign } = this.state;
    const { width, height } = this.state;
    const { width: imgWidth, height: imgHeight } = this.refImg;
    rotateDeg += value;

    // 改变容器宽高，避免溢出
    const newWidth = height === 'auto' ? imgHeight : height;
    const newHeight = width === 'auto' ? imgWidth : width;

    // 旋转中心变化
    const direction = (rotateDeg % 360) / 90;
    switch (direction) {
      case 0:
        rotateOrign = `${imgWidth / 2}px ${imgWidth / 2}px`;
        break;
      case 1:
        rotateOrign = `${imgHeight / 2}px ${imgHeight / 2}px`;
        break;
      case 2:
        rotateOrign = `${imgWidth / 2}px ${imgHeight / 2}px`;
        break;
      case 3:
        rotateOrign = `${imgWidth / 2}px ${imgWidth / 2}px`;
        break;
      case -1:
        rotateOrign = `${imgWidth / 2}px ${imgWidth / 2}px`;
        break;
      case -2:
        rotateOrign = `${imgWidth / 2}px ${imgHeight / 2}px`;
        break;
      case -3:
        rotateOrign = `${imgHeight / 2}px ${imgHeight / 2}px`;
        break;
      default:
        rotateOrign = `${imgWidth / 2}px ${imgHeight / 2}px`;
    }

    this.setState({
      rotateDeg,
      rotateOrign,
      width: newWidth,
      height: newHeight
    });
  }

  renderBody() {
    const { rotateDeg, rotateOrign, width, height } = this.state;
    const {imgUrl}=this.props;
    return (
      <div className="imgWrap" style={{ width, height, minWidth: 100, minHeight: 100 }}>
        <img
          ref={(ref) => { this.refImg = ref; }}
          src={imgUrl}
          style={{ transform: `rotate(${rotateDeg}deg)`, transformOrigin: rotateOrign }}
          alt="图片加载失败"
        />
      </div>
    );
  }

  renderFooter() {
    const { onCancel } = this.props;
    return (
      <div>
        <Button onClick={() => { this.handleChange(-90); }}>向左90°</Button>
        <Button onClick={() => { this.handleChange(90); }}> 向右90°</Button>
        <Button type="primary" onClick={onCancel}>确认</Button>
      </div>
    );
  }

  render() {
    const { onCancel, maskClosable } = this.props;

    const modalProps = {
      visible: true,
      width: 'auto',
      maskTransitionName: 'fade',
      maskClosable,
      onCancel,
      footer: this.renderFooter(),
    };
    return (
      <Modal {...modalProps} className="imgPreviewModal">
        {this.renderBody()}
      </Modal>
    );
  }
}

export default function previewImg(config) {
  const { onCancel, imgUrl } = config;
  if (!imgUrl) {
    // console.warn('imgUrl 图片路径不能为空');
    return false;
  }

  const modalWrap = document.createElement('div');
  document.body.appendChild(modalWrap);

  function close(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(modalWrap);
    if (unmountResult && modalWrap.parentNode) {
      modalWrap.parentNode.removeChild(modalWrap);
    }
    if(onCancel){
      onCancel(...args);
    }
  }

  const modalProps = {
    maskClosable: false,
    onCancel: close,
    ...config,
  };

  ReactDOM.render(
    <ImgModal {...modalProps} />
    , modalWrap);
  return {
    destroy: close,
  };
}
