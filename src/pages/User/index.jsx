import React, {useEffect} from 'react';
import {setBreadcrumb} from '@/states/modules/app';
import {useDispatch, useSelector} from 'react-redux';
import {Input, Select} from 'antd';
import InlineSVG from 'react-inlinesvg';
import SearchIcon from '@/assets/images/icons/duotone/magnifying-glass.svg';
import TableUser from './components/TableUser';
import Handle from './handle';
import {isRouteActive} from '@/utils/helper.js';
import MainLayout from '@/layouts/MainLayout/index.jsx';
import Commission from '@/pages/User/components/Commission/index.jsx';

function User() {
    const dispatch = useDispatch();
    const dataFilter = useSelector((state) => state.user.dataFilter);
    const paginationListUsers = useSelector((state) => state.user.paginationListUsers);
    const selectLimit = [20, 50, 100];

    const {
        handleSearchUser,
        handleEnterSearchUser,
        handleChangeSelectUser
    } = Handle();

    const content = <div className={`bg-white rounded-lg border shadow-sm`}>
        <div className={`py-8 px-8`}>
            <div className={`flex justify-between mb-2.5`}>
                <div className={`w-96`}>
                    <Input
                        value={dataFilter.keySearch}
                        onKeyDown={(e) => handleEnterSearchUser(e)}
                        onChange={(e) => handleSearchUser(e.target.value)}
                        prefix={<InlineSVG src={SearchIcon} className={`mr-1.5 w-4 h-4`} alt='' />}
                        className={`main-input`}
                        placeholder='Search by customer name'
                    />
                </div>
            </div>

            <div className={`relative main-select`}>
                <TableUser />
                <Select
                    className={`absolute bottom-0 border-[1px] !rounded-[6px] w-[140px]`}
                    value={paginationListUsers.perPage}
                    options={selectLimit.map((value) => ({value, label: `Quantity    ${value}`}))}
                    onChange={(e) => handleChangeSelectUser(e)}
                />
            </div>
        </div>
    </div>;

    return (isRouteActive('/my-project-detail/:project_id/users') ? <MainLayout>{content}</MainLayout> : content);
}

export default User;
