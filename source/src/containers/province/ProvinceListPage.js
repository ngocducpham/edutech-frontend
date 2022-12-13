import React from "react";
import { connect } from "react-redux";
import { Button, Divider } from "antd";
import { PlusOutlined, EditOutlined, LockOutlined, CheckOutlined, DeleteOutlined,  } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import ProvinceForm from "../../compoments/province/ProvinceForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { ProvinceKinds, DEFAULT_TABLE_ITEM_SIZE, STATUS_ACTIVE } from "../../constants";
import SearchForm from '../../compoments/common/entryForm/SearchForm';
import { FieldTypes } from "../../constants/formConfig";
import {sitePathConfig} from '../../constants/sitePathConfig';
import { showErrorMessage, showSucsessMessage } from '../../services/notifyService';

const { getUserData } = actions;

class ProvinceListPage extends ListBasePage {
  initialSearch() {
    return { provinceName: "", };
  }

  constructor(props) {
    super(props);
    const { t } = props;
    this.objectName = t("objectName");
    this.breadcrumbs = [
      { name: t("breadcrumbs.currentPage") }
    ];
    this.pagination.pageSize = DEFAULT_TABLE_ITEM_SIZE;
    this.parentProvinces = [
      {
        id: undefined,
        name: undefined,
        searchName: '',
      },
      {
        id: undefined, 
        name: undefined,
        searchName: '',
      },
      {
        id: undefined ,
        name: undefined,
        searchName: '',
      }
    ]
    this.columns = [
      { title: t("table.name"),
        render: (dataRow) => {
          const { dataList } = this.props;
          const currentProvinceKind = this.findProvinceKindByKey('name', dataList.kind);
          return (
            <span style={currentProvinceKind.level < 3 ? {color: "#40a9ff", cursor: 'pointer'} : null} onClick={e=>{
              if(currentProvinceKind?.level < Object.keys(ProvinceKinds).length){
                
                //Update query string

                this.parentProvinces[currentProvinceKind.level - 1].id = dataRow.id;
                this.parentProvinces[currentProvinceKind.level - 1].name = dataRow.name;
                this.parentProvinces[currentProvinceKind.level - 1].searchName = this.search.name;

                //Clear current search form
                this.search = this.initialSearch();
                this.pagination.current = 1;
                this.setQueryString();
              }
            }}>
              {dataRow.name}
            </span>
          )
        }
      },
      this.renderActionColumn(),
    ];
    this.actionColumns = {
      isEdit: true,
      isDelete: true,
      isChangeStatus: false,
    };
  }

  renderActionColumn() {
    const { t } = this.props;
    return {
        title: t ? t('listBasePage:titleActionCol') : 'Action',
        width: '100px',
        align: 'center',
        render: (dataRow) => {
            const actionColumns = [];
            if (this.actionColumns.isEdit) {
                actionColumns.push(this.renderEditButton((
                    <Button type="link" onClick={(e) => {
                        e.stopPropagation()
                        this.getDetail(dataRow.id)
                    }} className="no-padding">
                        {this.actionColumns.isEdit.icon || <EditOutlined />}
                    </Button>
                )))
            }
            if (this.actionColumns.isChangeStatus) {
                actionColumns.push(
                    <Button type="link" onClick={(e) => {
                        e.stopPropagation()
                        this.showChangeStatusConfirm(dataRow)
                    }} className="no-padding">
                        {
                            dataRow.status === STATUS_ACTIVE
                                ?
                                <LockOutlined />
                                :
                                <CheckOutlined />
                        }
                    </Button>
                )
            }
            if (this.actionColumns.isDelete) {
                actionColumns.push(
                    this.renderDeleteButton((
                        <Button type="link" onClick={(e) => {
                            e.stopPropagation()
                            this.showDeleteConfirm(dataRow.id)
                        }} className="no-padding">
                            {this.actionColumns.isDelete.icon || <DeleteOutlined />}
                        </Button>
                    ))
                )
            }
            const actionColumnsWithDivider = [];
            actionColumns.forEach((action, index) => {
                actionColumnsWithDivider.push(action);
                if (index !== (actionColumns.length - 1)) {
                    actionColumnsWithDivider.push(<Divider type="vertical" />);
                }
            })
            return (
                <span>
                    {
                        actionColumnsWithDivider.map((action, index) => <span key={index}>{action}</span>)
                    }
                </span>
            )
        }
    }
  }




  findProvinceKindByKey = (key, value) => {
    return ProvinceKinds[Object.keys(ProvinceKinds).find(e=>ProvinceKinds[e][key]===value)];
  }

  getSearchFields() {
    const { t } = this.props;
    return [
      {
        key: "provinceName",
        seachPlaceholder: t("searchPlaceHolder.name"),
        initialValue: this.search.provinceName,
      },
    ];
  }

