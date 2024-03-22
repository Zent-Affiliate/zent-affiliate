import MainLayout from "@/layouts/MainLayout";
import { Tabs } from "antd";
import React from "react";
import './styles.module.scss';
import { hasPermission } from "@/utils/helper";
import User from '@/pages/User/index.jsx';
import Rule from '@/pages/Rule/index.jsx';

export default function ProductDetail() {
    const items = [
        {
          key: '1',
          label: 'List User',
          children: <User/>,
        },
        {
          key: '2',
          label: 'Rule Config',
          children: <Rule/>,
        }
      ];

    return (
        hasPermission(['super_admin']) ?
        <MainLayout>
            <Tabs defaultActiveKey="1" items={items}/>
        </MainLayout>
        :
        <MainLayout>

        </MainLayout>
    );
}
