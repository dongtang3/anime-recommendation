import React, {useState} from 'react';
import axios from 'axios';

const RecommendationPage = () => {
    const [selectedAnime, setSelectedAnime] = useState({});
    const [recommendations, setRecommendations] = useState([]);

    const fetchRandomRecommendation = async () => {
        try {
            const response = await axios.get('http://localhost:5000/random_recommendation');
            setSelectedAnime(response.data.selected_anime);
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error('Error fetching random recommendation:', error);
        }
    };



    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Use full viewport height
        textAlign: 'center'
    };

    const buttonStyle = {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer'
    };

    return (
        <div style={pageStyle}>
            <h1>Anime Recommender</h1>
            <button onClick={fetchRandomRecommendation} style={buttonStyle}>Get Random Recommendations</button>
            <div>
                <h2>Selected Anime: {selectedAnime.anime_name}</h2>
                <h3>Recommendations:</h3>
                {recommendations.map((rec, index) => (
                    <div key={index}>
                        <p>{rec.anime_name} (Distance: {rec.distance.toFixed(3)})</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationPage;
