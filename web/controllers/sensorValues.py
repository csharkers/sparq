import requests

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