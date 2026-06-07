import pandas as pd

import numpy as np

from sklearn.ensemble import RandomForestClassifier

from sklearn.model_selection import train_test_split

from sklearn.metrics import accuracy_score

from sklearn.metrics import classification_report

import joblib


"""
========================================
 RANDOM SEED
========================================
"""

np.random.seed(42)


"""
========================================
 DATASET SIZE
========================================
"""

rows = 3000


"""
========================================
 GENERATE REALISTIC STOCK FEATURES
========================================
"""

data = {

    # VOLATILITY
    # LOWER IS BETTER
    "volatility":
        np.random.uniform(
            5,
            80,
            rows
        ),

    # MOMENTUM
    # HIGHER IS BETTER
    "momentum":
        np.random.uniform(
            -20,
            40,
            rows
        ),

    # 30 DAY RETURN
    "return_30d":
        np.random.uniform(
            -15,
            35,
            rows
        ),

    # GROWTH SCORE
    "growth_score":
        np.random.uniform(
            40,
            100,
            rows
        ),

    # HALAL SCORE
    "halal_score":
        np.random.uniform(
            50,
            100,
            rows
        ),

    # SECTOR STRENGTH
    "sector_strength":
        np.random.uniform(
            30,
            100,
            rows
        ),

}


"""
========================================
 CREATE DATAFRAME
========================================
"""

df = pd.DataFrame(data)


"""
========================================
 REALISTIC MARKET SCORING
========================================

Instead of deterministic labels,
we generate probabilistic market behavior.
"""

df["market_score"] = (

    (
        df["momentum"] * 0.30
    )

    +

    (
        df["return_30d"] * 0.25
    )

    +

    (
        df["growth_score"] * 0.20
    )

    +

    (
        df["halal_score"] * 0.15
    )

    +

    (
        df["sector_strength"] * 0.10
    )

    -

    (
        df["volatility"] * 0.25
    )

)


"""
========================================
 ADD MARKET RANDOMNESS
========================================
"""

noise = np.random.normal(

    0,
    12,
    rows

)

df["market_score"] += noise


"""
========================================
 CREATE LABELS

1 = BULLISH
0 = BEARISH
========================================
"""

df["label"] = (

    df["market_score"] > 35

).astype(int)


"""
========================================
 FEATURES
========================================
"""

X = df[[

    "volatility",

    "momentum",

    "return_30d",

    "growth_score",

    "halal_score",

    "sector_strength",

]]


"""
========================================
 TARGET
========================================
"""

y = df["label"]


"""
========================================
 TRAIN TEST SPLIT
========================================
"""

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42

)


"""
========================================
 RANDOM FOREST MODEL
========================================
"""

model = RandomForestClassifier(

    n_estimators=150,

    max_depth=8,

    min_samples_split=5,

    min_samples_leaf=3,

    random_state=42

)


"""
========================================
 TRAIN MODEL
========================================
"""

model.fit(
    X_train,
    y_train
)


"""
========================================
 PREDICTIONS
========================================
"""

predictions = model.predict(
    X_test
)


"""
========================================
 ACCURACY
========================================
"""

accuracy = accuracy_score(
    y_test,
    predictions
)


"""
========================================
 SAVE MODEL
========================================
"""

joblib.dump(
    model,
    "model.pkl"
)


"""
========================================
 OUTPUT
========================================
"""

print("\n================================")

print(
    "MODEL TRAINED SUCCESSFULLY"
)

print("================================")

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)

print("================================")

print(
    "CLASSIFICATION REPORT"
)

print("================================")

print(
    classification_report(
        y_test,
        predictions
    )
)

print("================================")

print(
    "Model saved as model.pkl"
)

print("================================\n")