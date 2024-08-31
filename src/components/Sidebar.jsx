import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const Sidebar = ({ ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState();

  const dashboard = [
    {
      key: 'overview',
      label: 'Overview'
    },
    {
      key: 'quick',
      label: 'Quick'
    }
  ];

  const orders_invoices = [
    {
      key: 'newOrderForm',
      label: '新依頼書'
    },
    {
      key: 'db',
      label: 'DB'
    },
    {
      key: 'orderDB',
      label: '受注DB'
    },
    {
      key: 'billingList',
      label: '請求一覧'
    },
    {
      key: 'invoice',
      label: '請求書'
    },
    {
      key: 'invoice_Ms',
      label: '請求書_エムズ'
    },
    {
      key: 'requestList',
      label: '依頼リスト'
    },
    {
      key: 'newRequestForm',
      label: '新依頼書'
    },
    {
      key: 'invoice_receipt',
      label: '送り状・受領書'
    },
    {
      key: 'mail',
      label: 'Mail'
    }
  ];

  const containers = [
    {
      key: 'storageContainer',
      label: '実入り保管コンテナ一覧'
    },
    {
      key: 'inventoryContainer',
      label: '空バン在庫コンテナ一覧'
    }
  ];

  const calendar_schedules = [
    {
      key: 'calendar',
      label: 'カレンダー'
    },
    {
      key: 'dispatchSpecification',
      label: '配車表仕様書'
    },
    {
      key: 'taskSchedule',
      label: 'Task Schedule'
    }
  ];

  const masterDatas = [
    {
      key: 'customer',
      label: '顧客'
    },
    {
      key: 'partnerCompany',
      label: '協力会社'
    },
    {
      key: 'customerList',
      label: '顧客別料金表'
    },
    {
      key: 'partnerCompanyList',
      label: '協力会社別料金表'
    }
  ];

  const analysis_reports = [
    {
      key: 'monthlyCustomerDBGraph',
      label: '顧客別 月次グラフDB'
    },
    {
      key: 'monthlyPartnerCompanyDBGraph',
      label: '協力会社別 月次グラフDB'
    },
    {
      key: 'db_s',
      label: 'DB_S'
    },
    {
      key: 'monthlyCustomerDB',
      label: '顧客別 月次DB'
    },
    {
      key: 'storageContainerDB',
      label: '保管コンテナ一覧DB'
    },
    {
      key: 'monthlyPartnerCompany',
      label: '協力会社別 月次'
    },
    {
      key: 'departmentProfit',
      label: '部署別損益'
    },
    {
      key: 'monthlyDepartmentReport',
      label: '部署別月次報告'
    },
    {
      key: 'transportCompanyRequest',
      label: '輸送会社依頼一覧'
    }
  ];

  const document_notes = [
    {
      key: 'releaseNotes',
      label: 'リリースノート'
    },
    {
      key: 'data',
      label: 'データ'
    }
  ];

  const settings_administration = [
    {
      key: 'userManagements',
      label: 'ユーザー管理'
    },
    {
      key: 'systemSettings',
      label: 'システム設定'
    }
  ];

  const items = {
    dashboard, orders_invoices, containers, calendar_schedules, masterDatas, analysis_reports, document_notes, settings_administration
  };

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleSubmenu = (e) => {
    let parts = location.pathname.split('/');
    parts[parts.length - 1] = e.key;
    navigate(parts.join('/'));
  }

  useEffect(() => {
    const paths = location.pathname.split("/").filter(Boolean);
    if (paths.length < 2) {
      navigate(`${location.pathname}/${items[paths[0]][0]['key']}`);
    } else setCurrent(paths[1]);
  }, [location.pathname]);

  return (
    <aside className={props.className}>
      <div className={`relative h-full bg-bg-light border-r border-border-100 ${collapsed ? 'w-fit' : 'w-[250px]'}`}>
        <Menu
          onSelect={handleSubmenu}
          selectedKeys={[current]}
          mode="inline"
          items={items[location.pathname.split('/')[1]]}
        />
        <div onClick={toggleCollapsed} className='absolute top-4 right-[-10px] p-1 text-center bg-bg-light-dark rounded-full cursor-pointer z-50'>
          {collapsed ? <RightOutlined className='w-4' /> : <LeftOutlined className='w-4' />}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;