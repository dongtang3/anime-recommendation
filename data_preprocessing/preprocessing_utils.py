# Import necessary libraries
import pandas as pd
import numpy as np

# Load datasets
anime_df = pd.read_csv('../dataset/anime.csv')
rating_df = pd.read_csv('../dataset/rating.csv')

# Check for missing values in both datasets
# print(anime_df.isnull().sum())
# print(rating_df.isnull().sum())

# Fill missing ratings in anime_df with the mean rating
anime_df['rating'].fillna(anime_df['rating'].mean(), inplace=True)

# Convert the genre column into dummy variables and concatenate to the main dataframe
genre_dummies = anime_df['genre'].str.get_dummies(sep=',')
anime_df = pd.concat([anime_df, genre_dummies], axis=1)

# Replace -1 ratings in rating_df with NaN, indicating missing rating
rating_df['rating'].replace(-1, np.nan, inplace=True)

# Normalize the members column in anime_df using MinMaxScaler
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
anime_df['members'] = scaler.fit_transform(anime_df[['members']])

# Check for duplicate rows in rating_df based on user_id and anime_id
duplicates = rating_df[rating_df.duplicated(subset=['user_id', 'anime_id'], keep=False)]
print(duplicates.sort_values(by=['user_id', 'anime_id']))

# Handle duplicates by averaging the ratings for the same user_id and anime_id pairs
rating_df = rating_df.groupby(['user_id', 'anime_id']).rating.mean().reset_index()

# Generate an interaction matrix, with user_id as rows and anime_id as columns
interaction_matrix = rating_df.pivot(index='user_id', columns='anime_id', values='rating')

# Split data into training and testing sets
from sklearn.model_selection import train_test_split
train_data, test_data = train_test_split(rating_df, test_size=0.2, random_state=42)
