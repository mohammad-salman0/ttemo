from fastapi import FastAPI

from pydantic import BaseModel

import joblib

import numpy as np

import yfinance as yf

import pandas as pd

from ta.momentum import RSIIndicator


"""
========================================
 LOAD ML MODEL
========================================
"""

model = joblib.load(
    "model.pkl"
)


"""
========================================
 FASTAPI APP
========================================
"""

app = FastAPI()


"""
========================================
 REQUEST MODEL
========================================
"""

class PredictionInput(BaseModel):

    symbol: str


"""
========================================
 ROOT ROUTE
========================================
"""

@app.get("/")

def root():

    return {

        "message":
        "TwinTrade AI Service Running"

    }


"""
========================================
 FEATURE EXTRACTION
========================================
"""

def generate_features(symbol):

    """
    ========================================
    DOWNLOAD STOCK DATA
    ========================================
    """

    stock = yf.download(

        f"{symbol}.NS",

        period="3mo",

        interval="1d",

        progress=False,

        auto_adjust=True

    )


    """
    ========================================
    VALIDATION
    ========================================
    """

    if stock.empty:

        raise Exception(
            "No stock data found"
        )


    """
    ========================================
    CLEAN DATA
    ========================================
    """

    stock = stock.dropna()


    """
    ========================================
    CLOSE PRICES
    ========================================
    """

    close_prices = (

        stock["Close"]

        .squeeze()

    )


    """
    ========================================
    RSI
    ========================================
    """

    rsi_indicator = RSIIndicator(

        close=close_prices,

        window=14

    )

    stock["RSI"] = (
        rsi_indicator.rsi()
    )


    """
    ========================================
    DAILY RETURNS
    ========================================
    """

    stock["Returns"] = (

        close_prices

        .pct_change()

        * 100

    )


    """
    ========================================
    REMOVE NULL VALUES
    ========================================
    """

    stock = stock.dropna()


    """
    ========================================
    VOLATILITY (%)
    ========================================
    """

    volatility = float(

        stock["Returns"]

        .std()

    )


    """
    ========================================
    MOMENTUM (%)
    ========================================
    """

    momentum = float(

        (

            (

                close_prices.iloc[-1]

                -

                close_prices.iloc[-10]

            )

            /

            close_prices.iloc[-10]

        ) * 100

    )


    """
    ========================================
    30 DAY RETURN (%)
    ========================================
    """

    return_30d = float(

        (

            (

                close_prices.iloc[-1]

                -

                close_prices.iloc[-30]

            )

            /

            close_prices.iloc[-30]

        ) * 100

    )


    """
    ========================================
    RSI VALUE
    ========================================
    """

    latest_rsi = float(

        stock["RSI"].iloc[-1]

    )


    """
    ========================================
    GROWTH SCORE
    ========================================
    """

    growth_score = max(

        40,

        min(

            100,

            50 + return_30d

        )

    )


    """
    ========================================
    HALAL SCORE
    ========================================
    """

    halal_score = 85


    """
    ========================================
    SECTOR STRENGTH
    ========================================
    """

    sector_strength = max(

        50,

        min(

            100,

            60 + momentum

        )

    )


    """
    ========================================
    FINAL FEATURES
    ========================================
    """

    return {

        "volatility":
        round(volatility, 2),

        "momentum":
        round(momentum, 2),

        "return_30d":
        round(return_30d, 2),

        "growth_score":
        round(growth_score, 2),

        "halal_score":
        halal_score,

        "sector_strength":
        round(sector_strength, 2),

        "rsi":
        round(latest_rsi, 2),

    }


"""
========================================
 PREDICT ROUTE
========================================
"""

@app.post("/predict")

def predict(data: PredictionInput):

    try:

        """
        ========================================
        GENERATE FEATURES
        ========================================
        """

        features_data = generate_features(
            data.symbol
        )


        """
        ========================================
        MODEL INPUT
        ========================================
        """

        features = np.array([[

            features_data["volatility"],

            features_data["momentum"],

            features_data["return_30d"],

            features_data["growth_score"],

            features_data["halal_score"],

            features_data["sector_strength"]

        ]])


        """
        ========================================
        ML PREDICTION
        ========================================
        """

        prediction = model.predict(
            features
        )[0]


        """
        ========================================
        BASE CONFIDENCE
        ========================================
        """

        base_confidence = max(

            model.predict_proba(
                features
            )[0]

        )


        """
        ========================================
        DYNAMIC CONFIDENCE MODIFIER
        ========================================
        """

        confidence_modifier = 0


        """
        LOW VOLATILITY BOOST
        """

        if (
            features_data["volatility"]
            < 2
        ):

            confidence_modifier += 0.05


        """
        STRONG MOMENTUM BOOST
        """

        if (
            features_data["momentum"]
            > 3
        ):

            confidence_modifier += 0.05


        """
        STRONG RETURNS BOOST
        """

        if (
            features_data["return_30d"]
            > 10
        ):

            confidence_modifier += 0.04


        """
        EXTREME RSI REDUCTION
        """

        if (

            features_data["rsi"] > 75

            or

            features_data["rsi"] < 25

        ):

            confidence_modifier -= 0.08


        """
        HIGH VOLATILITY REDUCTION
        """

        if (
            features_data["volatility"]
            > 5
        ):

            confidence_modifier -= 0.07


        """
        FINAL CONFIDENCE
        """

        confidence = min(

            0.99,

            max(

                0.50,

                base_confidence
                + confidence_modifier

            )

        )


        """
        ========================================
        SIGNAL
        ========================================
        """

        signal = (

            "Bullish"

            if prediction == 1

            else "Bearish"

        )


        """
        ========================================
        INVESTMENT STRENGTH
        ========================================
        """

        investment_strength = int(

            (

                features_data["growth_score"]

                +

                features_data["halal_score"]

                +

                features_data["sector_strength"]

            ) / 3

        )


        """
        ========================================
        RISK SCORE
        ========================================
        """

        risk_score = int(

            min(

                100,

                max(

                    1,

                    features_data["volatility"]
                    * 15

                )

            )

        )


        """
        ========================================
        FINAL RESPONSE
        ========================================
        """

        return {

            "prediction":
            int(prediction),

            "signal":
            signal,

            "confidence":
            round(
                confidence * 100,
                2
            ),

            "risk_score":
            risk_score,

            "investment_strength":
            investment_strength,

            "rsi":
            features_data["rsi"],

            "volatility":
            features_data["volatility"],

            "momentum":
            features_data["momentum"],

            "return_30d":
            features_data["return_30d"],

            "growth_score":
            features_data["growth_score"],

            "sector_strength":
            features_data["sector_strength"],

            "halal_score":
            features_data["halal_score"],

        }


    except Exception as e:

        return {

            "error":
            str(e)

        }


"""
========================================
 RUN SERVER
========================================

python -m uvicorn main:app --reload

========================================
"""