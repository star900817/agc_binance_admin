import { Input, Radio } from 'antd'
import React, { useEffect, useState } from 'react'

const AddTokenModal = () => {
    const [data, setData] = useState({
        type: 'single'
    });

    const changeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    useEffect(() => {
        setData({
            type: data.type
        })
    }, [data.type])

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block" }}>Token Type</label>
                <Radio.Group onChange={changeHandler} name='type' value={data?.type}>
                    <Radio value="single">Single</Radio>
                    <Radio value="dual">Dual</Radio>
                </Radio.Group>
            </div>
            {data?.type === "dual" &&
                <>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Base Token</label>
                        <Input
                            placeholder="Base Token"
                            name="base_token"
                            value={data?.base_token || ""}
                            onChange={changeHandler}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Face Token</label>
                        <Input
                            placeholder="Base Token"
                            name="face_token"
                            value={data?.face_token || ""}
                            onChange={changeHandler}
                        />
                    </div>
                </>
            }

            {data?.type === "single" &&
                <div style={{ marginBottom: "10px" }}>
                    <label>Token</label>
                    <Input
                        placeholder="Token"
                        name="token"
                        value={data?.token || ""}
                        onChange={changeHandler}
                    />
                </div>
            }

            <div style={{ marginBottom: "10px" }}>
                <label>Min qty</label>
                <Input
                    type='number'
                    placeholder="Minimum quantity"
                    name="min_qty"
                    value={data?.min_qty || ""}
                    onChange={changeHandler}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>Rech. Amt.</label>
                <Input
                    type='number'
                    placeholder="Rech amount"
                    name="rech_amt"
                    value={data?.rech_amt || ""}
                    onChange={changeHandler}
                />
            </div>
        </div>
    )
}

export default AddTokenModal