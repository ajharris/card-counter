from flask import Blueprint, request, jsonify

training_bp = Blueprint("training", __name__)

# TODO: Plug in real DB models for sessions and attempts.

@training_bp.post("/sessions")
def create_session():
    data = request.get_json() or {}
    # For now we just echo the payload with a fake id.
    session = {
        "id": 1,  # TODO: replace with real DB id
        "drill_type": data.get("drill_type", "running_count"),
        "deck_count": data.get("deck_count", 6),
        "system": data.get("system", "hi_lo"),
        "speed_ms": data.get("speed_ms", 600),
    }
    return jsonify(session), 201


@training_bp.post("/sessions/<int:session_id>/attempts")
def create_attempt(session_id):
    data = request.get_json() or {}
    # TODO: Persist attempt; for now, just echo back.
    attempt = {
        "session_id": session_id,
        "running_count_correct": data.get("running_count_correct"),
        "running_count_user": data.get("running_count_user"),
        "response_time_ms": data.get("response_time_ms"),
    }
    return jsonify(attempt), 201
