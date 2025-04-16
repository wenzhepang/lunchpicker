from app import app, db
from flask import request, jsonify
from models import Food

# Get all foods
@app.route('/api/foods/', methods=['GET'])
def get_foods():
    foods = Food.query.all()
    result = [food.to_json() for food in foods]
    return jsonify(result)

#