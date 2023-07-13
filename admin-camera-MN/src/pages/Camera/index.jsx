import React, { useEffect } from "react";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, Upload } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { fetchDataCamera } from "../util/action";
import Styles from "./style.module.css";
import { Col, Form, InputNumber, Row, Select } from "antd";
const { Option } = Select;

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function Camera() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  ///modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  ///modal
  //camera
  const [cams, setCams] = useState([]);
  const fetch = async () => {
    const res = await fetchDataCamera();
    setCams(res);
  };
  const gotoEdit = () => {};
  const deteleCam = () => {};
  useEffect(() => {
    fetch();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên SP",
      dataIndex: "productName",
      ellipsis: {
        showTitle: false,
      },
      key: "productName",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "img",
      width: "15%",
      render: (_, item) => {
        return (
          <>
            <img className={Styles.img} src={item.img} alt={item.productName} />
          </>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: "10%",
      key: "1",
    },
    {
      title: "Giới thiệu",
      dataIndex: "introduce",
      width: "15%",
      ellipsis: {
        showTitle: false,
      },
      key: "2",
    },
    {
      title: "Công nghệ",
      dataIndex: "technology",
      width: "15%",
      ellipsis: {
        showTitle: false,
      },
      key: "3",
    },
    {
      title: "Xuất xứ",
      dataIndex: "origin",
      width: "10%",
      key: "4",
    },
    {
      title: "Bảo hành",
      dataIndex: "warranty",
      width: "10%",
    },
    {
      title: "Hãng",
      dataIndex: "type",
      width: "10%",
      key: "5",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "15%",
      render: (_, item) => {
        return (
          <div className={Styles.icons}>
            <Button
              shape="text"
              onClick={() => gotoEdit(item._id, item)}
              style={{ color: "blue", display: "initial" }}
            >
              Sửa
            </Button>
            <Button
              type="text"
              className={Styles.icon}
              onClick={() => deteleCam(item._id)}
              style={{ color: "red" }}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  //form

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  /// modal

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Thêm Sản Phẩm
      </Button>
        <Modal
          title="Thêm Sản Phẩm"
          width={500}
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "86",
            }}
            autoComplete="off"
            layout="vertical"
            style={{
              maxWidth: "100%",
            }}
            scrollToFirstError
          >
            <Form.Item
              name="introduce"
              label="Giới Thiệu SP"
              rules={[
                {
                  required: true,
                  message: "Please input your !",
                },
              ]}
              hasFeedback

            >
              <Input />
            </Form.Item>

            <Form.Item
              name="productName"
              label="Tên SP"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="technology"
              label="Công Nghệ"
              rules={[
                {
                  required: true,
                  message: "Please input Intro",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
              name="origin"
              label="Xuất Xứ"
              rules={[
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true,
                },
              ]}
            >
              <Select placeholder="chon xuất xứ">
                <Option value="trungquoc">Trung Quốc</Option>
                <Option value="my">Mỹ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="warranty"
              label="Bảo Hành"
              rules={[
                {
                  required: true,
                 
                },
              ]}
            >
              <Select placeholder="chọn số năm bảo hành">
                <Option value="1">1 Năm</Option>
                <Option value="2">2 Năm</Option>
                <Option value="3">3 Năm</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="type"
              label="Hãng"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <Select placeholder="chọn hãng sản xuất">
                <Option value="hikvision">Hikvision</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá"
              rules={[
                {
                  required: true,
                  message: "Please input donation amount!",
                },
              ]}
            >
              <InputNumber
                addonAfter={suffixSelector}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item>
              <Form.Item
                name="img"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload listType="picture">
                  <Button icon={<UploadOutlined />}>Upload Hình Ảnh</Button>
                </Upload>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      

      <Table
        scroll={{
          x: 1300,
        }}
        columns={columns}
        dataSource={cams?.map((item) => {
          return { ...item, key: item._id };
        })}
      />
    </>
  );
}

export default Camera;
