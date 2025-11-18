from flask import Flask
from flask_cors import CORS

from routes import training_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # TODO: Configure DB here (SQLAlchemy) when you add persistence.

    app.register_blueprint(training_bp, url_prefix="/api")

    @app.get("/api/health")
    def health():
        return {"status": "ok", "message": "Card counter backend alive"}, 200

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
