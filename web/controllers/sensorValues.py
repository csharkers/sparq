import requests

# Função que retorna o Json

def dadosApi():
    url_api = "https://sparq-api-dpbdg9c9h3ehaub8.brazilsouth-01.azurewebsites.net/readings"
    
    try:
        response = requests.get( url_api , timeout=10)
        response.raise_for_status()
        dados = response.json()
        return dados
    except requests.RequestException as e:
        print(f"Erro na requisição: {e}")
        return None

# Função para media de temperatura

def mediaTemp():
    
    dados = dadosApi()
    
    list_temp = []
    
    for item in dados:
        
        if "temp" in item and item["temp"] is not None:
            
            list_temp.append(item["temp"]/100)
            
    if len(list_temp) > 0:
        
        soma_temp = 0 
        
        for temp in list_temp:

            soma_temp += temp
        
        media = soma_temp / len(list_temp)
        
        return media
    
    else:
        return None
    
