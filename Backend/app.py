from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('car_price_prediction_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    year = data['Year']
    kilometers_driven = data['Kilometers_Driven']
    seats = data['Seats']
    power = data['Power']
    engine = data['Engine']
    
    # Create feature array
    features = np.array([[year, kilometers_driven, engine, power, seats]])
    
    # Predict the price
    predicted_price = model.predict(features)
    
    # Return the predicted price as JSON
    return jsonify(predicted_price=predicted_price[0])

if __name__ == '__main__':
    app.run(debug=True)
