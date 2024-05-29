import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Load your data
df = pd.read_csv("car-train-data.csv")

# Fill NaN values for simplicity
df.fillna(0, inplace=True)

# Helper function to extract numeric values from strings
def extract_numeric_value(value):
    try:
        return float(str(value).split(' ')[0])
    except ValueError:
        return 0

# Extract numeric values from columns like 'Engine' and 'Power'
df['Engine'] = df['Engine'].apply(extract_numeric_value)
df['Power'] = df['Power'].apply(extract_numeric_value)

# Select features and target variable
X = df[['Year', 'Kilometers_Driven', 'Engine', 'Power', 'Seats']]
y = df['Price']

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Save the trained model to a file
joblib.dump(model, 'car_price_prediction_model.pkl')

# Optionally, evaluate the model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")
