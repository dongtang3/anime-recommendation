import React, { useState } from 'react';
import {Typography, Button, Form, Input, Space } from 'antd';

const {Title} = Typography;
// Assuming these are optional labels
const tags = ['Action', 'Adventure', 'Funny', 'Sci-Fi', 'Fantasy'];

const RegistrationForm = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  // Handling label selection
  const toggleTag = tag => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  // Handling form submissions
  const onFinish = values => {
    // Form data and selected labels are processed here
    console.log('Received values of form: ', values);
    console.log('Selected tags: ', selectedTags);
  };

  return (
    <div style={{ 
      height: '100vh', 
      background: '/public/background.jpg', 
      backgroundSize: 'cover', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center' 
    }}>
    
    <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        style={{ 
          maxWidth: 300, 
          margin: 'auto', 
          color: 'white', 
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
      >
      <Title style={{ textAlign: 'center' }}>Anime Picker</Title>

      <Form.Item
        label="username"
        name="username"
        rules={[{ required: true, message: 'username plz' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'password plz' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Choose your genre">
        <Space>
          {tags.map(tag => (
            <Button
              key={tag}
              type={selectedTags.includes(tag) ? 'primary' : 'default'}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </Space>
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit" >
          submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default RegistrationForm;
