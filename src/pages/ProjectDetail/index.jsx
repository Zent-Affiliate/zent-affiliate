import MainLayout from "@/layouts/MainLayout";
import { Tabs } from "antd";
import React from "react";
import './styles.module.scss';
import { hasPermission } from "@/utils/helper";
import User from '@/pages/User/index.jsx';
import Rule from '@/pages/Rule/index.jsx';
import Commission from '@/states/modules/commission/index.js';

const { Tab } = Tabs;

export default function ProductDetail() {
    return (
        hasPermission(['super_admin']) ?
        <MainLayout>
            <Tabs defaultActiveKey="1">
                <Tab tab="User Management" key="1">
                    <User/>
                </Tab>
                <Tab tab="Compensation configuration" key="3">
                    <Rule/>
                </Tab>
            </Tabs>
        </MainLayout>
        :
        <MainLayout>
            <h1>Hello</h1>
        </MainLayout>
    );
}
