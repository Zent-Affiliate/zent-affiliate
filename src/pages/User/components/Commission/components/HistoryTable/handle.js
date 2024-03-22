import React from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilterHistories} from '@/states/modules/commission';
import _ from 'lodash';
import { requestGetListHistory } from '@/api/commissions';

export default function Handle() {
  const paginationListHistories = useSelector((state) => state.commission.paginationListHistories);
  const dataFilterHistories = useSelector((state) => state.commission.dataFilterHistories);
  const histories = useSelector((state) => state.commission.histories);
  const isLoadingListHistories = useSelector((state) => state.commission.isLoadingListHistories);

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Originator name',
      dataIndex: 'original_user_name',
      key: 'original_user_name',
      width: 250,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return <div className={`font-semibold`}>{text}</div>;
      },
    },
    {
      title: 'Original amount',
      dataIndex: 'original_amount',
      key: 'original_amount',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text.toLocaleString();
      },
    },
    {
      title: 'Referee name',
      dataIndex: 'user_name',
      key: 'user_name',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text;
      },
    },
    {
      title: 'Referee amount',
      dataIndex: 'user_amount',
      key: 'user_amount',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text.toLocaleString();
      },
    },
    {
      title: 'Referrer name',
      dataIndex: 'referrer_name',
      key: 'referrer_name',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text;
      },
    },
    {
      title: 'Referrer amount',
      dataIndex: 'referrer_amount',
      key: 'referrer_amount',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text.toLocaleString();
      },
    },
    {
      title: 'Rule name',
      dataIndex: 'rule_name',
      key: 'rule_name',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text;
      },
    },
    {
      title: 'Rule code',
      dataIndex: 'rule_code',
      key: 'rule_code',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text;
      },
    },
    {
      title: 'Rule type',
      dataIndex: 'rule_type',
      key: 'rule_type',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        text = text === 0 ? 'Percent' : 'Fixed';
        return text;
      },
    },
    {
      title: 'Rule value',
      dataIndex: 'rule_value',
      key: 'rule_value',
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return text;
      },
    },
    {
      title: 'Rule config level',
      dataIndex: 'rule_level',
      key: 'rule_level',
      width: 150,
      sorter: true,
      showSorterTooltip: false,
      align: 'center',
      defaultSortOrder: '',
      render: (text) => {
        return text + 1;
      },
    },
    {
      title: 'Created at',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 250,
      sorter: true,
      showSorterTooltip: false,
      defaultSortOrder: '',
      render: (text) => {
        return moment(text).format('LLL');
      },
    },
  ];

  const handleChangePage = (e) => {
    const newFilter = _.cloneDeep(dataFilterHistories);
    dispatch(setDataFilterHistories({...newFilter, perPage: e}));
  };

  const handleChangeTableHistory = (pagination, filters, sorter)=>{
    const sortOrder = sorter.order && sorter.field ? (sorter.order === 'descend' ? 'desc' : 'asc') : null;
    const column = sortOrder ? sorter.field : null;
    dispatch(
        setDataFilterHistories({
            ...dataFilterHistories,
            sort_order: sortOrder,
            column
        })
    );
    dispatch(requestGetListHistory());
  }

  return {
    paginationListHistories,
    columns,
    dataFilterHistories,
    histories,
    handleChangePage,
    isLoadingListHistories,
    handleChangeTableHistory
  };
}
