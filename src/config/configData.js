export const typeMap = {
  tp2006: {
    title: '采购申请单',
    title_Change: '采购申请单变更',
    page: 'purchase/purReq',
    pagCode: 'tp2100',
    busKey: 'reqNo'
  },
  tp4021: {//新增 tp4021
    title: '采购申请单',
    title_Change: '采购申请单变更',
    page: 'purchase/purReq',
    pagCode: 'tp2100',
    busKey: 'reqNo'
  },
  tp2014: {
    title: '招标方案',
    title_Change: '招标方案变更',
    page: 'purchase/invPlan',
    pagCode: 'tp2200',
    busKey: 'bilNo'
  },
  tp2114: {
    title: '询比价方案',
    title_Change: '询比价方案变更',
    page: 'purchase/inqPlan',
    pagCode: 'tp2200',
    busKey: 'bilNo'
  },
  tp2214: {
    title: '采购方案申请单',
    title_Change: '采购方案申请单变更',
    page: 'purchase',
    pagCode: 'tp2200',
    busKey: 'bilNo'
  },
  tp2314: {
    title: '单一来源方案',
    title_Change: '单一来源方案变更',
    page: 'purchase/singleSource',
    pagCode: 'tp2200',
    busKey: 'bilNo'
  },
  tp2132: {
    title: '推荐成交人',
    title_Change: '成交结果变更',
    page: 'bid',
    pagCode: 'tp2300',
    busKey: 'bilNo'
  },
  tp2032: {
    title: '推荐中标人',
    title_Change: '中标结果变更',
    page: 'bid',
    pagCode: 'tp2300',
    busKey: 'bilNo'
  },
  tp2514: {
    title: '资格预审方案',
    title_Change: '资格预审方案变更',
    page: 'purchase/pre',
    pagCode: 'tp2800',
    busKey: 'bilNo'
  }
}

export const busTypeMap = {
  tp2214: {
    PM04: {
      title: '合作谈判方案',
      title_Change: '合作谈判方案变更',
      page: 'negoPlan'
    },
    PM05: {
      title: '竞争性谈判方案',
      title_Change: '竞争性谈判方案变更',
      page: 'negoPlan'
    }
  }
}

export const opinionMap = {
  1: '通过',
  2: '驳回'
}
