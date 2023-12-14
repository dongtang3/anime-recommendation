from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

import warnings

warnings.filterwarnings('ignore')

anime = pd.read_csv("D://DS547/anime-recommendation/dataset/anime.csv")
rating = pd.read_csv("D://DS547/anime-recommendation/dataset/rating.csv")




print("After Dropping, Null Values of Anime Dataset :")
anime.dropna(axis=0, inplace=True)


dup_anime = anime[anime.duplicated()].shape[0]



print("Null Values of Rating Dataset :")


dup_rating = rating[rating.duplicated()].shape[0]
print(f"There are {dup_rating} duplicate entries among {rating.shape[0]} entries in rating dataset.")

rating.drop_duplicates(keep='first', inplace=True)
print(f"\nAfter removing duplicate entries there are {rating.shape[0]} entries in this dataset.")

fulldata = pd.merge(anime, rating, on="anime_id", suffixes=[None, "_user"])
fulldata = fulldata.rename(columns={"rating_user": "user_rating"})

print(f"Shape of The Merged Dataset : {fulldata.shape}")

data = fulldata.copy()
data["user_rating"].replace(to_replace=-1, value=np.nan, inplace=True)
data = data.dropna(axis=0)
print("Null values after final pre-processing :")


selected_users = data["user_id"].value_counts()
data = data[data["user_id"].isin(selected_users[selected_users >= 50].index)]

data_pivot_temp = data.pivot_table(index="name", columns="user_id", values="user_rating").fillna(0)
data_pivot_temp.head()

import re


def text_cleaning(text):
    text = re.sub(r'&quot;', '', text)
    text = re.sub(r'.hack//', '', text)
    text = re.sub(r'&#039;', '', text)
    text = re.sub(r'A&#039;s', '', text)
    text = re.sub(r'I&#039;', 'I\'', text)
    text = re.sub(r'&amp;', 'and', text)

    return text


data["name"] = data["name"].apply(text_cleaning)

data_pivot = data.pivot_table(index="name", columns="user_id", values="user_rating").fillna(0)
print("After Cleaning the animes names, let's see how it looks like.")
data_pivot.head()

from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

data_matrix = csr_matrix(data_pivot.values)

model_knn = NearestNeighbors(metric="cosine", algorithm="brute")
model_knn.fit(data_matrix)

query_no = np.random.choice(data_pivot.shape[0])  # random anime title and finding recommendation
print(f"We will find recommendation for {query_no} no anime which is {data_pivot.index[query_no]}.")
distances, indices = model_knn.kneighbors(data_pivot.iloc[query_no, :].values.reshape(1, -1), n_neighbors=6)

no = []
name = []
distance = []
rating = []

for i in range(0, len(distances.flatten())):
    if i == 0:
        print(f"Recommendations for {data_pivot.index[query_no]} viewers :\n")
    else:
        #  print(f"{i}: {data_pivot.index[indices.flatten()[i]]} , with distance of {distances.flatten()[i]}")
        no.append(i)
        name.append(data_pivot.index[indices.flatten()[i]])
        distance.append(distances.flatten()[i])
        # Extract the rating values
        rating_values = anime[anime["name"] == data_pivot.index[indices.flatten()[i]]]["rating"].values

        # Check if rating values are not empty
        if rating_values.size > 0:
            rating.append(rating_values[0])  # Append the first value
        else:
            rating.append(None)  # Or some default value if no rating is found

dic = {"No": no, "Anime Name": name, "Rating": rating}
recommendation = pd.DataFrame(data=dic)
recommendation.set_index("No", inplace=True)


def initialize_model():
    global data_pivot, model_knn
    # Load data and preprocessing steps
    # ... (existing code for data loading and preprocessing)
    # Train KNN model
    # ... (existing code for model training)


def get_random_recommendation():
    query_no = np.random.choice(data_pivot.shape[0])  # Select a random anime
    distances, indices = model_knn.kneighbors(data_pivot.iloc[query_no, :].values.reshape(1, -1), n_neighbors=6)
    # Information about the randomly selected anime
    selected_anime = {
        'anime_name': data_pivot.index[query_no],
        # Include any other relevant information about the selected anime here
    }

    recommendations = []
    for i in range(1, len(distances.flatten())):  # Skip the first one as it is the anime itself
        recommendations.append({
            'anime_name': data_pivot.index[indices.flatten()[i]],
            'distance': distances.flatten()[i]
        })
        recommendations.sort(key=lambda x: x['distance'])

    return selected_anime,recommendations
