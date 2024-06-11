from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class Camper(db.Model, SerializerMixin):
    __tablename__ = 'campers'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    nickname = db.Column(db.String)
    age = db.Column(db.Integer)
    image_url = db.Column(db.String)

    def __repr__(self):
        return f'Camper: {self.first_name} {self.last_name}'