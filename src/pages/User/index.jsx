import React, {useEffect} from 'react';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import {setBreadcrumb} from '@/states/modules/app';
import {useDispatch, useSelector} from 'react-redux';
import {Input, Select} from 'antd';
import InlineSVG from 'react-inlinesvg';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import TableUser from './components/TableUser';
import Handle from './handle';

function User() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter)
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);
    const selectLimit = [20, 50, 100];

    const {
        handleSearchUser,
        handleEnterSearchUser,
        handleChangeSelectUser,
    } = Handle();

    useEffect(() => {
        let dataBreadcrumb = [
            {
                path: '/',
                name: 'Quản lý dự án'
            },
            {
                path: '/users',
                name: 'Danh sách khách hàng'
            }
        ];
        dispatch(setBreadcrumb(dataBreadcrumb));

        return () => dispatch(setBreadcrumb([]));
    }, [dispatch]);

    return (
        <MainLayout>
            <div className={`bg-white rounded-lg border shadow-sm`}>
                <div className={`py-8 px-8`}>
                    <div className={`flex justify-between mb-2.5`}>
                        <div className={`w-96`}>
                            <Input
                                value={dataFilter.keySearch}
                                onKeyDown={(e) => handleEnterSearchUser(e)}
                                onChange={(e) => handleSearchUser(e.target.value)}
                                prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                                className={`main-input`}
                                placeholder='Tìm kiếm theo tên khách hàng'
                            />
                        </div>
                    </div>

                    <div className={`relative main-select`}>
                        <TableUser />
                        <Select
                            className={`absolute bottom-0 border-[1px] !rounded-[6px] w-[140px]`}
                            value={paginationListUsers.perPage}
                            options={selectLimit.map((value) => ({value, label: `Hiển thị ${value}`}))}
                            onChange={(e) => handleChangeSelectUser(e)}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default User;
