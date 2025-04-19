# 显式添加路径解析
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app  # 现在可以正确找到 app 实例

if __name__ == "__main__":
    app.run()