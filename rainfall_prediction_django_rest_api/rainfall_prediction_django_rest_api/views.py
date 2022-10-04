import requests
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rainfall_prediction_django_rest_api.classification import RainPredict

@api_view(['GET'])
def getRainClassification(request):
    return Response(data={"status" : status.HTTP_200_OK, "message" : "Berhasil Mengambil Data", "data" : "Bekasi Pride"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def getWeatherData(request, city):
    response = requests.get("http://api.weatherapi.com/v1/forecast.json?key=c7ee488f0a414c00881150221223006&q="+ city +"&days=1&aqi=no&alerts=no")
    res_json = response.json()
    data = []
    print(response.status_code)
    if response.status_code == 200:
        data.append(res_json['forecast']['forecastday'][0]['day']['mintemp_c'])
        data.append(res_json['forecast']['forecastday'][0]['day']['maxtemp_c'])
        data.append(res_json['forecast']['forecastday'][0]['day']['avgtemp_c'])
        data.append(res_json['forecast']['forecastday'][0]['day']['avghumidity'])
        data.append(float(res_json['forecast']['forecastday'][0]['day']['maxwind_mph'])*0.44704)
        predict = RainPredict(data)
        return Response(data={"status" : status.HTTP_200_OK, "message" : "Berhasil Mengambil Data", "data" : res_json, "predict" : predict}, status=status.HTTP_200_OK)
    else:
        return Response(data={"status" : status.HTTP_400_BAD_REQUEST, "message" : "Kota tidak ditemukan"}, status=status.HTTP_400_BAD_REQUEST)