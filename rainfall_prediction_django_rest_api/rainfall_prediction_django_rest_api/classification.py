import pickle

def RainPredict(data):
    model = pickle.load(open("rainfall_prediction_django_rest_api/model_naive.sav", 'rb'))
    # model = load_model()

    predictions = model.predict([data])
    return predictions