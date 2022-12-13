import React from "react";
import { Form, Col, Row, Input } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import { ProvinceKinds } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import DropdownField from "../common/entryForm/DropdownField";

class ProvinceForm extends BasicForm {


  findProvinceKindByKey = (key, value) => {
    return ProvinceKinds[Object.keys(ProvinceKinds).find(e=>ProvinceKinds[e][key]===value)];
  }

  render() {
    const { formId, dataDetail, parentProvinces, loadingSave, t } = this.props;
    const currentProvinceKind = this.findProvinceKindByKey('provinceName', dataDetail.kind );
    return (
      <Form
        id={formId}
        ref={this.formRef}
        layout="vertical"
        onFinish={this.handleSubmit}
        initialValues={dataDetail}
      >
        {
          parentProvinces && parentProvinces.map((e, i)=>{
            const provinceKindLabel = ProvinceKinds[Object.keys(ProvinceKinds)[i]].text;
            if(e.id || e.id === 0){
              return (
                <Row gutter={16} key={e.id}>
                  <Col span={24}>
                    <Form.Item
                      label={t("modal.provinceNameLabel", { var: t(`constants:${provinceKindLabel}`, "") })}
                    >
                      <Input disabled value={e.name}/>
                    </Form.Item>
                  </Col>
                </Row>
              )
            }
            return null;
          })
        }
        <Row gutter={16}>
          <Col span={24}>
            <TextField
              fieldName="provinceName"
              min={6}
              label={t("modal.provinceNameLabel", { var: t(`constants:${currentProvinceKind?.text}`, "") })}
              required
              placeholder={t("modal.provinceNamePlaceholder", { var: t(`constants:${currentProvinceKind?.text}`, "") })}
              disabled={loadingSave}
            />
          </Col>
        </Row>

        <Row gutter={16} hidden>
            <Col span={24}>
              <DropdownField
                fieldName="status"
                label={t("modal.status")}
                options={commonStatus}
                disabled={loadingSave}
                placeholder={t("modal.statusPlaceholder")}
              />
            </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} hidden>
            <TextField fieldName="parentProvinceId" label="Parent ID" disabled/>
            <TextField fieldName="provinceId" label="Id" disabled/>
            <TextField fieldName="kind" label="Kind" disabled/>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ProvinceForm;