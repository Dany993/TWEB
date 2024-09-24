import { theme } from 'antd';
import { Header } from 'antd/es/layout/layout';

const HeaderComponent: React.FC = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
<Header style={{ padding: 0, background: colorBgContainer }} >
    
</Header>)};
export default HeaderComponent;