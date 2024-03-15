import React from 'react';
import TableDefault from '@/components/Table/index.jsx';
import Handle from '@/pages/User/components/Commission/components/HistoryTable/handle.js';
import '../../styles.scss';

function HistoryTable() {
    const {
        paginationListHistories,
        columns,
        histories,
        handleChangePage,
        isLoadingListHistories
    } = Handle();

    return (
        <div>
            <TableDefault
                loading={isLoadingListHistories}
                // onChange={handleChangeTableUser}
                dataSource={histories}
                pagination={paginationListHistories}
                columns={columns}
                rowKey={(record) => record._id}
                handleSelectPagination={(e) => handleChangePage(e)}
                extraClassName={'history-table-custom'}
            />
        </div>
    );
}

export default HistoryTable;