// 一个基本的React组件，接受一个data对象，一个style对象，一个onClick函数，返回一个div元素。
import React, { useState, useEffect } from 'react'
import { Loading } from 'antd-mobile'
import { Table } from 'antd'

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import SectionTitle from './components/SectionTitle'
import Dash from './components/Dash'
// 自查表基础信息
const mockdata =  {
    CON_DATE: '2025/02/13',
    UPD_CODE: 'lhy',
    SAL_NAME: '李浩宇',
    DEP_NAME: '客户服务部',
    UPD_NAME: '李浩宇',
    ROWNUM_: '1',
    UU_ID: 'nullnullnull'
  }
// 对应的label名称：业务部门、销售员、录入人
const FIELD_LABEL = {
  DEP_NAME: '业务部门',
  SAL_NAME: '销售员',
  UPD_NAME: '录入人'
}
// 表格数据：合同条款审查项、是否符合、备注信息。还有个动态列，自查编码
const tableData = [
  {
    REMARK: null,
    IS_CONFORM: null,
    CONFORM_ITEM: null,
    ROWNUM_: '1',
    UU_ID: null
  }
]
// 表格列的配置，还有个动态列，自查编码,列排序
const columns = [
  {
    title: '合同条款审查项',
    dataIndex: 'CONFORM_ITEM',
    key: 'CONFORM_ITEM',
    sorter: {
      compare: (a, b) => a.CONFORM_ITEM - b.CONFORM_ITEM,
      multiple: 1
    }
  },
  {
    title: '是否符合',
    dataIndex: 'IS_CONFORM',
    key: 'IS_CONFORM',
    sorter: {
      compare: (a, b) => a.IS_CONFORM - b.IS_CONFORM,
      multiple: 2
    }
  },
  {
    title: '备注信息',
    dataIndex: 'REMARK',
    key: 'REMARK',
    sorter: {
      compare: (a, b) => a.REMARK - b.REMARK,
      multiple: 3
    }
  },
    {
        title: '自查编码',
        dataIndex: 'UU_ID',
        key: 'UU_ID',
        sorter: {
        compare: (a, b) => a.UU_ID - b.UU_ID,
        multiple: 4
        }
    },
    {
        title: '行号',
        dataIndex: 'ROWNUM_',
        key: 'ROWNUM_',
        sorter: {
        compare: (a, b) => a.ROWNUM_ - b.ROWNUM_,
        multiple: 5
        }
    }
]
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}

const SelfCheck = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState(mockdata)
  const [data, setData] = useState(tableData)
  // 根据接口返回的参数，重写formatFieldVal
  const formatFieldVal = (field, val) => {
    if (val === undefined || val === null || val === '') {
      return '-'
    }
    if (field === 'IS_CONFORM') {
      return val === 'Y' ? '是' : '否'
    }
    return val
  }
  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getCheckDetail, 'GET', {
        _dc: 1742895269636,
        params: { ORDER_NO: 'OM2025021300002', COM_CODE: '01' },
        page: 1,
        start: 0,
        limit: 25
      })
      if (result && result.success) {
        setBaseInfo(result.data[0])
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    }finally{
        setLoading(false)
    }
  }
  const getDetailInfo = async () => {
    try {
      const result = await request(
        saleAgreementApi.getCheckTableDetail,
        'GET',
        {
          _dc: 1742895269633,
          params: { ORDER_NO: 'OM2025021300002', COM_CODE: '01' },
          page: 1,
          start: 0,
          limit: 100
        }
      )
      if (result && result.success) {
        setData(result.data)
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    }finally{
        setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    getBaseInfo()
    getDetailInfo()
  }, [])
  return (
    <div className="flex flex-col">
      <Loading visible={loading} />

      <div className="base-info flex flex-wrap w-full max-w-full">
        <SectionTitle title="基本信息" />
        <Dash />
        <div className="base-info flex flex-wrap border border-bor-gray2 md:grid-cols-2 w-full ">
          {Object.keys(FIELD_LABEL).map((field, index) => {
            // 根据数据长度，增加边线样式
            return (
              <div
                className={`base-info-item flex w-full
                                 ${
                                   index < Object.keys(FIELD_LABEL).length - 1
                                     ? 'border-b border-gray-200'
                                     : ''
                                 }                         
                                 ${
                                   index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                 }`}
                key={field}
              >
                <div className="base-info-label w-2/5 py-3 px-4 border-r border-bor-gray2 bg-fill-blue flex items-center">
                  {FIELD_LABEL[field]}
                </div>
                <div className="base-info-val w-3/5 py-3 px-4 flex items-center">
                  {formatFieldVal(field, baseInfo[field])}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="base-info flex flex-wrap">
        <Dash borderStyle="solid" />
        <SectionTitle title="明细信息" />
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          bordered
          className="border"
        />
      </div>
    </div>
  )
}
export default SelfCheck
