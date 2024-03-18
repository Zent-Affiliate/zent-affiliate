import React from 'react';
import TableDefault from '@/components/Table/index.jsx';
import Handle from '@/pages/User/components/Commission/components/HistoryTable/handle.js';
import '../../styles.scss';

function HistoryTable() {
    const {
        paginationListHistories,
        columns
    } = Handle();

    return (
        <div>
            <TableDefault
                // loading={isLoadingTableUser}
                // onChange={handleChangeTableUser}
                // dataSource={dataListUsers}
                pagination={paginationListHistories}
                columns={columns}
                rowKey={(record) => record._id}
                // handleSelectPagination={(e) => handleChangePaginationUser(e)}
                extraClassName={'history-table-custom'}
            />
        </div>
    );
}

export default HistoryTable;