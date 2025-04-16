from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///food.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

import routes

with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)  # 明确指定 host 和 port
