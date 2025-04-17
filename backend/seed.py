from app import app, db
from models import Food
from datetime import datetime, timezone
import os

with app.app_context():
    # 清空旧数据（如果需要）
    db.session.query(Food).delete()

    image_folder = os.path.join('static', 'images')
    food_items = []

    for filename in os.listdir(image_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            name = os.path.splitext(filename)[0].replace('-', ' ').title()  # e.g., fast-food -> Fast Food
            image_url = f"/{image_folder}/{filename}"  # keep leading slash like previous examples
            food_items.append(
                Food(
                    name=name,
                    category="lunch",  # default category
                    image_url=image_url,
                    liked=False,
                    created_at=datetime.now(timezone.utc)
                )
            )

    db.session.add_all(food_items)
    db.session.commit()

    print(f"✅ Inserted {len(food_items)} food items into food.db!")