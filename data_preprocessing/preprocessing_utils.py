import pandas as pd
import numpy as np

anime_df = pd.read_csv('../dataset/anime.csv')
rating_df = pd.read_csv('../dataset/rating.csv')

print(anime_df.isnull().sum())
print(rating_df.isnull().sum())

anime_df['rating'].fillna(anime_df['rating'].mean(), inplace=True)

genre_dummies = anime_df['genre'].str.get_dummies(sep=',')
anime_df = pd.concat([anime_df, genre_dummies], axis=1)

rating_df['rating'].replace(-1, np.nan, inplace=True)

# eliminate duplicates
# todo
duplicates = rating_df[rating_df.duplicated(subset=['user_id', 'anime_id'], keep=False)]
print(duplicates.sort_values(by=['user_id', 'anime_id']))
rating_df = rating_df.groupby(['user_id', 'anime_id']).rating.mean().reset_index()
rating_df.drop_duplicates(subset=['user_id', 'anime_id'], inplace=True)
interaction_matrix = rating_df.pivot(index='user_id', columns='anime_id', values='rating')

from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
anime_df['members'] = scaler.fit_transform(anime_df[['members']])

interaction_matrix = rating_df.pivot(index='user_id', columns='anime_id', values='rating')

from sklearn.model_selection import train_test_split

train_data, test_data = train_test_split(rating_df, test_size=0.2, random_state=42)
