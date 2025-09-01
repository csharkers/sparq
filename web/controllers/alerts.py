from controllers.sensorValues import dadosApi, mediaTemp, sensorInfo, mediaHumi

data = dadosApi()

def carbAlert():


    if data:
        for item in data:

            if "carb" in item and item["carb"] is not None:

                if item["carb"] > 600:
                    return {
                        "name": item["sens_name"],
                    }
