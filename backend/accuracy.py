from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)

def load_and_prepare_dataset(dataset_path):
    df = pd.read_json(dataset_path)
    X, y = prepare_dataset(df)
    return X, y

def prepare_dataset(df):
    X = []  # Features
    y = []  # Labels
    for index, row in df.iterrows():
        scores = [row['Fundamentals of Programming'], row['Computer Hardware'],
                  row['Data Structure and Algorithms'], row['Networking']]
        average_score = np.mean(scores)
        performance = 'Low' if average_score < 2 else 'Medium' if average_score < 4 else 'High'
        X.append(scores)
        y.append(performance)
    return X, y

def train_model(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    knn = KNeighborsClassifier(n_neighbors=5)
    knn.fit(X_train, y_train)
    accuracy = knn.score(X_test, y_test)
    return knn, accuracy

@app.route('/train', methods=['GET'])
def retrain_model():
    global knn_model, initial_accuracy
    X, y = load_and_prepare_dataset('./Scores_datasets.json')
    knn_model, initial_accuracy = train_model(X, y)
    return jsonify({'message': 'Model retrained', 'accuracy': initial_accuracy})

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    scores = [data['Fundamentals of Programming'], data['Computer Hardware'],
              data['Data Structure and Algorithms'], data['Networking']]
    prediction = knn_model.predict([scores])
    return jsonify({'performance_category': prediction[0]})

if __name__ == '__main__':
    
    X, y = load_and_prepare_dataset('./Scores_datasets.json')
    knn_model, initial_accuracy = train_model(X, y)
    print(knn_model, initial_accuracy)
    app.run(debug=True)