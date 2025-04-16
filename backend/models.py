from app import db
from datetime import datetime, timezone

class Food(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)           # 食物名
    category = db.Column(db.String(20), nullable=False)         # 分类：breakfast/lunch/dinner/snack
    image_url = db.Column(db.String(200), nullable=False)       # 图片路径或链接
    liked = db.Column(db.Boolean, default=False)          # 是否收藏
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))  # 添加时间

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'image_url': self.image_url,
            'liked': self.liked,
            'created_at': self.created_at.isoformat()
        }


