import React, { useEffect, useState } from "react";

import {
  Table,
  Button,
  Divider,
  Space,
  Row,
  Col,
  message,
  notification,
  Popconfirm,
  Spin,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  DownloadOutlined,
  ImportOutlined,
  DeleteOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import Upload, { UploadProps } from "antd/es/upload/Upload";
import axios from "axios";
import http from "../api-url/api-url";
import EditModal from "./EditModal"
interface Task {
  id: Number;
  key: number;
  name: string;
  description: string;
  qty: number;
  amount: number;
  rate: number;
  unit: string;
}


const Demo: React.FC = () => {
  const [size, setSize] = useState<SizeType>("large"); 
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [fileSelected, setFileSelected] = React.useState<Blob>(); 
  const [row, setRow] = useState<Object>({id:null,itemNo:0,description:'',rate:0,qty:0,unit:'',amount:0});

  const [loading, setLoading] = useState<boolean>(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const columns: ColumnsType<Task> = [
    {
      key: "no",
      title: "ItemNo",
      dataIndex: "itemNo",
   
    },
    {
      key: "description",
      title: "Description",
      dataIndex: "description",
      responsive: ["md"]
    },
    {
      key: "unit",
      title: "Unit",
      dataIndex: "unit",
      responsive: ['md'],
    },
    {
      key: "qty",
      title: "Qty",
      dataIndex: "qty",
      responsive: ['md'],
    },
    {
      key: "rate",
      title: "Rate",
      dataIndex: "rate",
      responsive: ['md'],
    },
  
    {
      key: "amount",
      title: "Amount",
      dataIndex: "amount",
      responsive: ['md'],
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      responsive: ['md'],
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditTwoTone />}
            onClick={() => {
              setOpen(true)
              setRow(record)
            }}
          ></Button>
  
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={(e)=>confirm(e,record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              type="text"
              style={{ color: "red" }}
              icon={<DeleteOutlined color="danger" />}
            ></Button>{" "}
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  const data: Task[] = [];
  
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileSelected(event.target.files?.[0]);
  };
  const handleSubmission = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", fileSelected);
      const response = await http.post("/imports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status == 200) {
        setTasks(response.data);
        message.success('Your Data Imported Successfully');

        setFileSelected(null);
      } else {
      }
    } catch (error) {
      message.error('Your Data Not Imported Successfully');

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [open]);

  const fetchTasks = async () => {
    try {
      setSpinning(true)
      const resp = await http.get("/get_tasks");
      setTasks(resp.data);
    } catch (error) {}finally{
      setSpinning(false)
    }
  };

  const confirm = (e: React.MouseEvent<HTMLElement>,id) => {
    console.log(e);
   deleteTask(id)
  };
  
  const deleteTask = async(id) => {
   try {
    setSpinning(true)
    const response= await http.delete('/delete_task/'+id)
    if(response.status === 200 ){
      setTasks(tasks.filter((task)=>task.id !=id))
      message.success('Your Data Deleted Successfully');

    }
   } catch (error) {
    message.error('Your Data Not Deleted Successfully');

   }finally{
    setSpinning(false)
   }
  };
  
  return (
    <>
      <Row
        justify={"end"}
        align={"top"}
        style={{ marginBottom: "0px" }}
        gutter={1}
      >
        <Col>
 
          <div
            className="row"
            style={{ display: "flex", marginTop: "15px", marginRight: "15px" }}
          >
            <input
              id="files"
              type="file"
              accept=".xlsx,.excel"
              style={{
                backgroundColor: "orange",
                color: "white",
                height: 40,
                marginRight: "10px",
              }}
              name="file"
              onChange={changeHandler}
            />

            <Button
              disabled={!fileSelected}
              type="primary"
              icon={<ImportOutlined />}
              size={size}
              onClick={handleSubmission}
              loading={loading}
            >
              Import Excel
            </Button>
          </div>
        </Col>
      </Row>
      <Divider plain />
      <Spin tip="Loading..." spinning={spinning}>
      <Table<Task> columns={columns} dataSource={tasks} key={"tasks.id"} size="small"  bordered style={{margin:'10px',padding:'10px'}}/>

      </Spin>
   
   <EditModal row={row} setRow={setRow} open={open} setOpen={setOpen}/>
    </>
  );
};

export default Demo;
