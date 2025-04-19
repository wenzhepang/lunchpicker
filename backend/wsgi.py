from app import app  # 确保 "app" 是你的 Flask 实例

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))