  loadDataTable(currentProps) {
    const queryString = qs.parse(currentProps.location.search);
    this.pagination.current = 1;
    if(!isNaN(queryString.page))
        this.pagination.current = parseInt(queryString.page);
    Object.keys(this.search).forEach(key => this.search[key] = queryString[key]);
    this.parentProvinces.forEach((prov, i) => Object.keys(this.parentProvinces[i]).forEach(key=>{
      if(i === 0){
        this.parentProvinces[i][key] = queryString['province' + key];
      }  
      else if(i === 1){
          this.parentProvinces[i][key] = queryString['district' + key];
      }
      else if(i === 2){
        this.parentProvinces[i][key] = queryString['commune' + key];
      }
    }));
    this.getList();
  }

  getList() {
    const { getDataList } = this.props;
    const page = this.pagination.current ? this.pagination.current - 1 : 0;
    let kind = ProvinceKinds.province.name;
    let parentId = null;
    if(this.parentProvinces[1].id){
      kind = ProvinceKinds.commune.name;
      parentId = this.parentProvinces[1].id;
    }
    else if(this.parentProvinces[0].id || this.parentProvinces[0].id === 0){
      kind = ProvinceKinds.district.name;
      parentId = this.parentProvinces[0].id;
    }
    const params = { page, 
                    size: this.pagination.pageSize, 
                    search: this.search,
                    parentId,
                    kind
                  };
    getDataList({ params });
  }

  setQueryString() {
    const { location: { pathname, search }, history } = this.props;
    const queryString = qs.parse(search);
    let newQsValue = {};
    if(this.pagination.current > 1) {
        newQsValue.page = this.pagination.current;
    }
    else  {
        delete queryString.page;
    }
    const refactorParentProvinces = {};
    this.parentProvinces.forEach((e, i)=>{
      if(i === 0){
        Object.keys(e).forEach(t=>{
          refactorParentProvinces['province' + t] = e[t];
        })
      }
      else if(i === 1){
        Object.keys(e).forEach(t=>{
          refactorParentProvinces['district' + t] = e[t];
        })
      }
      else if(i === 2){
        Object.keys(e).forEach(t=>{
          refactorParentProvinces['commune' + t] = e[t];
        })
      }
    });
    newQsValue = Object.assign(queryString, newQsValue, this.search, refactorParentProvinces);
    
    if(Object.keys(newQsValue).length > 0)
    {
        Object.keys(newQsValue).forEach(key => {
            if(!newQsValue[key] && newQsValue[key] !== 0)
                delete newQsValue[key];
         });
        
    }

    if(Object.keys(newQsValue).length > 0)
        history.push(`${pathname}?${qs.stringify(newQsValue)}`);
    else
        history.push(pathname);
  }
  renderSearchForm(hiddenAction) {
    const searchFields = this.getSearchFields();

    if(searchFields.length > 0)
        return <SearchForm
            key={this.props.dataList.parentId || -1}
            searchFields={searchFields}
            onSubmit={this.onSearch}
            onResetForm={this.onResetFormSearch}
            hiddenAction={hiddenAction}
            initialValues={this.search}
            />;
    return null;
}

componentWillMount() {
  const { changeBreadcrumb,  location: { search, }, t } = this.props;
  const temp = qs.parse(search);
  if (!temp)
    {
      if(this.breadcrumbs.length > 0) {
      changeBreadcrumb(this.breadcrumbs);
      }
    }
  else {
    const {districtid, districtname, districtsearchName, provinceid, provincename, provincesearchName,} = temp;
    const tempBreadcrumb=[];
    const path = sitePathConfig.province.path;
    let provincePath={};
    let districtPath={};
    let name="";
    if (provinceid && !districtid)
    {
      provincePath = {provinceid, provincename, provincesearchName}
      provincePath = qs.stringify(provincePath)
      if (provincesearchName) 
      {
        name = {}
        name.name=provincesearchName
        name = qs.stringify(name)
      }
      let provinceItem =  
        {
          name: t("breadcrumbs.currentPage"),
          path: `${path}?${name}`,
        }
        let provinceDisplayItem =  
        {
          name: provincename,
        }      
      tempBreadcrumb.push(provinceItem, provinceDisplayItem)
    }
    // name = {}
    else if (districtid)
    {
      provincePath = {provinceid, provincename, provincesearchName}
      provincePath = qs.stringify(provincePath)
      if (provincesearchName) 
      {
        name = {}
        name.name=provincesearchName
        name = qs.stringify(name)
      }
      let provinceItem =  
        {
          name: t("breadcrumbs.currentPage"),
          // path: `${path}?${provincePath}`,
          path: `${path}?${name}`,
        }    
      tempBreadcrumb.push(provinceItem)
      districtPath = {districtid, districtname, districtsearchName}
      districtPath = qs.stringify(districtPath)
      if (districtsearchName) 
      {
        name = {}
        name.name=districtsearchName
        name = qs.stringify(name)
      }
      let districtItem = 
        {
          name: provincename,
          path: `${path}?${name}&${provincePath}`,
          // path: `${path}?${provincePath}&${districtPath}`,
        }
        let districtDisplayItem =  
        {
          name: districtname,
        }   
      tempBreadcrumb.push(districtItem, districtDisplayItem);
    }
    else {
      let provinceDisplayItem =  
      {
        name: t("breadcrumbs.currentPage"),
      }      
      tempBreadcrumb.push(provinceDisplayItem)
    }
    changeBreadcrumb(tempBreadcrumb);
  }
  this.userData = getUserData();
  if(this.checkPermission())
    this.loadDataTable(this.props);
}


componentWillUpdate() {
  const { changeBreadcrumb,  location: { search, }, t } = this.props;
  const temp = qs.parse(search);
  if (!temp)
    {
      if(this.breadcrumbs.length > 0) {
      changeBreadcrumb(this.breadcrumbs);
      }
    }
  else {
    const {districtid, districtname, districtsearchName, provinceid, provincename, provincesearchName,} = temp;
    const tempBreadcrumb=[];
    const path = sitePathConfig.province.path;
    let provincePath={};
    let districtPath={};
    let name="";
    if (provinceid && !districtid)
    {
      provincePath = {provinceid, provincename, provincesearchName}
      provincePath = qs.stringify(provincePath)
      if (provincesearchName) 
      {
        name = {}
        name.name=provincesearchName
        name = qs.stringify(name)
      }
      let provinceItem =  
        {
          name: t("breadcrumbs.currentPage"),
          path: `${path}?${name}`,
        }
        let provinceDisplayItem =  
        {
          name: provincename,
        }      
      tempBreadcrumb.push(provinceItem, provinceDisplayItem)
    }
    // name = {}
    else if (districtid)
    {
      provincePath = {provinceid, provincename, provincesearchName}
      provincePath = qs.stringify(provincePath)
      if (provincesearchName) 
      {
        name = {}
        name.name=provincesearchName
        name = qs.stringify(name)
      }
      let provinceItem =  
        {
          name: t("breadcrumbs.currentPage"),
          // path: `${path}?${provincePath}`,
          path: `${path}?${name}`,
        }    
      tempBreadcrumb.push(provinceItem)
      districtPath = {districtid, districtname, districtsearchName}
      districtPath = qs.stringify(districtPath)
      if (districtsearchName) 
      {
        name = {}
        name.name=districtsearchName
        name = qs.stringify(name)
      }
      let districtItem = 
        {
          name: provincename,
          path: `${path}?${name}&${provincePath}`,
          // path: `${path}?${provincePath}&${districtPath}`,
        }
        let districtDisplayItem =  
        {
          name: districtname,
        }   
      tempBreadcrumb.push(districtItem, districtDisplayItem);
    }
    else {
      let provinceDisplayItem =  
      {
        name: t("breadcrumbs.currentPage"),
      }      
      tempBreadcrumb.push(provinceDisplayItem)
    }
    changeBreadcrumb(tempBreadcrumb);
  }
}

