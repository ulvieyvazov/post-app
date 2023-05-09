import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Space, Table, Select, Form, } from 'antd';

const Products = () => {
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [value, setValue] = useState("")

    const Delet = ()=>{
        
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: 'Delet',
            key: 'delet',
            render: (_, record) => (
                <Space size="middle">
                    <a>Delete</a>
                </Space>
            )
        },
    ];

    const tableData = data
        .filter(item => {
            return item === "" ? item : item.name.toLowerCase().includes(value.toLowerCase())
        })
        .map((d) => {
            return {
                key: d.id,
                name: d.name,
                id: d.id,
                unitPrice: d.unitPrice
            }

        })



    const checkData = (e) => {
        setValue(e.target.value)
    }

    const getData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://northwind.vercel.app/api/products")
            setData(res.data)
            console.log(res.data);
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }



    const getCategories = async () => {
        try {
            const res = await axios.get("https://northwind.vercel.app/api/categories")
            setCategories(res.data)
        } catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        getData()
        getCategories()
    }, [])


    if (loading) {
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    }

    return (
        <div>
            <form action="">
                <Form.Item label="Select">
                    <Select>
                        {
                            categories.map((c) => (

                                <Select.Option value={c.name}>  {c.name}</Select.Option>
                            ))
                        }

                    </Select>
                </Form.Item>
                <button>submit</button>
            </form>
            <input type="text" onChange={checkData} />
            {data && <Table columns={columns} dataSource={tableData} />}
        </div>
    )
}

export default Products