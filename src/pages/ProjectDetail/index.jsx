import MainLayout from "@/layouts/MainLayout";
import { Tabs } from "antd";
import React from "react";
import './styles.module.scss';
import { hasPermission } from "@/utils/helper";

const { Tab } = Tabs;

export default function ProductDetail() {
    return (
        hasPermission(['super_admin']) ?
        <MainLayout>
            <Tabs defaultActiveKey="1">
                <Tab tab="Quản lý user" key="1">
                    Content of tab 1
                </Tab>
                <Tab tab="Quản lý cấu hình" key="2">
                    Content of tab 2
                </Tab>
                <Tab tab="Quản lý quyền lợi" key="3">
                    Content of tab 3
                </Tab>
            </Tabs>
        </MainLayout>
        : 
        <MainLayout>
            <h1>Hello</h1>
        </MainLayout>
    );
}
