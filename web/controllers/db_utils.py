# db_utils.py
import mysql.connector
from shapely.wkb import loads
import json

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'sparqbd'
}

def get_parks():
    print("Acessando a função get_parks... Estamos no caminho certo!")
    conn = None
    cursor = None
    areas = []

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # AQUI ESTÁ A CORREÇÃO:
        # Agora a query seleciona apenas as colunas que você precisa e na ordem correta
        query = "SELECT nome_parque, longitude, latitude, area FROM parque"
        cursor.execute(query)
        
        results = cursor.fetchall()

        for (nome, lon, lat, geometry_data) in results:
            polygon = loads(geometry_data)
            geojson_str = json.dumps(polygon.__geo_interface__)
            
            areas.append({
                'nome': nome,
                'lon': lon,
                'lat': lat,
                'geojson': geojson_str
            })

        return areas

    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()