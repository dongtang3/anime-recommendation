import React, { useState } from 'react';
import { Layout, Menu, Button, List, Card } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_ENDPOINT } from '../../config';

const { Header, Sider, Content } = Layout;

// Simulated array of anime data
const fakeAnimeData = [
    {
      id: 1,
      title: '鬼灭之刃',
      rank: 1,
      score: 8.7,
      description: '一部关于剑士与恶鬼战斗的故事。',
      imageId: 'kimetsuNoYaiba'
    },
    {
      id: 2,
      title: '进击的巨人',
      rank: 2,
      score: 9.0,
      description: '描述人类与巨人战斗的激烈动漫。',
      imageId: 'attackOnTitan'
    },
    {
      id: 3,
      title: '我的英雄学院',
      rank: 3,
      score: 8.5,
      description: '超能力者为正义而战的热血故事。',
      imageId: 'myHeroAcademia'
    },
    {
      id: 4,
      title: '一拳超人',
      rank: 4,
      score: 8.8,
      description: '讲述了一个无敌的英雄寻找自我和挑战的故事。',
      imageId: 'onePunchMan'
    },
    {
      id: 5,
      title: '火影忍者',
      rank: 5,
      score: 8.2,
      description: '一个关于忍者世界，友情和斗争的长篇叙述。',
      imageId: 'naruto'
    },
    {
      id: 6,
      title: '死神',
      rank: 6,
      score: 7.9,
      description: '拥有夺取灵魂能力的少年与恶灵的战斗。',
      imageId: 'bleach'
    },
    {
      id: 7,
      title: '刀剑神域',
      rank: 7,
      score: 7.7,
      description: '困在虚拟游戏世界的玩家们的求生故事。',
      imageId: 'swordArtOnline'
    },
    {
      id: 8,
      title: '龙珠',
      rank: 8,
      score: 8.1,
      description: '一群战士为保护地球不断战斗的故事。',
      imageId: 'dragonBall'
    },
    {
      id: 9,
      title: '海贼王',
      rank: 9,
      score: 8.9,
      description: '海上冒险故事，一群海贼寻找传说中的宝藏。',
      imageId: 'onePiece'
    },
    {
      id: 10,
      title: '银魂',
      rank: 10,
      score: 8.6,
      description: '幕末时期外星人入侵后的滑稽和激烈生活。',
      imageId: 'gintama'
    },
    {
        id: 10,
        title: '银魂',
        rank: 10,
        score: 8.6,
        description: '幕末时期外星人入侵后的滑稽和激烈生活。',
        imageId: 'gintama'
      },
      {
        id: 10,
        title: '银魂',
        rank: 10,
        score: 8.6,
        description: '幕末时期外星人入侵后的滑稽和激烈生活。',
        imageId: 'gintama'
      },
      {
        id: 10,
        title: '银魂',
        rank: 10,
        score: 8.6,
        description: '幕末时期外星人入侵后的滑稽和激烈生活。',
        imageId: 'gintama'
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
                  <p>排名: {anime.rank}</p>
                  <p>评分: {anime.score}</p>
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
          <AnimeList />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
