import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { commonStatus } from "../../constants/masterData";
import NumericField from "../common/entryForm/NumericField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import RichTextField from "../../compoments/common/entryForm/RichTextField";
import CheckBoxField from "../../compoments/common/entryForm/CheckBoxField";
import { ArrowLeftOutlined, UpCircleOutlined } from "@ant-design/icons";

import {
  AppConstants,
  UploadFileTypes,
  STATUS_ACTIVE,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";


class NewsForm extends BasicForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.dataDetail.avatar
        ? `${AppConstants.contentRootUrl}${props.dataDetail.avatar}`
        : "",
      uploading: false,
      banner: props.dataDetail.banner
        ? `${AppConstants.contentRootUrl}${props.dataDetail.banner}`
        : "",
      uploadingBanner: false,
    };
  }

  getInitialFormValues = () => {
    const { isEditing, dataDetail, categoryOptions } = this.props;
    if (!isEditing) {
      return {
        status: STATUS_ACTIVE,
        categoryId: categoryOptions[0] && categoryOptions[0].value,
        ordering: 0,

      };
    }
    return {
      ...dataDetail,
      categoryId: dataDetail.category?.id,
      ordering: 0,
    };
  };

  handleChangeAvatar = (info) => {
    console.log(info);
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (avatar) =>
        this.setState({ avatar })
      );
    }
  };

  uploadFileAvatar = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploading: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("avatar", result.data.filePath);
        this.setState({ uploading: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploading: false });
        }
      },
    });
  };

  handleChangeBanner = (info) => {
    if (info.file.status === "done") {
      Utils.getBase64(info.file.originFileObj, (banner) =>
        this.setState({ banner })
      );
    }
  };

  uploadFileBanner = (file, onSuccess) => {
    const { uploadFile } = this.props;
    this.setState({ uploadingBanner: true });
    uploadFile({
      params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
      onCompleted: (result) => {
        this.setFieldValue("banner", result.data.filePath);
        this.setState({ uploadingBanner: false });
        onSuccess();
      },
      onError: (err) => {
        if (err && err.message) {
          showErrorMessage(err.message);
          this.setState({ uploadingBanner: false });
        }
      },
    });
  };
  render() {
    const { formId, categoryOptions, loadingSave, t, isEditing, dataDetail } = this.props;
    const { uploading, avatar, uploadingBanner, banner } = this.state;
    return (
      <div className="detail-news">
        <div className="main-content" style={{ padding: 0 }}>
          <div
            className="list-item detail"
            key={dataDetail.id}
          >
            <div className="item-content">
              {
                dataDetail.avatar ? (
                  <img
                    className="new-avatar detail"
                    src={`${AppConstants.contentRootUrl}${dataDetail.avatar}`}
                  />
                ) : null
              }
              <div className="new-meta">
                <h1 className="item-meta detail">{dataDetail.title}</h1>
                <p className="new-content detail">{dataDetail.description}</p>
              </div>
            </div>
          </div>
          <div className="new-content detail" dangerouslySetInnerHTML={{ __html: dataDetail?.content.replaceAll("{{baseUrl}}", AppConstants.contentRootUrl) }} ></div>
        </div>
      </div>
    );
  }
}

export default NewsForm;
