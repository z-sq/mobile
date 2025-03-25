import React, { useState,useEffect } from 'react';
import {Loading} from 'antd-mobile';
import { Table } from 'antd';

import { saleAgreementApi } from '@/request/apis/saleAgre'
import request from '@/utils/request'

import SectionTitle from './components/SectionTitle'
import Dash from './components/Dash'


// 单位、合同号、申请日期、业务部门、销售员、合同名称、合同类型、合同分类、业务类型、币别名称、客户名称、客户级别、执行地区、信息来源、签约方式、开始日期、结束日期、合同额、税金、不含税额、SM、是否电子签章、首付款、首付比例、是否含运费、是否终止、变更原因
const mpckData = {
    "BZS_SM_FLAG": "N",
    "TAX_TOT_AMT": "26000000",
    "TAX_TOT_AMT_HIS": null,
    "ORD_STATUS": "N",
    "CUS_NAME": "上海小米有限责任公司",
    "SIG_DATE_HIS": null,
    "LEV_NAME": "一般客户",
    "MOD_REASON": null,
    "CON_CLS_NAME_HIS": null,
    "CUS_NAME_HIS": null,
    "ORD_NO": "OM2025021300002",
    "CIT_NAME_HIS": null,
    "ORD_TOT_AMT_HIS": null,
    "ROWNUM_": "1",
    "BZS_INV_DATE_HIS": null,
    "DEP_NAME_HIS": null,
    "ORD_NAME_HIS": null,
    "COM_NAME": "北京机械工业自动化研究所有限公司软件分公司",
    "DEP_NAME": "客户服务部",
    "COM_NAME_HIS": null,
    "LEV_NAME_HIS": null,
    "BUS_CLS_NAME": "工业软件智能管理软件--工业管理软件",
    "REA_TEXT": "市场人员联系",
    "SOU_NAME_HIS": null,
    "AMT": "200000000",
    "REC_VERSION": "1",
    "COM_CODE": "01",
    "COM_CODE_HIS": null,
    "MOD_REASON_HIS": null,
    "CIT_NAME": "榆林市",
    "ORD_TYP_NAME_HIS": null,
    "CUR_NAME_HIS": null,
    "PRE_RET_RATE": "0.442",
    "ORD_NO_HIS": null,
    "SHI_EXP_FLAG_HIS": null,
    "SHI_EXP_FLAG": null,
    "UU_ID": "OM202502130000201",
    "BUS_CLS_NAME_HIS": null,
    "SIG_DATE": "2025/02/13",
    "ORD_TYP_NAME": "纵向合同",
    "ORD_TOT_AMT": "226000000",
    "SAL_PER_NAME_HIS": null,
    "BZS_OA_DZQ_FLAG_HIS": null,
    "BZS_OA_DZQ_FLAG": "N",
    "ORD_STATUS_HIS": null,
    "BZS_SM_FLAG_HIS": null,
    "CUR_NAME": "人民币",
    "PRE_RET_AMT": "1000000",
    "SOU_NAME": "招投标",
    "REA_TEXT_HIS": null,
    "ORD_NAME": "10086110001",
    "PRE_RET_AMT_HIS": null,
    "BZS_VAL_DATE_HIS": null,
    "REC_VERSION_OLD": null,
    "SAL_PER_NAME": "李浩宇",
    "CON_CLS_NAME": "纵向合同--科技部",
    "BZS_VAL_DATE": "2025/02/13",
    "AMT_HIS": null,
    "BZS_INV_DATE": "2025/02/13",
    "PRE_RET_RATE_HIS": null
}
// 按照上面接口返回的参数，重写FIELD_LABEL和formatFieldVal
const FIELD_LABEL = {
    COM_NAME: '单位',
    ORD_NO: '合同号',
    SIG_DATE: '申请日期',
    DEP_NAME: '业务部门',
    SAL_PER_NAME: '销售员',
    ORD_NAME: '合同名称',
    ORD_TYP_NAME: '合同类型',
    CON_CLS_NAME: '合同分类',
    BUS_CLS_NAME: '业务类型',
    CUR_NAME: '币别名称',
    CUS_NAME: '客户名称',
    LEV_NAME: '客户级别',
    CIT_NAME: '执行地区',
    SOU_NAME: '信息来源',
    SHI_EXP_FLAG: '签约方式',
    BZS_VAL_DATE: '开始日期',
    BZS_INV_DATE: '结束日期',
    ORD_TOT_AMT: '合同额',
    TAX_TOT_AMT: '税金',
    AMT: '不含税额',
    BZS_SM_FLAG: 'SM',
    BZS_OA_DZQ_FLAG: '是否电子签章',
    PRE_RET_AMT: '首付款',
    PRE_RET_RATE: '首付比例',
    SHI_EXP_FLAG: '是否含运费',
    ORD_STATUS: '是否终止',
    MOD_REASON: '变更原因',
}
// 根据接口返回的参数，重写formatFieldVal
const formatFieldVal = (field, val) => {
    if (val === undefined || val === null || val === '') {
        return '-' 
    }
    if (field === 'SHI_EXP_FLAG' || field === 'BZS_SM_FLAG' || field === 'BZS_OA_DZQ_FLAG' || field === 'ORD_STATUS') {
        return val === 'Y' ? '是' : '否'
    }
    return val
}
// 表格的列如下：序号，产品编码，产品名称，规格，型号，数量，销售计量单位，不含税单价，不含税金额，税率，税金，含税单价，总金额，交货日期，保质期（月），首台套
// 对应的数据如下： 
const tableData=[
        {
            "WAR_PERIOD": "12",
            "WAR_PERIOD_HIS": null,
            "TAX_PRICE_HIS": null,
            "REQ_QTY": "100",
            "ITE_CODE": "001",
            "TAX_AMT_HIS": null,
            "ORD_NO": "OM2025021300002",
            "REQ_QTY_HIS": null,
            "TAX_AMT": "13000000",
            "ORD_AMT": "113000000",
            "UU_ID": "680a3da114f84ce09a12a66e899e1226",
            "ROWNUM_": "1",
            "SEQ_NO": "1",
            "OM_UNI_CODE": "jian",
            "TAX_PRICE": "1130000",
            "FSP_NAME_HIS": null,
            "ORD_AMT_HIS": null,
            "TAX_RATE_HIS": null,
            "PRICE": "1000000",
            "UU_ID_HIS": null,
            "ITE_CODE_HIS": null,
            "AMT": "100000000",
            "TRA_ORD_NO": "OM2025021300002",
            "ITE_MODEL_HIS": null,
            "TAX_CODE_HIS": null,
            "DEL_DATE": "2025/02/13",
            "PRICE_HIS": null,
            "ITE_NAME": "茶杯",
            "DEL_DATE_HIS": null,
            "REC_VERSION": "1",
            "OM_UNI_NAME": "件",
            "COM_CODE": "01",
            "REC_VERSION_OLD": null,
            "ITE_NAME_HIS": null,
            "OM_UNI_NAME_HIS": null,
            "ITE_MODEL": "茶杯A",
            "ITE_NORM_HIS": null,
            "TAX_RATE": "0.13",
            "OM_UNI_CODE_HIS": null,
            "TAX_CODE": null,
            "FSP_NAME": "非首台套",
            "AMT_HIS": null,
            "ITE_NORM": "茶杯A"
        },]
 // 全部的列都要能排序
