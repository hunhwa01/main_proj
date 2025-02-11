from pydantic import BaseModel
from typing import List

class Prediction(BaseModel):
    description: str
    place_id: str

class PlaceAutocompleteResponse(BaseModel):
    predictions: List[Prediction]
