// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, TableOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined, TableOutlined };

// ==============================|| MENU ITEMS - Home ||============================== //

const home: NavItemType = {
    id: 'home',
    title: <FormattedMessage id="home" />,
    type: 'group',
    children: [
        // {
        //     id: 'dashboard',
        //     title: <FormattedMessage id="dashboard" />,
        //     type: 'item',
        //     url: '/home/dashboard',
        //     icon: icons.DashboardOutlined,
        // },
        {
            id: 'member-dashboard',
            title: <FormattedMessage id="Member dashboard" />,
            type: 'item',
            url: '/home/member-dashboard',
            icon: icons.DashboardOutlined,
        },
        {
            id: 'applicant-dashboard',
            title: <FormattedMessage id="Applicant Dashboard" />,
            type: 'item',
            url: '/home/applicant-dashboard',
            icon: icons.DashboardOutlined,
        },
        {
            id: 'new-application',
            title: <FormattedMessage id="Application Details" />,
            type: 'item',
            url: '/home/new-application',
            icon: icons.DashboardOutlined,
        },
        {
            id: 'second-new-application',
            title: <FormattedMessage id="Second Application Details" />,
            type: 'item',
            url: '/home/second-new-application',
            icon: icons.DashboardOutlined,
        },
        {
            id: 'create',
            title: <FormattedMessage id="New Application Details" />,
            type: 'item',
            url: '/home/create',
            icon: icons.DashboardOutlined,
        },
        {
            id: 'new-forms',
            title: <FormattedMessage id="New Member Details" />,
            type: 'item',
            url: '/home/new-forms',
            icon: icons.TableOutlined,
        }
    ]
};

export default home;
