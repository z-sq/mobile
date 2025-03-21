import BpmnViewer from 'bpmn-js/lib/Viewer'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import { workflowApi } from '@/request/apis/workflow'
import request from '@/utils/request'
import { useStores } from '@/utils/useStores'
import './BpmnViewer.css'

const BpmnViewerComponent = observer(() => {
  const containerRef = useRef(null)
  const bpmnViewerRef = useRef(null)

  const {
    approveStore: { currentInfo }
  } = useStores()

  const getXML = async () => {
    const { procCode, procName, procVersion } = currentInfo
    try {
      const result = await request(
        workflowApi.getGraph,
        'GET',
        {
          procCode,
          procName,
          procVersion,
          procInstCode: ''
        },
        '',
        '',
        false
      )
      return result
    } catch (err) {}
  }

  const customizeDiagram = () => {
    const canvas = bpmnViewerRef.current.get('canvas')
    // canvas.zoom('fit-viewport')
    const elementRegistry = bpmnViewerRef.current.get('elementRegistry')
    elementRegistry.forEach((element) => {
      if (element.type === 'bpmn:Task') {
        canvas.addMarker(element.id, 'current-node')
      }
      if (element.type === 'bpmn:StartEvent') {
        canvas.addMarker(element.id, 'approved-node')
      }
      if (element.type === 'bpmn:EndEvent') {
        canvas.addMarker(element.id, 'end-node')
      }
      if (element.type === 'bpmn:SequenceFlow') {
        canvas.addMarker(element.id, 'approve-edges')
        element.businessObject.name = 'New Name'
        // modeling.updateLabel(element, 'Flow Label')
        // modeling.setColor(element, { stroke: 'orange' })
      }
      canvas.zoom('fit-viewport')
    })
  }

  const initDiagram = async (xml) => {
    try {
      const result = await bpmnViewerRef.current.importXML(xml)
      //   const { warnings } = result
      //   console.log('warnings', warnings)
      //   const canvas = bpmnViewerRef.current.get('canvas')
      //   canvas.zoom('fit-viewport')
      customizeDiagram()
    } catch (err) {
      console.log(err.message, err.warnings)
    }
  }

  const init = async () => {
    const xml = await getXML()
    bpmnViewerRef.current = new BpmnViewer({
      container: containerRef.current,
      width: '100%',
      height: '600px'
    })
    const diagramXML = xml
    // bpmnViewerRef.current.importXML(diagramXML)
    initDiagram(diagramXML)
  }

  useEffect(() => {
    if (currentInfo) {
      init()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo])

  useEffect(() => {
    // init()
    return () => {
      bpmnViewerRef.current && bpmnViewerRef.current.destroy()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div id="view" ref={containerRef} style={{ width: '100%' }} />
})

export default BpmnViewerComponent
