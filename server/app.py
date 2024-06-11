#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Camper
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized, UnprocessableEntity


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Campers(Resource):
    # def get(self):
    #     campers = [camper.to_dict() for camper in Camper.query.all()]
    #     response = make_response(campers, 200)
    #     return response

    def post(self):
        try:
            form_json = request.get_json()
            new_camper = Camper(
                first_name=form_json['first_name'],
                last_name=form_json['last_name'],
                nickname=form_json['nickname'],
                age=form_json['age'],
                image_url=form_json['image_url'],
            )
            db.session.add(new_camper)
            db.session.commit()
            response = make_response(new_camper.to_dict(), 201)
        except IntegrityError:
            raise UnprocessableEntity("Camper Could Not Be Saved, Please Try Again.")

        return response
    
api.add_resource(Campers, '/campers', endpoint='campers')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

