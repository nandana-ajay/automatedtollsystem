from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import secrets

secret_key = secrets.token_hex(16)
app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///toll_system.db'
db = SQLAlchemy(app)

#CORS(app, origins='http://localhost:3000')
CORS(app, origins='*')

# User table
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    balance = db.Column(db.Float, nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Vehicle table
class Vehicle(db.Model):
    vehicle_id = db.Column(db.String(20), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    user = db.relationship('User', backref=db.backref('vehicles', lazy=True))
    vehicle_type = db.Column(db.String(100), nullable=False)


class Toll_fare(db.Model):
    type_id = db.Column(db.Integer, primary_key=True)
    vehicle_type = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    

with app.app_context():
        db.create_all()

# Route to Home Page
@app.route('/')
def home():
    return "You have reached the homepage"

#Route for user-login
@app.route('/login', methods=['GET','POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    users = User.query.all()
    for user in users:
        if user.email == email and user.password == password:
            session['user_id'] = user.user_id  # Store user_id in session
            return jsonify({'userId': user.user_id}), 200
    
    return jsonify({'message': 'Invalid email or password'}), 400

# Route to register a user
@app.route('/register_user', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data['name']
    balance = data['balance']
    email = data['email']
    password = data['password']

    user = User(name=name, balance=balance, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200

#Route to display all the registered users
@app.route('/users', methods=['GET'])
def get_users():
    all_users = User.query.all()
    user_list = []
    for user in all_users:
        user_data = {
            'name': user.name,
            'balance':user.balance,
            'email':user.email
        }
        user_list.append(user_data)
    return jsonify({'Users': user_list})

#Route to display all the registered vehicle types and tollfares
@app.route('/tollfares', methods=['GET'])
def get_toll_fares():
    all_toll_fares = Toll_fare.query.all()
    toll_fare_list = []
    
    for toll_fare in all_toll_fares:
        fare_data = {
            'vehicle_type': toll_fare.vehicle_type,
            'amount':toll_fare.amount
        }
        toll_fare_list.append(fare_data)
    return jsonify({'Toll fares': toll_fare_list})

# Route to register a vehicle type in a toll
@app.route('/register_vehicle_type', methods=['POST'])
def register_vehicle_type():
    data = request.get_json()
    vehicle_type = data['vehicle_type']
    amount = data['amount']
    toll = Toll_fare(vehicle_type=vehicle_type, amount=amount)
    db.session.add(toll)
    db.session.commit()
    return jsonify({'message': 'Vehicle type registered successfully'})

#Route to display a particular user
@app.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    user_list=[]
    user_data = {
        'name': user.name,
        'balance':user.balance,
        'email':user.email
    }
    user_list.append(user_data)
    return jsonify({'Users': user_list})
 

#Route to add balance for a particular user

@app.route('/<int:user_id>/add_balance', methods=['POST'])
def add_balance(user_id):
    data = request.get_json()
    balance_to_add = float(data['balance']) 
    user = User.query.get(user_id)

    if user:
        user.balance += balance_to_add
        db.session.commit()
        return jsonify({'message': 'Balance added successfully'}), 200
    return jsonify({'message': 'User not found'})

#Route to display all the registered vehicles under particular user_id

@app.route('/<int:user_id>/vehicles', methods=['GET'])
def get_user_vehicles(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    vehicles = Vehicle.query.filter_by(user_id=user_id).all()

    if not vehicles:
        return jsonify({'message': 'No vehicles found for the user'}), 404

    vehicle_list = []
    for vehicle in vehicles:
        vehicle_data = {
            'vehicle_id': vehicle.vehicle_id,
            'vehicle_type': vehicle.vehicle_type
        }
        vehicle_list.append(vehicle_data)

    return jsonify({'vehicles': vehicle_list})

# Route to register a vehicle
@app.route('/<int:u_id>/register_vehicle', methods=['POST'])
def register_vehicle(u_id):

    user = User.query.get(u_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    data = request.get_json()
    vehicle_id = data['vehicle_id']
    user_id = u_id
    vehicle_type = data['vehicle_type']

    vehicle = Vehicle(vehicle_id=vehicle_id, user_id=user_id, vehicle_type=vehicle_type)
    db.session.add(vehicle)
    db.session.commit()

    return jsonify({'message': 'Vehicle registered successfully'}), 200


#Recieving signal from SIM800L along with vehicle_id and then deducting money from wallet
@app.route('/receive_signal', methods=['POST'])
def receive_signal():
    data = request.get_json()
    signal_vehicle_id = data.get('vehicle_id')
    vehicle = Vehicle.query.filter_by(vehicle_id=signal_vehicle_id).first()

    if not vehicle:
        return jsonify({'message': 'Vehicle not found'}), 404

    user_id = vehicle.user_id
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    toll_fare = Toll_fare.query.filter_by(vehicle_type=vehicle.vehicle_type).first()

    if not toll_fare:
        return jsonify({'message': 'Toll fare information not found'}), 404

    user.balance -= toll_fare.amount
    db.session.commit()
    return jsonify({'message': 'Signal processed successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)