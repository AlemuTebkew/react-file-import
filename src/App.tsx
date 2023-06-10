
import { DatePicker,Layout } from 'antd';
import './App.css';
import { Button ,Table,Row,Col} from 'react-bootstrap';
import Demo from './components/FileInport';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fffddd',
  height: 64,
  fontSize:'30px',
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#555555',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '500px',
  lineHeight: '120px',
  color: '#fff',
  // backgroundColor: '#108ee9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#676776',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
function App() {
  return (
    <Layout>
    <Header style={headerStyle}>File Importing Test Solution</Header>
    <Layout hasSider>
      <Sider style={siderStyle}>Side Bar</Sider>
      <Content style={contentStyle}><Demo/></Content>
    </Layout>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>


  );
}

export default App;
