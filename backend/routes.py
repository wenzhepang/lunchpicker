from unicodedata import category
from app import app, db
from flask import request, jsonify
from models import Food

# Get all foods
@app.route('/api/foods/', methods=['GET'])
def get_foods():
    foods = Food.query.all()
    result = [food.to_json() for food in foods]
    return jsonify(result)

#Create a new food
@app.route('/api/foods/', methods=['POST'])
def create_food():

    try:
        data = request.get_json()
        new_food = Food(name=data['name'], category=data['category'], image_url=data['image_url'], liked=data['liked'])
        db.session.add(new_food)
        db.session.commit()
        return jsonify({"msg":"Food created successfully"}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route("/api/foods/<int:food_id>/eat", methods=["POST"])
def mark_food_eaten(food_id):
    try:
        food = Food.query.get_or_404(food_id)
        old_count = food.times_eaten or 0
        food.times_eaten = old_count + 1
        db.session.commit()
        print(f"[INFO] Updated food ID {food_id}: times_eaten {old_count} → {food.times_eaten}")
        return jsonify({"message": "Update successful", "times_eaten": food.times_eaten}), 200
    except Exception as e:
        print(f"[ERROR] Failed to update food ID {food_id}: {str(e)}")
        return jsonify({"error": "Update failed", "details": str(e)}), 500