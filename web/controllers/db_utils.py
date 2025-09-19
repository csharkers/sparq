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
    conn = None
    cursor = None
    areas = []

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        query = "SELECT nome_parque, ST_AsWKB(area) FROM parque"
        cursor.execute(query)
        
        results = cursor.fetchall()

        for row in results:
            nome = row[0]
            geometry_data = row[1]
            
            polygon = loads(geometry_data)
            geojson_str = json.dumps(polygon.__geo_interface__)
            
            areas.append({
                'nome': nome,
                'geojson': geojson_str
            })

        return areas

    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        return None
    except Exception as e:
        print(f"Erro ao processar dados de geometria: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

def get_sensors():
    conn = None
    cursor = None
    sensores = []

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        query = "SELECT nome_sensor, latitude, longitude, id_parque FROM sensores"
        cursor.execute(query)
        
        results = cursor.fetchall()

        for row in results:
            sensores.append({
                'nome': row[0],
                'latitude': float(row[1]),
                'longitude': float(row[2]),
                'id_parque': row[3]
            })

        return sensores

    except mysql.connector.Error as err:
        print(f"Erro ao conectar ao banco de dados: {err}")
        return None
    except Exception as e:
        print(f"Erro ao buscar dados dos sensores: {e}")
        return None
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
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