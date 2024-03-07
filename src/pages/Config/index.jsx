import MainLayout from "@/layouts/MainLayout";
import InfoLark from "./components/InfoLark";
import Notification from "./components/Notification";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { setBreadcrumb } from "@/states/modules/app";
import { useDispatch } from "react-redux";

function Config() {
  const dispatch = useDispatch();

  useEffect(() => {
    let dataBreadcrumb = [
      {
        path: '/',
        name: 'Trang chủ'
      },
      {
        path: '/projects',
        name: 'Cấu hình'
      }
    ]
    dispatch(setBreadcrumb(dataBreadcrumb));

    return () => dispatch(setBreadcrumb([]));
  }, [dispatch]);

  return (
    <MainLayout>
      <Row gutter={[15, 15]} className={`mt-8`}>
        <Col span={8}>
          <InfoLark />
        </Col>
        <Col span={16} >
          <Notification />
        </Col>
      </Row>
    </MainLayout>
  )
}

export default Config;