  render() {
    const {
      dataList,
      loading,
      t
    } = this.props;
    const { isShowModifiedModal, isShowModifiedLoading } = this.state;
    const province = dataList.data || [];
    const currentProvinceKind = this.findProvinceKindByKey('name', dataList.kind);
    this.pagination.total = dataList.totalElements || 0;
    this.objectName = t(`constants:${currentProvinceKind?.text}`, '');
    return (
      <div>
        {this.renderSearchForm()}
        <div className="action-bar">
          {
            this.renderCreateNewButton((
            <Button
                        type="primary"
                        onClick={() => this.onShowModifiedModal(false)}
                      >
              <PlusOutlined /> {t("createNewButton", { var: t(`constants:${currentProvinceKind?.text}`, "") })}
            </Button>
            ))
          }
        </div>
        <BaseTable
          columns={this.columns}
          rowKey={(record) => record.id}
          dataSource={province}
          pagination={this.pagination}
          onChange={this.handleTableChange}
          loading={loading}
        />
        <BasicModal
          visible={isShowModifiedModal}
          isEditing={this.isEditing}
          objectName={this.objectName}
          loading={isShowModifiedLoading}
          onOk={this.onOkModal}
          onCancel={this.onCancelModal}
          width={600}
        >
          <ProvinceForm
            isEditing={this.isEditing}
            dataDetail={this.isEditing ? {...this.dataDetail, parentProvinceId: dataList.parentId, kind: dataList.kind} : { kind: dataList.kind, parentProvinceId: dataList.parentId}}
            parentProvinces={this.parentProvinces}
            loadingSave={isShowModifiedLoading}
            t={t}
          />
        </BasicModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.province.tbProvinceLoading,
  dataList: state.province.provinceData || {},
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getProvinceList(payload)),
  getDataById: (payload) => dispatch(actions.getProvinceById(payload)),
  createData: (payload) => dispatch(actions.createProvince(payload)),
  updateData: (payload) => dispatch(actions.updateProvince(payload)),
  deleteData: (payload) => dispatch(actions.deleteProvince(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['provinceListPage', 'listBasePage', 'constants'])(ProvinceListPage));
