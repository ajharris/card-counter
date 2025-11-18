import math

# In future you might share logic between backend and frontend;
# for now this is a simple placeholder "true count" helper.

def true_count(running_count: int, decks_remaining: float) -> float:
    if decks_remaining <= 0:
        raise ValueError("decks_remaining must be > 0")
    return running_count / decks_remaining


def test_true_count_basic():
    assert math.isclose(true_count(8, 2.0), 4.0)


def test_true_count_raises_on_zero_decks():
    try:
        true_count(5, 0.0)
        assert False, "Expected ValueError"
    except ValueError:
        assert True
