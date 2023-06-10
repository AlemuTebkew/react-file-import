import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import http from "../api-url/api-url";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  row: any;
  setRow: Dispatch<SetStateAction<Object>>;
}
const App: React.FC<Props> = ({ open, setOpen, row, setRow }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formData, setFormData] = useState<any>({id:null,itemNo:0,description:'',rate:0,qty:0,unit:'',amount:0});

  const showModal = () => {
    setOpen(true);
  };

  useEffect(()=>{
    setFormData(row)
  },[row])

  const handleOk =async () => {


    try {
      setConfirmLoading(true)
      const response= await http.put('/update_task/'+row.id,formData)
      if(response.status === 200 ){
      
        message.success('Your Data Updated Successfully');
  
      }
     } catch (error) {
      message.error('Your Data Not Updated Successfully');
  
     }finally{
      setConfirmLoading(false)
      setOpen(false);

     }

  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const formRef = React.useRef<FormInstance>(null);

  return (
    <>
      <Modal
        title="Edit Task"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={"60%"}
        style={{ top: 20 }}

      >
        {/* <TextArea rows={4} /> */}

        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          style={{ maxWidth: 700 }}
        >
          <Form.Item name="itemNo" label="ItemNO" rules={[{ required: false }]}>
            <Input
              style={{ width: 200 }}
              value={formData.itemNo}
              onChange={(e: any) => setFormData({ ...formData, itemNo: e.target.value })}
            />{" "}
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[{ required: false }]}
          >
            <TextArea
              value={formData.description}
              onChange={(e: any) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
            />{" "}
          </Form.Item>
       
          <Form.Item name="unit" label="Unit" rules={[{ required: false }]}>
            <Input
              style={{ width: 200 }}
              value={formData.unit}
              onChange={(e: any) => setFormData({ ...formData, unit: e.target.value })}
            />{" "}
          </Form.Item>
          <Form.Item name="qty" label="Qty" rules={[{ required: false }]}>
            <Input
              style={{ width: 200 }}
              value={formData.qty}
              onChange={(e: any) => setFormData({ ...formData, qty: e.target.value })}
            />{" "}
          </Form.Item>
          <Form.Item name="rate" label="Rate" rules={[{ required: false }]}>
            <Input
              style={{ width: 200 }}
              value={formData.rate}
              onChange={(e: any) => setFormData({ ...formData, rate: e.target.value })}
            />{" "}
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: false }]}>
            <Input
              style={{ width: 200 }}
              value={formData.amount}
              onChange={(e: any) => setFormData({ ...formData, amount: e.target.value })}
            />{" "}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
