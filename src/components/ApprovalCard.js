'use client'

import React from 'react'

import { opinionMap } from '@/config/configData'

const MessageCard = ({ data = {} }) => {
  return (
    <div className="border-top-gray pt-8px pb-8px pr-10px pl-48px text-gray text-14px relative box-border w-full">
      <div>{`转发接收人：${data.tarActName || ''}`}</div>
      <div className="flex items-start justify-between">
        <div className="flex-1 break-all">{`转发留言：${data.forMessage || ''}`}</div>
        <div className="w-120px flex justify-end">{`${data.staDate || ''} ${data.staTime || ''}`}</div>
      </div>
      <div className="flex items-start justify-between">
        <div className="flex-1 break-all">{`回复：${data.opinion || ''}`}</div>
        <div className="w-120px flex justify-end">{`${data.comDate || ''} ${data.comTime || ''}`}</div>
      </div>
    </div>
  )
}

const ApprovalCard = ({ data = {}, style = {} }) => {
  if (data.nodeCode === 'start') {
    data.executorName = data.busTabParName
    data.completedDate = data.insStaDate
    data.completedTime = data.insStaTime
  }
  return (
    <div
      className="border-bottom-gray relative box-border w-full"
      style={style}
    >
      <div className="pt-12px pb-10px pr-10px pl-16px relative box-border">
        <div className="mb-10px flex w-full items-center justify-between text-base">
          <div className="flex items-center">
            <div className="bg-blue rounded-s1 h-2.5 w-2.5"></div>
            <div className="slex-1 ml-2 font-medium text-black">
              {data.difFlag !== 'FORWARD'
                ? data.executorName || ''
                : data.tarActName || ''}
            </div>
            <div className="text-gray ml-4">
              {data.nodeCode !== 'start' && data.tarFlag !== 'Y'
                ? data.nodeName || ''
                : ''}
            </div>
          </div>
          <div className="text-blue">
            {data.nodeCode === 'start'
              ? '提交'
              : data.opinionFlag
                ? opinionMap[data.opinionFlag] || ''
                : ''}
          </div>
        </div>
        {data.nodeCode === 'start' || data.opinionFlag ? (
          <div className="text-gray ml-18px text-14px flex items-center">
            <div>{data.date}</div>
            <div className="w-120px">{`${data.completedDate || ''} ${data.completedTime || ''}`}</div>
            <div className="ml-4px">
              {data.nodeCode === 'start' ? '[提交]' : '[审核]'}
            </div>
          </div>
        ) : null}
        {data.difFlag !== 'FORWARD' ? (
          <>
            {data.nodeCode === 'start' ? null : (
              <div className="text-gray ml-18px text-14px flex items-center">
                <div>审核意见：</div>
                <div>{data.opinion || ''}</div>
              </div>
            )}
            <div className="text-gray ml-18px text-14px flex items-center">
              <div>接收人：</div>
              <div>
                {data.opinionFlag === '2'
                  ? data.busTabParName
                  : data.nextNodeParNames}
              </div>
            </div>
          </>
        ) : null}
        {data.tarFlag === 'Y' ? (
          <>
            <div className="text-gray ml-18px text-14px flex items-center">
              <div>转办留言：</div>
              <div>{data.traMessage || ''}</div>
            </div>
          </>
        ) : null}
        {data.difFlag === 'FORWARD' ? (
          <>
            <div className="text-gray ml-18px text-14px flex items-center">
              <div>转发留言：</div>
              <div>{data.forMessage || ''}</div>
            </div>
            {data.opinion ? (
              <div className="text-gray ml-18px text-14px flex items-center">
                <div>回复：</div>
                <div>{data.opinion || ''}</div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
      {data.forWords && data.forWords.length ? (
        <>
          {data.forWords.map((item, index) => {
            return <MessageCard key={index} data={item} />
          })}
        </>
      ) : null}
      {data.forWords && data.forWords.length ? (
        <>
          {data.forWords.map((item, index) => {
            return <MessageCard key={index} data={item} />
          })}
        </>
      ) : null}
    </div>
  )
}

export default ApprovalCard
