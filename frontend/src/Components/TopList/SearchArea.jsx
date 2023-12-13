import React, { useState } from 'react';
import { Button, Input, Card, List} from 'antd';

const { Meta } = Card;

const SearchAnime = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState([]); // Used to store the status of recommendations

  // Functions to process search results
  const handleSearchResults = (data) => {
    setRecommendations(data); // Saving the retrieved recommendation data
  };

  const handleSearch = value => {
    fetch(`http://localhost:5000/get_recommendations?title=${value}`)
      .then(response => response.json())
      .then(data => {
        handleSearchResults(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Input.Search
        style={{ marginTop: '20px', marginBottom: '20px' }}
        placeholder="Search Animation..."
        enterButton="Search"
        size="large"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onSearch={() => handleSearch(searchTerm)}
      />

      {/* Animated Recommendation Cards */}
      <List
        itemLayout="horizontal"
        dataSource={recommendations}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item['Recommended Anime']}
              style={{ width: '100%' }}
            >
              <p>Rating: {item['Rating']}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SearchAnime;
