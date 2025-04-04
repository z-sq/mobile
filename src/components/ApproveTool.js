"use client";

import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { Button, Popup, Toast, Form, Modal } from "antd-mobile";
import LabelInput from "@/components/LabelInput";
import request from "@/utils/request";
import { useStores } from "@/utils/useStores";

const ApprovaTool = observer(() => {
  const [opinionValue, setOpinionValue] = useState("");
  const [moreVisible, setMoreVisible] = useState(false);
  const [disable, setDisable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const {
    approveStore: { currentInfo, updateCurInfo },
  } = useStores();

  const isForward = currentInfo ? currentInfo.difFlag === "FORWARD" : false;
  const [form] = Form.useForm();
  const state = currentInfo.state;

  const onSubmit = async (wfmParams) => {
    setDisable(true);
    try {
      const result = await request(
        "/business/wfm/wfmEngine/doWfmPost",
        "POST",
        {
          pagCode: "",
          wfmParams: [wfmParams],
          funCode: null,
          buzParams: {
            RED_NO: currentInfo.busKeyValue,
          },
        }
      );
      if (result?.success) {
        Toast.show({
          content: result.mesg,
        });
        router.push("/list");
      }
      setDisable(false);
    } catch (err) {
      setDisable(false);
    }
  };

  const onApprove = async (flag) => {
    if (!currentInfo) return;

    const values = form.getFieldsValue();
    let wfmParams = { ...currentInfo, opinion: values.opinion };
    if (flag) {
      wfmParams.opinionFlag = "1";
      onSubmit(wfmParams);
    } else {
      wfmParams.opinionFlag = "2";
      if (!values.opinion) {
        setMessage("驳回请填写审批意见!");
        setVisible(true);
        return;
      }
      onSubmit(wfmParams);
    }
  };

  const onCommit = async () => {
    if (!currentInfo) return;
    const values = form.getFieldsValue();
    if (!values.opinion) {
      setMessage("请输入评论！");
      setVisible(true);
      return;
    }
    if (values.opinion.length > 50) {
      setMessage("评论字数限制50！");
      setVisible(true);
      return;
    }
    setDisable(true);
    try {
      const result = await request(
        `/business/wfm/ins-manage-mas/forward-submit?forCode=${currentInfo.uuid}&opinion=${values.opinion}`,
        "POST"
      );
      if (result && result.success) {
        Toast.show({
          content: result.mesg,
        });
        router.push("/list");
      }
      setDisable(false);
    } catch (err) {
      setDisable(false);
    }
  };

  const saveOpinion = () => {
    if (state === "2") {
      const values = form.getFieldsValue();
      updateCurInfo({ curOpinion: values.opinion });
    }
  };

  useEffect(() => {
    if (!currentInfo) {
      //   router.push('/list')
      return;
    }
    if (state !== "2" && currentInfo && currentInfo.opinion !== null) {
      // setOpinionValue(currentInfo.opinion)
      form.setFieldsValue({
        opinion: currentInfo.opinion,
      });
    } else if (state === "2" && currentInfo && currentInfo.curOpinion) {
      form.setFieldsValue({
        opinion: currentInfo.curOpinion,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentInfo]);
  return (
    <div className="min-h-28">
      <div
        className="fixed bottom-0 z-10 inset-x-0 bg-white"
      >
        <div className="m-3">
          <Form
            layout="horizontal"
            form={form}
            requiredMarkStyle={false}
            style={{
              "--border-bottom": "none",
              "--border-inner": "none",
              "--border-top": "none",
            }}
          >
            <LabelInput
              label={isForward ? "评论 " : "审核意见 "}
              value={opinionValue}
              onChange={(val) => setOpinionValue(val)}
              read={state !== "2"}
              form={form}
              valid={visible}
            />
          </Form>
        </div>
        {state === "2" && !isForward ? (
          <div className="flex items-center justify-between gap-4 m-3">
            <Button
              className="flex-1"
              color="primary"
              fill="outline"
              onClick={() => onApprove(false)}
              disabled={disable}
            >
              驳 回
            </Button>
            <Button
              className="flex-1"
              color="primary"
              fill="solid"
              onClick={() => onApprove(true)}
              disabled={disable}
            >
              通 过
            </Button>
            <Button
              className="flex-1"
              color="primary"
              fill="outline"
              onClick={() => setMoreVisible(true)}
              disabled={disable}
            >
              更 多
            </Button>
            <Popup
              visible={moreVisible}
              onMaskClick={() => {
                setMoreVisible(false);
              }}
            >
              <div className="text-14px px-12px pb-24px">
                <div
                  className={`border-bottom-gray flex h-[48px] w-[100%] items-center justify-center ${
                    isForward ? "hidden" : ""
                  }`}
                  onClick={() => {
                    setMoreVisible(false);
                    saveOpinion();
                    router.push("/wfm/forward");
                  }}
                >
                  转发
                </div>
                <div
                  className="border-bottom-gray flex h-[48px] w-[100%] items-center justify-center"
                  onClick={() => {
                    setMoreVisible(false);
                    saveOpinion();
                    router.push("/wfm/transfer");
                  }}
                >
                  转办
                </div>
                <div
                  className="flex h-[48px] w-[100%] items-center justify-center"
                  onClick={() => setMoreVisible(false)}
                >
                  取消
                </div>
              </div>
            </Popup>
          </div>
        ) : null}
        {state === "2" && isForward ? (
          <div className="w-2/5 mx-auto">
            <Button
              block
              color="primary"
              fill="solid"
              onClick={() => onCommit()}
              disabled={disable}
            >
              评 论
            </Button>
          </div>
        ) : null}
      </div>
      <Modal
        visible={visible}
        content={message}
        closeOnMaskClick={true}
        onClose={() => setVisible(false)}
        header="提示"
        bodyClassName="mask-with-header !rounded-none"
      />
    </div>
  );
});

export default ApprovaTool;
