class Propierty():

    def __init__(self, title='pruebapython', type_='house', address='calle20', rooms=1, price=2500, area=85, picture='imagendeprueba.jpg'):

        self.title = title
        self.type_ = type_
        self.address = address
        self.rooms = rooms
        self.price = price
        self.area = area
        self.picture = picture

    def get_title(self):
        return self.title

    def get_type_(self):
        return self.type_

    def get_address(self):
        return self.address

    def get_rooms(self):
        return self.rooms

    def get_price(self):
        return self.price

    def get_area(self):
        return self.area

    def get_picture(self):
        return self.picture

    def set_title(self, title):
        self.title = title

    def set_type_(self, type_):
        self.type_ = type_

    def set_address(self, address):
        self.address = address

    def set_rooms(self, rooms):
        self.rooms = rooms

    def set_price(self, price):
        self.price = price

    def set_area(self, area):
        self.area = area

    def set_picture(self, picture):
        self.picture = picture
