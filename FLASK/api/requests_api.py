import requests


class RequestsApi:
    url = "http://192.168.1.13:3000"
    headers = {'content-type': "application/json"}

    @staticmethod
    def save_api(propierty):
        try:
            data = "{\"title\":\""+propierty.get_title()+"\",\"type_\":\""+propierty.get_type_()+"\",\"address\":\""+propierty.get_address()+"\",\"rooms\":\""+str(
                propierty.get_rooms())+"\",\"price\":\""+str(propierty.get_price())+"\",\"picture\":\""+propierty.get_picture()+"\",\"area\":\""+str(propierty.get_area())+"\"}"

            response = requests.request(
                "POST", RequestsApi.url+"/save", data=data, headers=RequestsApi.headers)
            if response.status_code != 200:
                return False
            else:
                return response.json()
        except:
            return False

    @ staticmethod
    def get_all_api():
        try:
            response = requests.request(
                "GET", RequestsApi.url+'/allpropierties')
            # response = requests.request("GET", RequestsApi.url, params=querystring)
            if response.status_code != 200:
                return None
            else:
                return response.json()
        except:
            return False

    @ staticmethod
    # El campo en la API aparece _id, funciona de cualquier manera (id, _id) siempre y cuándo se pongan igual
    def get_one_api(id):
        try:
            response = requests.request(
                "GET", RequestsApi.url + "/" + id)
            if response.status_code != 200:
                return None
            else:
                return response.json()
        except:
            return False

    @ staticmethod
    def delete_one_api(id):
        try:
            response = requests.request(
                "DELETE", RequestsApi.url + "/delete/" + id)
            if response.status_code != 200:
                return None
            else:
                return response.json()
        except:
            return False
