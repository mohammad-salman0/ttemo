from fastapi import FastAPI

from pydantic import BaseModel

import joblib

import numpy as np


"""
===================================
 LOAD MODEL
===================================
"""

model = joblib.load(
    "model.pkl"
)


app = FastAPI()


"""
===================================
 REQUEST MODEL
===================================
"""

class PredictionInput(BaseModel):

    volatility: float

    momentum: float

    return_30d: float

    growth_score: float

    halal_score: float

    sector_strength: float


"""
===================================
 ROOT
===================================
"""

@app.get("/")

def root():

    return {

        "message":
        "TwinTrade AI Service Running"

    }


"""
===================================
 PREDICT
===================================
"""

@app.post("/predict")

def predict(data: PredictionInput):

    features = np.array([[

        data.volatility,

        data.momentum,

        data.return_30d,

        data.growth_score,

        data.halal_score,

        data.sector_strength

    ]])


    """
    MODEL PREDICTION
    """

    prediction = model.predict(
        features
    )[0]


    """
    CONFIDENCE
    """

    confidence = max(

        model.predict_proba(
            features
        )[0]

    )


    """
    SIGNAL
    """

    signal = (

        "Bullish"

        if prediction == 1

        else "Bearish"

    )


    """
    RISK SCORE
    LOWER VOLATILITY = LOWER RISK
    """

    risk_score = max(

        1,

        min(
            100,
            int(data.volatility)
        )

    )


    """
    INVESTMENT STRENGTH
    """

    investment_strength = int(

        (

            data.growth_score

            +

            data.halal_score

            +

            data.sector_strength

        ) / 3

    )


    """
    RESPONSE
    """

    return {

        "prediction":
        int(prediction),

        "signal":
        signal,

        "confidence":
        round(confidence * 100, 2),

        "risk_score":
        risk_score,

        "investment_strength":
        investment_strength,

    }