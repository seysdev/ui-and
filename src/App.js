import { Layout } from "antd";
import { TodoList } from "./todo-list";
import "./index.css";
const { Header, Content, Footer } = Layout;
export function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>
        <div className="container">
          <TodoList />
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
