import React, { useState, useEffect } from "react";
import { Table, Input, Select, Button, Space, notification } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAllTeachers } from "@/services/userService";

const { Option } = Select;

interface Teacher {
    _id: string;
    name: string;
    email: string;
    gender: string;
    isOnline: boolean;
    pointRanking: number;
    avatar?: string; // Optional avatar field
}

const AdminTeacherManager = () => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const navigate = useNavigate();

    // Fetch data from API
    useEffect(() => {
        (async () => {
            try {
                const teachersData = await getAllTeachers();
                console.log(teachersData);
                setTeachers(teachersData);
            } catch (error) {
                notification.error({ message: 'Failed to fetch teachers' });
            }
        })();
    }, []);

    // Table columns
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (text: string) => (
                <img
                    src={text || "https://via.placeholder.com/50"}
                    alt="avatar"
                    style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
                { text: "Other", value: "other" },
            ],
            onFilter: (value: any, record: Teacher) => record.gender === value,
        },
        {
            title: "Online Status",
            dataIndex: "isOnline",
            key: "isOnline",
            render: (isOnline: boolean) => (isOnline ? "Online" : "Offline"),
        },
        {
            title: "Point Ranking",
            dataIndex: "pointRanking",
            key: "pointRanking",
            sorter: true,
            render: (text: number) => <span>{text}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Teacher) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/trang-ca-nhan/${record._id}`)} />
                    <Button icon={<EditOutlined />} onClick={() => console.log("Edit details:", record)} />
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <section className="py-4 bg-white sm:py-6 lg:py-8">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="w-20 h-20 -mr-6 overflow-hidden bg-gray-300 rounded-full">
                                <img
                                    className="object-cover w-full h-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="relative overflow-hidden bg-gray-300 border-8 border-white rounded-full w-28 h-28">
                                <img
                                    className="object-cover w-full h-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="w-20 h-20 -ml-6 overflow-hidden bg-gray-300 rounded-full">
                                <img
                                    className="object-cover w-full h-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-black lg:mt-6 sm:text-4xl lg:text-5xl">
                            Quản lý giáo viên <span className="border-b-8 border-yellow-300">2025</span>
                        </h2>
                        <p className="max-w-xl mx-auto mt-6 text-xl text-gray-600 md:mt-6">
                            Tổng số giáo viên đang họat động trong trường : {teachers?.length} giáo viên!
                        </p>
                        <Link
                            to={`/admin/giao-vien/them-moi`}
                            title=""
                            className="inline-flex items-center justify-center px-4 py-4 mt-2 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700"
                            role="button"
                        >
                            <svg
                                className="w-5 h-5 mr-2 -ml-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Thêm giáo viên
                        </Link>
                    </div>
                </div>
            </section>

            <div className="bg-white px-6">
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Search by name"
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                    />
                    <Select
                        placeholder="Filter by gender"
                        style={{ width: 150 }}
                    >
                        <Option value="">All</Option>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                    <Select
                        placeholder="Filter by online status"
                        style={{ width: 150 }}
                    >
                        <Option value="">All</Option>
                        <Option value="true">Online</Option>
                        <Option value="false">Offline</Option>
                    </Select>
                    <Button type="primary">
                    </Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={teachers}
                    rowKey={(record) => record._id}
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </>
    );
};

export default AdminTeacherManager;
