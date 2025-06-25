from flask import request, session
import requests

# Função que retorna o Json

maxTemp = 0
minTemp = 0


def dadosApi():
    url_api = "https://sparq-api-dpbdg9c9h3ehaub8.brazilsouth-01.azurewebsites.net/readings"

    try:
        response = requests.get(url_api, timeout=10)
        response.raise_for_status()
        dados = response.json()
        return dados
    except requests.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Função para media de temperatura


max_temp = float('-inf')
min_temp = float('inf')


def mediaTemp():

    global max_temp
    global min_temp
    
    dados = dadosApi()
    
    list_temp = []
    
    if dados:   
        for item in dados:
            
            if "temp" in item and item["temp"] is not None:
                
                list_temp.append(item["temp"]/100)
                
        if len(list_temp):    
            
            media = sum(list_temp) / len(list_temp)
            
            if media > max_temp:
                max_temp = media
                
            if media < min_temp:
                min_temp = media
            
            return {
                "media" : round(media , 2),
                "minTemp" : round(min_temp, 2),
                "maxTemp" : round(max_temp, 2)
            }
    
    else:
        return None
    
# Função para informações dos sensores

def sensorInfo():
    
    dados = dadosApi()
    sensorSelect = 0
    sensorDados = None
    
    # if request.method == "POST":    
    #     sensorSelect = int(request.form.get('park'))
    if request.method == "POST":    
        try:
            sensorSelect = int(request.form.get('park'))
            session['sensorSelect'] = sensorSelect
        except (ValueError, TypeError):
            sensorSelect = session.get('sensorSelect', 1)
    else:
        sensorSelect = session.get('sensorSelect', 1)

        
    for sensor in dados:
            if sensor['sens_id'] == sensorSelect:
                sensorDados = sensor
                return sensorDados
                