const columns = 
[
    {
        title: '序号',
        dataIndex: 'SEQ_NO',
        key: 'SEQ_NO',
        sorter: {
            compare: (a, b) => a.SEQ_NO - b.SEQ_NO,
            multiple: 1,
        },
        defaultSortOrder: 'ascend',
    },
    {
        title: '产品编码',
        dataIndex: 'ITE_CODE',
        key: 'ITE_CODE',
        sorter:{
            compare: (a, b) => a.ITE_CODE - b.ITE_CODE,
            multiple: 2,
        },
        defaultSortOrder: 'ascend',
    },
    {
        title: '产品名称',
        dataIndex: 'ITE_NAME',
        key: 'ITE_NAME',
        sorter:{
            compare: (a, b) => a.ITE_NAME - b.ITE_NAME,
            multiple: 3,
        }
    },
    {
        title: '规格',
        dataIndex: 'ITE_NORM',
        key: 'ITE_NORM',
        sorter:{
            compare: (a, b) => a.ITE_NORM - b.ITE_NORM,
            multiple: 4,
        }
    },
    {
        title: '型号',
        dataIndex: 'ITE_MODEL',
        key: 'ITE_MODEL',
        sorter:{
            compare: (a, b) => a.ITE_MODEL - b.ITE_MODEL,
            multiple: 5,
        }
    },
    {
        title: '数量',
        dataIndex: 'REQ_QTY',
        key: 'REQ_QTY',
        sorter:{
            compare: (a, b) => a.REQ_QTY - b.REQ_QTY,
            multiple: 6,
        }
    },
    {
        title: '销售计量单位',
        dataIndex: 'OM_UNI_NAME',
        key: 'OM_UNI_NAME',
        sorter:{
            compare: (a, b) => a.OM_UNI_NAME - b.OM_UNI_NAME,
            multiple: 7,
        }
    },
    {
        title: '不含税单价',
        dataIndex: 'PRICE',
        key: 'PRICE',
        sorter:{
            compare: (a, b) => a.PRICE - b.PRICE,
            multiple: 8,
        }
    },
    {
        title: '不含税金额',
        dataIndex: 'AMT',
        key: 'AMT',
        sorter:{
            compare: (a, b) => a.AMT - b.AMT,
            multiple: 9,
        }
    },
    {
        title: '税率',
        dataIndex: 'TAX_RATE',
        key: 'TAX_RATE',
        sorter:{
            compare: (a, b) => a.TAX_RATE - b.TAX_RATE,
            multiple: 10,
        }
    },{
        title: '税金',
        dataIndex: 'TAX_AMT',
        key: 'TAX_AMT',
        sorter:{
            compare: (a, b) => a.TAX_AMT - b.TAX_AMT,
            multiple: 11,
        }
    },
    {
        title: '含税单价',
        dataIndex: 'TAX_PRICE',
        key: 'TAX_PRICE',
        sorter:{
            compare: (a, b) => a.TAX_PRICE - b.TAX_PRICE,
            multiple: 12,
        }
    },{
        title: '总金额',
        dataIndex: 'ORD_AMT',
        key: 'ORD_AMT',
        sorter:{
            compare: (a, b) => a.ORD_AMT - b.ORD_AMT,
            multiple: 13,
        }
    },
    {
        title: '交货日期',
        dataIndex: 'DEL_DATE',
        key: 'DEL_DATE',
        sorter:{
            compare: (a, b) => a.DEL_DATE - b.DEL_DATE,
            multiple: 14,
        }
    },
    {
        title: '保质期（月）',
        dataIndex: 'WAR_PERIOD',
        key: 'WAR_PERIOD',
        sorter:{
            compare: (a, b) => a.WAR_PERIOD - b.WAR_PERIOD,
            multiple: 15,
        }
    },
    {
        title: '首台套',
        dataIndex: 'FSP_NAME',
        key: 'FSP_NAME',
        sorter:{
            compare: (a, b) => a.FSP_NAME - b.FSP_NAME,
            multiple: 16,
        }
    }]

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const BaseInfo = ()=>{
    const [loading,setLoading] = useState(true);
    const [baseInfo,setBaseInfo] = useState(mpckData);
    const [data,setData] = useState(tableData);
    
    const getBaseInfo = async () => {
            //    入参：
            //     _dc: 1742883245756
            // params: {"usercode":"lhy"}
            // page: 1
            // start: 0
            // limit: 9999
            try {
            const result = await request( saleAgreementApi.getCompany, 'GET',
                {
                    _dc: 1742883245756,
                    params: {usercode:'lhy'},
                    page: 1,
                    start: 0,
                    limit: 9999
                }
            )
            if (result && result.success){
                setBaseInfo(result.data[0])
                setLoading(false)
                console.log('result',result)
            }
            } catch (err) {
                console.log(err)
            }
        
    }
    const getDetailInfo = async () => {
        try {
            const result = await request( saleAgreementApi.getDetail, 'GET',
                {
                    _dc: 1742883245756,
                    params: {usercode:'lhy'},
                    page: 1,
                    start: 0,
                    limit: 9999
                }
            )
            if (result && result.success){
                setData(result.data)
                setLoading(false)
                console.log('result',result)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        setLoading(true);
        getBaseInfo();
        getDetailInfo();
    },[])

    return (
       <div className='flex flex-col'>
            <Loading visible={loading} />
            
            <div className="base-info flex flex-wrap">
                <SectionTitle title="基本信息" />
                <Dash/>
                <div className="base-info flex flex-wrap border border-bor-gray2">
                {
                    Object.keys(FIELD_LABEL).map((field,index)=>{
                        // 根据数据长度，增加边线样式
                        return (
                            <div className={`base-info-item flex w-full
                             ${index<Object.keys(FIELD_LABEL).length-1?'border-b border-gray-200':''}                         
                             ${index %2===0?'bg-white':'bg-gray-50'}`
                             } key={field}>
                                <div className="base-info-label w-2/5 py-3 px-4 border-r border-bor-gray2 bg-fill-blue flex items-center">{FIELD_LABEL[field]}</div>
                                <div className="base-info-val w-3/5 py-3 px-4 flex items-center">{formatFieldVal(field,baseInfo[field])}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>    
            <div className="base-info flex flex-wrap">
                <Dash borderStyle='solid'/>
                <SectionTitle title="明细信息" />
                <Table columns={columns} dataSource={data} onChange={onChange} bordered className='border'/>
            </div>   

        </div>  
    )
}
export default BaseInfo;