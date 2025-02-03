// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined };

// ==============================|| MENU ITEMS - forms ||============================== //

const forms: NavItemType = {
    id: 'forms',
    title: <FormattedMessage id="forms" />,
    type: 'group',
    children: [
        {
            id: 'updateForm',
            title: <FormattedMessage id="Details Form" />,
            type: 'collapse',
            icon: icons.DashboardOutlined,
            children: [
                {
                    id: 'application-details',
                    title: <FormattedMessage id="Application Details" />,
                    type: 'item',
                    url: '/forms/updateform/application-details',
                },
                {
                    id: 'academic-qualification',
                    title: <FormattedMessage id="Academic Qualification" />,
                    type: 'item',
                    url: '/forms/updateform/academic-qualification',
                },
                {
                    id: 'employement-details',
                    title: <FormattedMessage id="Employement Details" />,
                    type: 'item',
                    url: '/forms/updateform/employee-details',
                },
                {
                    id: 'proffesional-membership',
                    title: <FormattedMessage id="Proffesional Membership" />,
                    type: 'item',
                    url: '/forms/updateform/proffesional-qualification',
                }
            ]
        }
    ]
};

export default forms;
