import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './AddEvents.css';
import * as eventsAction from "../../store/events";
const {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
   } = antd;

function AddEvents ()  {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [params, setParams] = useState({
        eventTitle: '',
        clubName: '',
        eventType: '',
        description: '',
        location: '',
        date: '',
        ticketInventory: ''
    })



    const handleSubmit = (e) => {
        e.preventDefault;
        setErrors([]);
        return dispatch(eventsAction.addevent({params}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
            >
            <Form.Item name="eventTitle" label="Event Title" rules={[{required: true,},]}>
                <Input
                    onChange={e => {params.eventTitle = e.target.value}}
                    value={params.eventTitle}
                />
            </Form.Item>
            <Form.Item name="clubName" label="Club Name" rules={[{required: true,},]}>
                <Input
                    onChange={e => {params.clubName = e.target.value}}
                    value={params.clubName}
                />
            </Form.Item>
            <Form.Item name="eventType" label="Event Types" rules={[{required: true,},]}>
                <Select onChange={e =>{params.eventType = e }}>
                    <Select.Option value="Academic">Academic</Select.Option>
                    <Select.Option value="Recreation">Recreation</Select.Option>
                    <Select.Option value="Sports">Sports</Select.Option>
                    <Select.Option value="Others">Others</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{required: true,},]}>
                <TextArea
                    rows={4}
                    onChange={e => {params.description = e.target.value}}
                    value={params.description}
                />
            </Form.Item>
            <Form.Item name="location" label="Location" rules={[{required: true,},]}>
                <Input
                    onChange={e => {params.location = e.target.value}}
                    value={params.location}
                />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{required: true,},]}>
                <DatePicker
                        onChange={e => {params.location = e.target.value}}
                        value={params.location}
                />
            </Form.Item>
            <Form.Item name="ticketInventory" label="Ticket Inventory" rules={[{required: true,},]}>
                <InputNumber
                    onChange={e => {params.location = e.target.value}}

                    value={params.location}
                />
            </Form.Item>
            <Form.Item className='buttons'>
            <Button className='submit' type="primary" htmlType="submit" onClick={handleSubmit}>Submit</Button>
            <Button className='Reset' htmlType="button" onClick={onReset}>Reset</Button>
          </Form.Item>
            </Form>
        </>
    );

}

export default AddEvents;
