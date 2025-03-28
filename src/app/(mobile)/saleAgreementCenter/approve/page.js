'use client'

import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd'
import { useRouter } from 'next/navigation'

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import BasicFormItem from '../components/BasicInformation/BasicFormItem'

import Loading from '@/components/Loading'
import TableList from '@/components/TableList'
import { BASE_PATH } from '@/config/app'
import { addCommas } from '@/utils/method'
import { useStores } from '@/utils/useStores'
import Button from '@/components/Button'
const ApprovePage = () => {
  const [loading, setLoading] = useState(true)
  const [baseInfo, setBaseInfo] = useState({})
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [total, setTotal] = useState(0)

  const {
    approveStore: { currentInfo }
  } = useStores()
  const { COM_CODE, ORD_NO, PAGE_CODE } = currentInfo
  console.log(COM_CODE, ORD_NO, PAGE_CODE, 'COM_CODE, ORD_NO,PAGE_CODE')

  const handleStatusChange = (index, newStatus) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, OPI_FLAG: newStatus } : item
      )
    )
  }
  const handleOpinionChange = (index, newStatus) => {
    console.log('走了吗',newStatus)
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, OPINION: newStatus } : item
      )
    )
  }
  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1
    },
    {
      title: '销售合同审核大类编码',
      dataIndex: 'AUD_PAR_CODE',
      key: 'AUD_PAR_CODE',
      sorter: {
        compare: (a, b) => a.AUD_PAR_CODE - b.AUD_PAR_CODE,
        multiple: 1
      }
    },
    {
      title: '销售合同审核大类名称',
      dataIndex: 'AUD_PAR_NAME',
      key: 'AUD_PAR_NAME',
      sorter: {
        compare: (a, b) => a.AUD_PAR_NAME - b.AUD_PAR_NAME,
        multiple: 2
      }
    },
    {
      title: '销售合同审核项简称',
      dataIndex: 'AUD_CHI_ABBR',
      key: 'AUD_CHI_ABBR',
      sorter: {
        compare: (a, b) => a.AUD_CHI_ABBR - b.AUD_CHI_ABBR,
        multiple: 3
      }
    },
    {
      title: '待审核人名称',
      dataIndex: 'PLA_AUD_NAME',
      key: 'PLA_AUD_NAME',
      sorter: {
        compare: (a, b) => a.PLA_AUD_NAME - b.PLA_AUD_NAME,
        multiple: 4
      }
    },
    {
      title: '审核结论',
      dataIndex: 'OPI_FLAG',
      key: 'OPI_FLAG',
      sorter: {
        compare: (a, b) => a.OPI_FLAG - b.OPI_FLAG,
        multiple: 4
      },
      render: (text, record, index) => (
        <div className="flex space-x-2">
          <Button
            style={{backgroundColor:record.OPI_FLAG === '1' ? '#DFE8F6' : ''}}
            onClick={() => handleStatusChange(index, '1')}
          >
            通过
          </Button>
          <Button
            style={{backgroundColor:record.OPI_FLAG !== '1' ? '#DFE8F6' : ''}}
            onClick={() => handleStatusChange(index, '0')}
          >
            驳回
          </Button>
        </div>
      )
    },
    {
      title: '上次审核意见',
      dataIndex: 'LAST_OPINION',
      key: 'LAST_OPINION',
      sorter: {
        compare: (a, b) => a.LAST_OPINION - b.LAST_OPINION,
        multiple: 4
      }
    },
    {
      title: '审核意见',
      dataIndex: 'OPINION',
      key: 'OPINION',
      sorter: {
        compare: (a, b) => a.OPINION - b.OPINION,
        multiple: 4
      },
      render: (text, record, index) => (
        <Input
          value={record.OPINION}
          onChange={(e) => handleOpinionChange(index, e.target.value)}
        />
      )
    },
    {
      title: '审核人名称',
      dataIndex: 'AUD_NAME',
      key: 'AUD_NAME',
      sorter: {
        compare: (a, b) => a.AUD_NAME - b.AUD_NAME,
        multiple: 4
      }
    },
    {
      title: '审核日期',
      dataIndex: 'AUD_DATE',
      key: 'AUD_DATE',
      sorter: {
        compare: (a, b) => a.AUD_DATE - b.AUD_DATE,
        multiple: 5
      }
    }
  ]

  const getBaseInfo = async () => {
    try {
      const result = await request(saleAgreementApi.getApproveBase, 'GET', {
        params: JSON.stringify({
          ORDER_NO: ORD_NO,
          COM_CODE: COM_CODE,
          PAGE_CODE: PAGE_CODE
        }),
        page: 1,
        start: 0,
        limit: 25
      })
      if (result && result.success) {
        setBaseInfo(result.data[0])
        console.log('result11111', result)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  const getDetailInfo = async (page = 1) => {
    try {
      const result = await request(saleAgreementApi.getApproveTable, 'GET', {
        params: JSON.stringify({
          ORDER_NO: ORD_NO,
          COM_CODE: COM_CODE,
          PAGE_CODE: PAGE_CODE
        }),
        page: page,
        start: 0,
        limit: 100
      })
      if (result && result.success) {
        setData(result.data)
        console.log('result', result)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (data.length >= total) {
      setHasMore(false)
      return
    }
    setPage(page + 1)
    const append = (await getDetailInfo(page + 1)) || []
    setHasMore(data.length + append.length < total)
    setData((val) => [...val, ...append])
  }

  const onSubmit = async (wfmParams) => {
    try {
      const result = await request(
        '/business/wfm/wfmEngine/doWfmPost',
        'POST',
        {
          pagCode: '',
          wfmParams: [wfmParams],
          funCode: null,
          buzParams: {
            RED_NO: reqNo
          }
        }
      )
      if (result && result.success) {
        Toast.show({
          content: result.mesg
        })
        router.push('/list')
      }
    } catch (err) {}
  }
  const onApprove = async (flag) => {
    if (!currentInfo) return

    const values = form.getFieldsValue()
    let wfmParams = { ...currentInfo, opinion: values.opinion }
    if (flag) {
      wfmParams.opinionFlag = '1'
      onSubmit(wfmParams)
    } else {
      wfmParams.opinionFlag = '2'
      if (!values.opinion) {
        setMessage('请输入审核意见！')
        setVisible(true)
        return
      }
      onSubmit(wfmParams)
    }
  }
  useEffect(() => {
    setLoading(true)
    getBaseInfo()
    getDetailInfo()
  }, [])
  return (
    <>
      <div className="text-12px px-10px py-10px h-[100%] overflow-y-auto pb-40px">
        {loading === true ? (
          <Loading />
        ) : (
          <>
            <div className="text-12px mt-16px">基本信息</div>
            <table className="w-full">
              <tbody>
                <tr>
                  <BasicFormItem
                    label="申请单位名称"
                    text={baseInfo?.COM_NAME || ''}
                  />
                  <BasicFormItem
                    label="申请部门名称"
                    text={baseInfo?.DEP_NAME || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="申请人名称"
                    text={baseInfo?.AUD_NAME || ''}
                  />
                  <BasicFormItem
                    label="申请日期"
                    text={baseInfo?.EDT_DATE || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="客户名称"
                    text={baseInfo?.CUSTOMER_NAME || ''}
                  />
                  <BasicFormItem
                    label="合同类型"
                    text={baseInfo?.CON_CLS_NAME || ''}
                  />
                </tr>
                <tr>
                  <BasicFormItem
                    label="合同分类"
                    text={baseInfo?.CON_CLS_NAME || ''}
                  />
                  <BasicFormItem
                    label="销售合同额"
                    text={baseInfo?.ORD_TOT_AMT || ''}
                  />
                </tr>
                {/*                 
                <tr>
                  <BasicFormItem
                    label="审批意见"
                    text={baseInfo?.AUD_TEXT || ''}
                    textColSpan={3}
                  />
                </tr> */}
              </tbody>
            </table>
            <div className="text-12px mt-16px">明细信息</div>
            <div className="text-12px mt-10px w-full">
              {/* <TableList
                columns={columns}
                dataSource={data}
                orderColumn={true}
                loadMore={loadMore}
                hasMore={hasMore}
                infiniteScroll={true}
              /> */}
              <Table
                bordered
                dataSource={data}
                columns={columns}
                rowClassName={() => 'editable-row'}
              />
            </div>
           
          </>
        )}
      </div>
      <div className="px-per4 absolute bottom-0 box-border w-[100%] bg-white overflow-hidden">
              <Button
                color="primary"
                fill="solid"
                style={{
                  width: '100%'
                }}
                onClick={() => {
                  onApprove(true)
                }}
              >
                通过
              </Button>
            </div>
    </>
  )
}
export default ApprovePage
