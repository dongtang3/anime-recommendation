import React, { useState } from 'react';
import { Layout, Menu, Button, List, Card } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

// Simulated array of anime data
const fakeAnimeData = [
    {
      id: 1,
      title: 'The Blade of Ghost Destruction',
      rank: 1,
      score: 8.7,
      description: 'A story about a swordsman fighting an evil spirit.',
      imageId: 'kimetsuNoYaiba'
    },
    {
      id: 2,
      title: 'Attack of the Titans (video game series)',
      rank: 2,
      score: 9.0,
      description: 'An intense anime depicting humans fighting giants.',
      imageId: 'attackOnTitan'
    },
    {
      id: 3,
      title: '',
      rank: 3,
      score: 8.5,
      description: '',
      imageId: ''
    },
  ];

// Function to get fake anime image URLs (not working)
function getFakeImageUrl(anime) {
  return `https://fakeimage.com/${anime.imageId}.jpg`;
}

// AnimeList component
const AnimeList = () => {
  const navigate = useNavigate();
  const [animeList] = useState(fakeAnimeData);

  return (
    <List
      grid={{ gutter: 20, column: 2 }}
      dataSource={animeList}
      renderItem={anime => (
        <List.Item key={anime.id}>
          <Card
            hoverable
            cover={<img alt={anime.title} src={getFakeImageUrl(anime)} />}
          >
            <Card.Meta
              title={anime.title}
              description={(
                <>
                  <p>rank: {anime.rank}</p>
                  <p>rating: {anime.score}</p>
                  <p>{anime.description}</p>
                </>
              )}
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

// Dashboard component
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Sider content */}
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: "rgb(245, 239, 237)"}}>
          {/* Header content */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: "black",
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <AnimeList/>
        </Content>
      </Layout>
    </Layout>
  );
};



export default Dashboard;
