import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from difflib import get_close_matches
from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

# Loading animated datasets
anime_data = pd.read_csv('D:/Desktop/WPI/IR/project/archive/anime.csv')
anime_data = anime_data[0:15000]
anime_data = anime_data.dropna(subset=['rating'])
# Data cleaning function for animated titles
def clean_anime_titles(text):
    text = str(text).lower()
    text = re.sub(r'&quot;|.hack//|&#039;|A&#039;s|&amp;', '', text)
    text = re.sub(r'I&#039;', 'I\'', text)
    text = re.sub(r';', ' ', text)
    return text.strip()

# Apply cleaning function to 'name' column and rename it to 'anime_name'
anime_data['anime_name'] = anime_data['name'].apply(clean_anime_titles)

# Converting Animation Types with the TF-IDF Vectorizer
tfv = TfidfVectorizer(min_df=3, max_features=None, strip_accents='unicode',
                      analyzer='word', token_pattern=r'\w{1,}',
                      ngram_range=(1, 3), stop_words='english')

# Fill in missing values in the 'genre' column
anime_data['genre'] = anime_data['genre'].fillna('')
genres_str = anime_data['genre'].str.split(',').astype(str)
tfv_matrix = tfv.fit_transform(genres_str)

# Compute the cosine similarity matrix
cosine_sim_matrix = cosine_similarity(tfv_matrix, tfv_matrix)

# Create a sequence that maps animation names to their data frame indexes
anime_index_map = pd.Series(anime_data.index, index=anime_data['anime_name']).drop_duplicates()

def get_anime_recommendations(anime_title, cosine_sim=cosine_sim_matrix):
    anime_title = anime_title.lower()
    all_anime_titles = anime_data['anime_name'].tolist()

    # Use difflib to find the best match
    best_match = get_close_matches(anime_title, all_anime_titles, n=1, cutoff=0.6)
    if not best_match:
        return "No close matches found. Please refine your search."

    best_match = best_match[0]
    anime_idx = anime_index_map[best_match]

    # Getting a similarity score
    sim_scores = list(enumerate(cosine_sim[anime_idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]  # Top 10

    recommended_anime_indices = [i[0] for i in sim_scores]

    # Return to Recommended Animations
    return pd.DataFrame({'Recommended Anime': anime_data['anime_name'].iloc[recommended_anime_indices].values,
                         'Rating': anime_data['rating'].iloc[recommended_anime_indices].values})
