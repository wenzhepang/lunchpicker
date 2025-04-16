from app import app, db
from models import Food
from datetime import datetime, timezone

with app.app_context():
    # 清空旧数据（如果需要）
    db.session.query(Food).delete()

    food_items = [
        Food(
            name="Sushi",
            category="dinner",
            image_url="/images/sushi.png",
            liked=True,
            created_at=datetime(2024, 4, 10, 12, 30, tzinfo=timezone.utc)
        ),
        Food(
            name="Burger",
            category="lunch",
            image_url="/images/burger.png",
            liked=False,
            created_at=datetime(2024, 4, 11, 14, 0, tzinfo=timezone.utc)
        ),
        Food(
            name="Pancake",
            category="breakfast",
            image_url="/images/pancake.png",
            liked=True,
            created_at=datetime(2024, 4, 12, 8, 15, tzinfo=timezone.utc)
        ),
        Food(
            name="Hotpot",
            category="dinner",
            image_url="/images/hotpot.png",
            liked=False,
            created_at=datetime(2024, 4, 13, 18, 45, tzinfo=timezone.utc)
        )
    ]

    db.session.add_all(food_items)
    db.session.commit()

    print(f"✅ Inserted {len(food_items)} food items into food.db!")