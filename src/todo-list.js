import { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export function TodoList() {
  const [tareas, setTodo] = useState([]);

  const addTodo = async (todo) => {
    try {
      await fetch("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log("err", err);
      alert("no se pudo registrar intente denuevo");
    }
  };

  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  const deleteTodo = async (todo) => {
    try {
      await fetch(`http://localhost:3000/todo/${todo.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  const onFinish = async (fieldsValue) => {
    const {
      tarea,
      date: [init, finish],
    } = fieldsValue;

    await addTodo({
      tarea,
      init: init.format("dddd"),
      finish: finish.format("dddd"),
    });
    const responseTodo = await getTodo();
    setTodo(responseTodo);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  const confirmRemove = async (todo) => {
    console.log("yes remover", todo);
    await deleteTodo(todo);
    const responseTodo = await getTodo();
    setTodo(responseTodo);
  };

  useEffect(() => {
    getTodo().then((responseTodo) => {
      setTodo(responseTodo);
    });
  }, []);

  return (
    <div className="todo-list">
      <div className="flex item-center">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex">
            <Form.Item
              label="Tarea"
              name="tarea"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el tema",
                },
              ]}
            >
              <Input placeholder="Ingresa tarea" className="mr-4 full-width" />
            </Form.Item>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el rango de fecha",
                },
              ]}
            >
              <RangePicker className="full-width" />
            </Form.Item>
          </div>
          <Button className="ml-4" type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form>
      </div>
      {tareas.map((tarea, id) => (
        <ul key={id} className="flex list items-center">
          <li>{tarea.tarea}</li>
          <li className="ml-4">{tarea.init}</li>
          <li className="ml-4">{tarea.finish}</li>
          <li className="ml-4">{tarea.finish}</li>
          <li className="ml-4">
            <Tooltip title="Eliminar">
              <Popconfirm
                placement="topLeft"
                title={"Estas seguro que deseas remover el item?"}
                onConfirm={() => {
                  confirmRemove(tarea);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="danger"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>
          </li>
        </ul>
      ))}
    </div>
  );
}
