import { Input, Table } from 'antd'
import React, { useEffect } from 'react'

let data = []


const Logs = () => {
    const OrderTableColumns = [
        {
            title: "Create At",
            dataIndex: "created_at",
            key: "created_at",
            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
                multiple: 1,
            },
        },
        {
            title: "Order ID",
            dataIndex: "order_id",
            key: "order_id",
            sorter: {
                compare: (a, b) => a.order_id - b.order_id,
                multiple: 2,
            },
        },
        {
            title: "Ref.No",
            dataIndex: "ref_no",
            key: "ref_no",
            sorter: {
                compare: (a, b) => a.ref_no - b.ref_no,
                multiple: 3,
            },
            render: (ref) => `****${ref?.substr(-4)}`

        },
        {
            title: "Face Token",
            dataIndex: "face_token",
            key: "face_token",

            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
                multiple: 4,
            },
        },
        {
            title: "Base Token",
            dataIndex: "base_token",
            key: "base_token",
            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
                multiple: 5,
            },
        },
        {
            title: "Base Token Amount",
            dataIndex: "base_token_amt",
            key: "base_token_amt",
            sorter: {
                compare: (a, b) => a.base_token_amt - b.base_token_amt,
                multiple: 6,
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
                multiple: 7,
            },
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
                multiple: 8,
            },
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (ref) => `****${ref?.substr(-4)}`,
            sorter: {
                compare: (a, b) => a.type.localeCompare(b.type),
                multiple: 9,
            },
        },
    ];

    const dataGenerator = () => {
        let temp = []
        for (let i = 0; i < 20; i++) {
            temp.push({
                key: i,
                created_at: "2022-01-25",
                order_id: 96261 + i,
                ref_no: "0033002148629588",
                face_token: "USDT",
                base_token: "USDT",
                base_token_amt: 300 + i,
                status: "",
                type: "dual",
                code: "54545DZ52",
                description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park. asda"
            },)
        }
        data = temp
    }

    useEffect(() => {
        dataGenerator()
    }, [])

    return (
        <div>
            <div style={{ color: "black" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginBottom: "20px",
                    }}
                >
                    <h4>Orders</h4>
                    <div style={{ marginLeft: "30px" }}>
                        <label style={{ fontWeight: "bold" }}>Search orders</label> <br />
                        <Input
                            placeholder="Enter order Id"
                        //   value={sortParameters?.orderId || ""}
                        //   onChange={(e) =>
                        //     setSortParameters((prev) => ({
                        //       ...prev,
                        //       orderId: e.target.value,
                        //     }))
                        //   }
                        />
                    </div>
                </div>
                <Table
                    columns={OrderTableColumns}
                    pagination={{ defaultPageSize: 5, total: 20, showSizeChanger: true }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p style={{ margin: 0, }}>{record.description}</p>
                        ),
                    }}
                    dataSource={data || []}
                />
            </div>
        </div>
    )
}

export default Logs