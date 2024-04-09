import random
from flask import Flask, request, jsonify, flash, redirect, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import datetime
import json, random
from sqlalchemy import func, extract
from werkzeug.utils import secure_filename
import csv, os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/adaptive'
app.config['UPLOAD_FOLDER'] = '/Users/iambrian/Documents/reactjs/system/backend/questions'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Brianjhon23!!rghjosarlmhpciixnkil.supabase.co:5432/postgres'
db = SQLAlchemy(app)

ALLOWED_EXTENSIONS = {'json', 'csv'}

class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    login_count = db.Column(db.Integer, default=0)
    date_of_join = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, first_name, surname, username, password, role, date_of_join):
        self.first_name = first_name
        self.surname = surname
        self.username = username
        self.password = password
        self.role = role
        self.date_of_join = date_of_join

class Students(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    middle_initial = db.Column(db.String(10), nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    birthplace = db.Column(db.String(120), nullable=False)
    citizenship = db.Column(db.String(80), nullable=False)
    civil_status = db.Column(db.String(20), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    religion = db.Column(db.String(100), nullable=False)
    program = db.Column(db.String(100), nullable=False)
    login_count = db.Column(db.Integer, default=0)
    date_of_join = db.Column(db.DateTime, default=datetime.datetime.now)

    diagnostic_scores = db.relationship('DiagnosticExamScores', backref='student', lazy=True)
    prognostic_scores = db.relationship('PrognosticExamScores', backref='student', lazy=True)

    def __init__(self, username, password, role, first_name, surname, middle_initial,
                 birthday, birthplace, citizenship, civil_status, age, gender, religion, program, login_count, date_of_join): 
        self.username = username
        self.password = password
        self.role = role
        self.first_name = first_name
        self.surname = surname
        self.middle_initial = middle_initial
        self.birthday = birthday
        self.birthplace = birthplace
        self.citizenship = citizenship
        self.civil_status = civil_status
        self.age = age
        self.gender = gender
        self.religion = religion
        self.program = program
        self.login_count = login_count
        self.date_of_join = date_of_join

class DiagnosticContinuousScores(db.Model):
    __tablename__ = 'diagnostic_continuous_scores'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    score = db.Column(db.Float, nullable=False)
    fundamentals_programming_score = db.Column(db.Float, default=0.0)
    data_structure_algorithm_score = db.Column(db.Float, default=0.0)
    computer_hardware_score = db.Column(db.Float, default=0.0)
    networking_score = db.Column(db.Float, default=0.0)
    
    fundamentals_programming_error = db.Column(db.Integer, default=0)
    data_structure_algorithm_error = db.Column(db.Integer, default=0)
    computer_hardware_error = db.Column(db.Integer, default=0)
    networking_error = db.Column(db.Integer, default=0)
    total_error_count = db.Column(db.Integer, default=0)
    total_correct_count = db.Column(db.Integer, default=0)
    exam_date = db.Column(db.Date, nullable=False)

    def __init__(self, student_id, score, fundamentals_programming_score, data_structure_algorithm_score, computer_hardware_score, networking_score, fundamentals_programming_error, data_structure_algorithm_error, computer_hardware_error, networking_error, total_error_count, total_correct_count, exam_date):  # Add other parameters as needed
        self.student_id = student_id
        self.score = score
        self.fundamentals_programming_score = fundamentals_programming_score
        self.data_structure_algorithm_score = data_structure_algorithm_score
        self.computer_hardware_score = computer_hardware_score
        self.networking_score = networking_score
        self.fundamentals_programming_error = fundamentals_programming_error
        self.data_structure_algorithm_error = data_structure_algorithm_error
        self.computer_hardware_error = computer_hardware_error
        self.networking_error = networking_error
        self.total_error_count = total_error_count
        self.total_correct_count = total_correct_count
        self.exam_date = exam_date

class DiagnosticPersonalizedScores(db.Model):
    __tablename__ = 'diagnostic_personalized_scores'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    score = db.Column(db.Float, nullable=False)
    fundamentals_programming_score = db.Column(db.Float, default=0.0)
    data_structure_algorithm_score = db.Column(db.Float, default=0.0)
    computer_hardware_score = db.Column(db.Float, default=0.0)
    networking_score = db.Column(db.Float, default=0.0)
    
    fundamentals_programming_error = db.Column(db.Integer, default=0)
    data_structure_algorithm_error = db.Column(db.Integer, default=0)
    computer_hardware_error = db.Column(db.Integer, default=0)
    networking_error = db.Column(db.Integer, default=0)
    total_error_count = db.Column(db.Integer, default=0)
    total_correct_count = db.Column(db.Integer, default=0)
    exam_date = db.Column(db.Date, nullable=False)

    def __init__(self, student_id, score, fundamentals_programming_score, data_structure_algorithm_score, computer_hardware_score, networking_score, fundamentals_programming_error, data_structure_algorithm_error, computer_hardware_error, networking_error, total_error_count, total_correct_count, exam_date):  # Add other parameters as needed  # Add other parameters as needed
        self.student_id = student_id
        self.score = score
        self.fundamentals_programming_score = fundamentals_programming_score
        self.data_structure_algorithm_score = data_structure_algorithm_score
        self.computer_hardware_score = computer_hardware_score
        self.networking_score = networking_score
        self.fundamentals_programming_error = fundamentals_programming_error
        self.data_structure_algorithm_error = data_structure_algorithm_error
        self.computer_hardware_error = computer_hardware_error
        self.networking_error = networking_error
        self.total_error_count = total_error_count
        self.total_correct_count = total_correct_count
        self.exam_date = exam_date

class DiagnosticExamScores(db.Model):
    __tablename__ = 'diagnostic_exam_scores'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    score = db.Column(db.Float, nullable=False)  # Overall score
    fundamentals_programming_score = db.Column(db.Float, default=0.0)
    data_structure_algorithm_score = db.Column(db.Float, default=0.0)
    computer_hardware_score = db.Column(db.Float, default=0.0)
    networking_score = db.Column(db.Float, default=0.0)
    
    fundamentals_programming_error = db.Column(db.Integer, default=0)
    data_structure_algorithm_error = db.Column(db.Integer, default=0)
    computer_hardware_error = db.Column(db.Integer, default=0)
    networking_error = db.Column(db.Integer, default=0)
    total_error_count = db.Column(db.Integer, default=0)
    total_correct_count = db.Column(db.Integer, default=0)
    exam_date = db.Column(db.Date, nullable=False)

    def __init__(self, student_id, score, fundamentals_programming_score, data_structure_algorithm_score, computer_hardware_score, networking_score, fundamentals_programming_error, data_structure_algorithm_error, computer_hardware_error, networking_error, total_error_count, total_correct_count, exam_date):
        self.student_id = student_id
        self.score = score
        self.fundamentals_programming_score = fundamentals_programming_score
        self.data_structure_algorithm_score = data_structure_algorithm_score
        self.computer_hardware_score = computer_hardware_score
        self.networking_score = networking_score
        self.fundamentals_programming_error = fundamentals_programming_error
        self.data_structure_algorithm_error = data_structure_algorithm_error
        self.computer_hardware_error = computer_hardware_error
        self.networking_error = networking_error
        self.total_error_count = total_error_count
        self.total_correct_count = total_correct_count
        self.exam_date = exam_date

class PrognosticExamScores(db.Model):
    __tablename__ = 'prognostic_exam_scores'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id')) 
    score = db.Column(db.Float, nullable=False)
    exam_date = db.Column(db.Date, nullable=False)

    def __init__(self, student_id, score, exam_date):
        self.student_id = student_id
        self.score = score
        self.exam_date = exam_date

class ContinuousAssessmentScores(db.Model):
    __tablename__ = 'continuous_assessment_scores'
    id = db.Column(db.Integer, primary_key=True)
    students_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    score = db.Column(db.Float, nullable=False)
    fundamentals_programming_score = db.Column(db.Float, default=0.0)
    data_structure_algorithm_score = db.Column(db.Float, default=0.0)
    computer_hardware_score = db.Column(db.Float, default=0.0)
    networking_score = db.Column(db.Float, default=0.0)
    fundamentals_programming_error = db.Column(db.Integer, default=0)
    data_structure_algorithm_error = db.Column(db.Integer, default=0)
    computer_hardware_error = db.Column(db.Integer, default=0)
    networking_error = db.Column(db.Integer, default=0)
    total_error_count = db.Column(db.Integer, default=0)
    total_correct_count = db.Column(db.Integer, default=0)
    exam_date = db.Column(db.Date, nullable=False)

    def __init__(self, students_id, score, fundamentals_programming_score, data_structure_algorithm_score, computer_hardware_score, networking_score, fundamentals_programming_error, data_structure_algorithm_error, computer_hardware_error,  networking_error, total_error_count, total_correct_count, exam_date):
        self.students_id = students_id
        self.score = score
        self.fundamentals_programming_score = fundamentals_programming_score
        self.data_structure_algorithm_score = data_structure_algorithm_score
        self.computer_hardware_score = computer_hardware_score
        self.networking_score = networking_score
        self.fundamentals_programming_error = fundamentals_programming_error
        self.data_structure_algorithm_error = data_structure_algorithm_error
        self.computer_hardware_error = computer_hardware_error
        self.total_error_count = total_error_count
        self.total_correct_count = total_correct_count
        self.exam_date = exam_date

class PersonalizedLearningPlan(db.Model):
    __tablename__ = 'personalized_learning_plan'
    id = db.Column(db.Integer, primary_key=True)
    students_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    score = db.Column(db.Float, nullable=False)
    fundamentals_programming_score = db.Column(db.Float, default=0.0)
    data_structure_algorithm_score = db.Column(db.Float, default=0.0)
    computer_hardware_score = db.Column(db.Float, default=0.0)
    networking_score = db.Column(db.Float, default=0.0)
    fundamentals_programming_error = db.Column(db.Integer, default=0)
    data_structure_algorithm_error = db.Column(db.Integer, default=0)
    computer_hardware_error = db.Column(db.Integer, default=0)
    networking_error = db.Column(db.Integer, default=0)
    total_error_count = db.Column(db.Integer, default=0)
    total_correct_count = db.Column(db.Integer, default=0)
    exam_date = db.Column(db.Date, nullable=False)

    def __init__(self, students_id, score, fundamentals_programming_score, data_structure_algorithm_score, computer_hardware_score, networking_score, fundamentals_programming_error, data_structure_algorithm_error, computer_hardware_error,  networking_error, total_error_count, total_correct_count, exam_date):
        self.students_id = students_id
        self.score = score
        self.fundamentals_programming_score = fundamentals_programming_score
        self.data_structure_algorithm_score = data_structure_algorithm_score
        self.computer_hardware_score = computer_hardware_score
        self.networking_score = networking_score
        self.fundamentals_programming_error = fundamentals_programming_error
        self.data_structure_algorithm_error = data_structure_algorithm_error
        self.computer_hardware_error = computer_hardware_error
        self.total_error_count = total_error_count
        self.total_correct_count = total_correct_count
        self.exam_date = exam_date

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(100), nullable=False)

    def __init__(self, question, category):
        self.question = question
        self.category = category

with app.app_context():
    try:
        db.create_all()
    except Exception as e:
        print(f"Error occurred: {e}")

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Please provide both username and password"}), 400

        # List of user models to authenticate against
        user_models = {
            "student": Students,
            "admin": Admin
        }

        for role, model in user_models.items():
            user = model.query.filter_by(username=username).first()
            if user and user.password == password:
                user.login_count += 1
                db.session.commit()

                return jsonify({
                    "message": "Login successful",
                    "user_id": user.id,
                    "role": role,
                    "login_count": user.login_count
                }), 200

        return jsonify({"error": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/register_student', methods=['POST'])
def register_student():
    try:
        data = request.get_json()
       
        if not data.get('username') or not data.get('password'):
            return jsonify({"error": "Username and password are required"}), 400

        if Students.query.filter_by(username=data['username']).first() is not None:
            return jsonify({"error": "Username already exists"}), 400

        new_student = Students(
            username=data.get('username'),
            password=data.get('password'),  
            role=data.get('role'),
            first_name=data.get('first_name'),
            surname=data.get('surname'),
            middle_initial=data.get('middle_initial'),
            birthday=data.get('birthday'),  
            birthplace=data.get('birthplace'),
            citizenship=data.get('citizenship'),
            civil_status=data.get('civil_status'),
            age=data.get('age'),
            gender=data.get('gender'),
            religion=data.get('religion'),
            program=data.get('program'),
            login_count=data.get('login_count', 0),  
            date_of_join=datetime.datetime.now()  
        )
 
        db.session.add(new_student)
        db.session.commit()
        
        return jsonify({"message": "Student registered successfully", "student_id": new_student.id}), 201

    except Exception as e:
        
        return jsonify({"error": str(e)}), 500

@app.route('/login_counter', methods=['GET'])
def login_counter():
    try:
        total_logins = db.session.query(func.sum(Admin.login_count) + func.sum(Students.login_count)).scalar()
        total_users = Admin.query.count() + Students.query.count()

        return jsonify({"total_logins": total_logins, "total_users": total_users}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/students_name', methods=['GET'])
def students_name():
    student = Students.query.first()
    if student:
        return jsonify({'firstname': student.first_name, 'lastname': student.surname, 'username': student.username})
    else:
        return jsonify({'message': 'Student name not found'}), 404

@app.route('/count_users', methods=['GET'])
def count_users():
    try:
        admin_count = db.session.query(func.count(Admin.id)).scalar()
        student_count = db.session.query(func.count(Students.id)).scalar()
        return jsonify({"number_of_admins": admin_count, "number_of_students": student_count}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin_name', methods=['GET'])
def admin_name():
    admin = Admin.query.first()
    if admin:
        return jsonify({'firstname': admin.first_name, 'lastname': admin.surname, 'username': admin.username})
    else:
        return jsonify({'message': 'Admin name not found'}), 404

@app.route('/all_admins', methods=['GET'])
def all_admins():
    try:
        all_admins = Admin.query.all()
        admins_data = []

        for admin in all_admins:
            admins_data.append({
                "id": admin.id,
                "first_name": admin.first_name,
                "surname": admin.surname,
                "username": admin.username,
                "role": admin.role,
                "date_of_join": admin.date_of_join.strftime("%Y-%m-%d %H:%M:%S")  # Format datetime for JSON serialization
            })

        return jsonify(admins_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/all_students', methods=['GET'])
def all_students():
    try:
        all_students = Students.query.all()
        students_data = []

        for student in all_students:
            students_data.append({
                "id": student.id,
                "first_name": student.first_name,
                "surname": student.surname,
                "username": student.username,
                "role": student.role,
                "date_of_join": student.date_of_join.strftime("%Y-%m-%d %H:%M:%S")  # Format datetime for JSON serialization
            })

        return jsonify(students_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/students_by_join_month', methods=['GET'])
def students_by_join_month():
    try:
        month = request.args.get('month')
        if not month:
            return jsonify({"error": "Please provide a month"}), 400

        try:
            month = int(month)
        except ValueError:
            return jsonify({"error": "Month must be an integer"}), 400

        if month < 1 or month > 12:
            return jsonify({"error": "Month must be between 1 and 12"}), 400

        students = Students.query.filter(extract('month', Students.date_of_join) == month).all()
        students_data = [{
            "id": student.id,
            "first_name": student.first_name,
            "surname": student.surname,
            "username": student.username,
            "date_of_join": student.date_of_join.strftime("%Y-%m-%d %H:%M:%S")
        } for student in students]

        return jsonify(students_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

json_files = [
    "/Users/iambrian/Documents/reactjs/system/backend/questions/Computer_Hardware.json",
    "/Users/iambrian/Documents/reactjs/system/backend/questions/Data_Structure_Algorithm.json",
    "/Users/iambrian/Documents/reactjs/system/backend/questions/Fundametals_of_Prog.json",
    "/Users/iambrian/Documents/reactjs/system/backend/questions/Networking.json"
]

continuous_module_file = '/Users/iambrian/Documents/reactjs/system/backend/questions/Continuous_Module.json'
personalize_module_file = '/Users/iambrian/Documents/reactjs/system/backend/questions/Personalize_Module.json'


def read_json(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

def get_fixed_questions(json_data, num_questions=5):
    fixed_questions = {}
    for category, data in zip(['Computer_Hardware', 'Data_Structure_Algorithm', 'Fundamentals_of_Programming', 'Networking'], json_data):
        if data and 'questions' in data:
            questions = data['questions']
            fixed_questions[category] = questions[:num_questions]
    
    return fixed_questions

@app.route('/get_questions', methods=['GET'])
def get_questions():
    json_data = [read_json(file) for file in json_files]
    fixed_questions = get_fixed_questions(json_data)
    return jsonify(fixed_questions)

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

@app.route('/get_student_modules', methods=['GET'])
def get_student_modules():
    try:
        # Retrieve the student ID from request args
        student_id = request.args.get('student_id')
        if not student_id:
            return jsonify({"error": "Student ID is required"}), 400

        # Convert student_id to an integer
        student_id = int(student_id)

        # Fetch modules for the student
        modules = fetch_modules_for_student(student_id)
        if modules is None or modules == "Student not found":
            return jsonify({"error": "Modules not found for the given student ID"}), 404
        elif modules == "Unknown program":
            return jsonify({"error": "Unknown program for the given student ID"}), 404

        # Return the modules
        return jsonify({"modules": modules}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def fetch_modules_for_student(student_id):
    student = Students.query.get(student_id)
    if not student:
        return "Student not found"

    student_program = student.program
    student_id = student.id

    if student_id <= 10:
        # Read continuous module file
        modules = read_json_file(continuous_module_file)
        # print(modules)
        return modules

    elif student_id >= 11:
        # Assuming DiagnosticExamScores has the scores for CS students
        latest_scores = DiagnosticPersonalizedScores.query.filter_by(student_id=student_id).order_by(DiagnosticPersonalizedScores.exam_date.desc()).first()
        
        if latest_scores:
            student_scores = {
                'Fundamentals of Programming': latest_scores.fundamentals_programming_score,
                'Data Structures': latest_scores.data_structure_algorithm_score,
                'Networking': latest_scores.networking_score,
                'Computer Hardware': latest_scores.computer_hardware_score
            }

            highest_score_category = max(student_scores, key=student_scores.get)
            # Read personalize module file
            modules = read_json_file(personalize_module_file)
            print(modules)
            recommended_module = modules.get(highest_score_category, {})
            return recommended_module

        return "Scores not found for CS student"

    else:
        return "Unknown program"


@app.route('/submit_exam', methods=['POST'])
def submit_exam():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        student_id = data.get('student_id')
        modules = fetch_modules_for_student(student_id)

        # Do something with the fetched modules, e.g., return them in the response
        answers = data.get('answers')
        if not answers:
            return jsonify({"error": "Answers are missing"}), 400

        score_summary = data.get('score_summary')
        if not score_summary:
            return jsonify({"error": "Score summary is missing"}), 400
        print(score_summary)
        
        return jsonify({"message": "Exam submitted successfully", "modules": modules}), 200




        # Process the answers and save the results
        process_exam_results(student_id, answers)

        return jsonify({"message": "Exam submitted successfully"}), 200
    except Exception as e:
        app.logger.error(f"Error in submit_exam: {e}")
        return jsonify({"error": str(e)}), 500


def process_exam_results(student_id, answers):
    total_score = calculate_total_score(answers)
    total_errors = calculate_total_errors(answers)
    error_frequency = calculate_error_frequency(answers)
    exam_date = get_examination_date()
    print("Total Score:", total_score)
    print("Total Errors:", total_errors)
    print("Error Frequency:", error_frequency)
    print("Exam Date:", exam_date)

    student_program = Students.query.get(student_id).program
    print("Student Program:", student_program)

    save_exam_scores(student_id, total_score, total_errors, error_frequency, exam_date)
    
def calculate_total_score(answers):
    total_score = 0
    # Assuming each correct answer adds 1 to the score
    for answer in answers:
        if answer.get('is_correct') is True:  # Explicit check for True
            total_score += 1
    return total_score

def calculate_total_errors(answers):
    total_errors = 0
    for answer in answers:
        if not answer.get('is_correct'):
            total_errors += 1
    return total_errors

def calculate_error_frequency(answers):
    # Assuming error_frequency structure: {category_name: error_count}
    error_frequency = {}
    for answer in answers:
        if not answer.get('is_correct'):
            category = answer.get('category')
            error_frequency[category] = error_frequency.get(category, 0) + 1
    return error_frequency

def get_examination_date():
    return datetime.date.today()

def save_exam_scores(student_id, total_score, total_errors,categories_score, exam_date):
    try:
        new_exam_score = DiagnosticExamScores(
        student_id=student_id,
        score=total_score,
        total_error_count=total_errors,
        total_correct_count=total_score,
        exam_date=exam_date,
        # Initialize the fields for each category score and error
        fundamentals_programming_score=categories_score.get('Fundamentals_of_Programming', {}).get('correct'),
        data_structure_algorithm_score=categories_score.get('Data_Structure_Algorithm', {}).get('correct'),
        computer_hardware_score=categories_score.get('Computer_Hardware', {}).get('correct'),
        networking_score=categories_score.get('Networking', {}).get('correct'),
        fundamentals_programming_error=categories_score.get('Fundamentals_of_Programming', {}).get('incorrect'),
        data_structure_algorithm_error=categories_score.get('Data_Structure_Algorithm', {}).get('incorrect'),
        computer_hardware_error=categories_score.get('Computer_Hardware', {}).get('incorrect'),
        networking_error=categories_score.get('Networking', {}).get('incorrect'),
    )

        db.session.add(new_exam_score)
        db.session.commit()
    except Exception as e:
        app.logger.error(f"Error in save_exam_scores: {e}")
        raise

@app.route('/get_error_counts', methods=['GET'])
def get_error_counts():
    try:
        student_id = request.args.get('student_id')
        if not student_id:
            return jsonify({"error": "Student ID is required"}), 400
        
        student_id = int(student_id)  
        exam_scores = DiagnosticExamScores.query.filter_by(student_id=student_id).all()

        if not exam_scores:
            return jsonify({"error": "No exam scores found for the given student ID"}), 404

        error_counts = {
            "fundamentals_programming_error": sum([exam.fundamentals_programming_error for exam in exam_scores]),
            "data_structure_algorithm_error": sum([exam.data_structure_algorithm_error for exam in exam_scores]),
            "computer_hardware_error": sum([exam.computer_hardware_error for exam in exam_scores]),
            "networking_error": sum([exam.networking_error for exam in exam_scores])
        }

        return jsonify(error_counts), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_correct_answers', methods=['GET'])
def total_correct_answers():
    try:
        total_correct = db.session.query(func.sum(DiagnosticExamScores.total_correct_count)).scalar()
        return jsonify({"total_correct_answers": total_correct if total_correct is not None else 0}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_error_count', methods=['GET'])
def total_error_count():
    try:
        total_errors = db.session.query(func.sum(DiagnosticExamScores.total_error_count)).scalar()
        return jsonify({"total_error_count": total_errors if total_errors is not None else 0}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_student_scores', methods=['GET'])
def total_student_scores():
    try:
        # Fetching total scores for each student
        scores = db.session.query(
            DiagnosticContinuousScores.student_id, 
            func.sum(DiagnosticContinuousScores.score).label('total_score')
        ).group_by(DiagnosticContinuousScores.student_id).all()

        # Formatting the results
        result = [
            {"student_id": student_id, "total_score": total_score}
            for student_id, total_score in scores
        ]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/fetch_total_error_count_per_student', methods=['GET'])
def fetch_total_error_count_per_student():
    try:
        # Fetching total error counts for each student
        error_counts = db.session.query(
            DiagnosticExamScores.student_id, 
            func.sum(DiagnosticExamScores.total_error_count).label('total_error_count')
        ).group_by(DiagnosticExamScores.student_id).all()

        # Formatting the results
        result = [
            {"student_id": student_id, "total_error_count": total_error_count}
            for student_id, total_error_count in error_counts
        ]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/query_student_id', methods=['GET'])
def query_student_id():
    try:
        first_name = request.args.get('first_name')
        surname = request.args.get('surname')
        program = request.args.get('program')

        query = db.session.query(Students.id)
        if first_name:
            query = query.filter(Students.first_name.ilike(f"%{first_name}%"))
        if surname:
            query = query.filter(Students.surname.ilike(f"%{surname}%"))
        if program:
            query = query.filter(Students.program.ilike(f"%{program}%"))

        student_ids = query.all()

        student_ids_list = [student_id[0] for student_id in student_ids]
        return jsonify({"student_ids": student_ids_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/error_frequency_per_category_per_student', methods=['GET'])
def error_frequency_per_category_per_student():
    try:
        # Querying errors for each category, grouped by student ID
        students_errors = db.session.query(
            DiagnosticContinuousScores.student_id,
            func.sum(DiagnosticContinuousScores.fundamentals_programming_error).label('fundamentals_programming_error'),
            func.sum(DiagnosticContinuousScores.data_structure_algorithm_error).label('data_structure_algorithm_error'),
            func.sum(DiagnosticContinuousScores.computer_hardware_error).label('computer_hardware_error'),
            func.sum(DiagnosticContinuousScores.networking_error).label('networking_error')
        ).group_by(DiagnosticContinuousScores.student_id).all()

        result = []
        for student_error in students_errors:
            total_errors = (student_error.fundamentals_programming_error or 0) + \
                           (student_error.data_structure_algorithm_error or 0) + \
                           (student_error.computer_hardware_error or 0) + \
                           (student_error.networking_error or 0)

            num_exams = db.session.query(func.count(DiagnosticContinuousScores.student_id))\
                .filter(DiagnosticContinuousScores.student_id == student_error.student_id).scalar()
            num_exams = num_exams if num_exams > 0 else 1

            result.append({
                "student_id": student_error.student_id,
                "fundamentals_programming_error": (student_error.fundamentals_programming_error or 0) / num_exams,
                "data_structure_algorithm_error": (student_error.data_structure_algorithm_error or 0) / num_exams,
                "computer_hardware_error": (student_error.computer_hardware_error or 0) / num_exams,
                "networking_error": (student_error.networking_error or 0) / num_exams,
                "total_errors": total_errors / num_exams
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/category_scores_per_student', methods=['GET'])
def category_scores_per_student():
    try:
        # Querying and summing scores for each category, grouped by student ID
        category_scores = db.session.query(
            DiagnosticContinuousScores.student_id,
            func.sum(DiagnosticContinuousScores.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(DiagnosticContinuousScores.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(DiagnosticContinuousScores.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(DiagnosticContinuousScores.networking_score).label('total_networking_score')
        ).group_by(DiagnosticContinuousScores.student_id).all()

        # Formatting the results
        result = []
        for score in category_scores:
            result.append({
                "student_id": score.student_id,
                "total_fundamentals_programming_score": score.total_fundamentals_programming_score or 0,
                "total_data_structure_algorithm_score": score.total_data_structure_algorithm_score or 0,
                "total_computer_hardware_score": score.total_computer_hardware_score or 0,
                "total_networking_score": score.total_networking_score or 0
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/category_scores_continuous_assessment', methods=['GET'])
def category_scores_continuous_assessment():
    try:
        # Querying and summing scores for each category, grouped by student ID
        category_scores = db.session.query(
            ContinuousAssessmentScores.students_id,
            func.sum(ContinuousAssessmentScores.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(ContinuousAssessmentScores.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(ContinuousAssessmentScores.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(ContinuousAssessmentScores.networking_score).label('total_networking_score')
        ).group_by(ContinuousAssessmentScores.students_id).all()

        # Formatting the results
        result = [
            {
                "student_id": score.students_id,
                "total_fundamentals_programming_score": score.total_fundamentals_programming_score or 0,
                "total_data_structure_algorithm_score": score.total_data_structure_algorithm_score or 0,
                "total_computer_hardware_score": score.total_computer_hardware_score or 0,
                "total_networking_score": score.total_networking_score or 0
            } for score in category_scores
        ]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_scores_by_category_per_student', methods=['GET'])
def total_scores_by_category_per_student():
    try:
        # Querying and summing scores for each category from 'diagnostic_continuous_scores' table, grouped by student ID
        diagnostic_scores = db.session.query(
            DiagnosticContinuousScores.student_id,
            func.sum(DiagnosticContinuousScores.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(DiagnosticContinuousScores.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(DiagnosticContinuousScores.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(DiagnosticContinuousScores.networking_score).label('total_networking_score')
        ).group_by(DiagnosticContinuousScores.student_id).subquery()

        # Querying and summing scores for each category from 'continuous_assessment_scores' table, grouped by student ID
        continuous_assessment_scores = db.session.query(
            ContinuousAssessmentScores.students_id,
            func.sum(ContinuousAssessmentScores.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(ContinuousAssessmentScores.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(ContinuousAssessmentScores.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(ContinuousAssessmentScores.networking_score).label('total_networking_score')
        ).group_by(ContinuousAssessmentScores.students_id).subquery()

        # Joining both subqueries on student_id and summing the scores from both tables
        total_scores = db.session.query(
            diagnostic_scores.c.student_id,
            (diagnostic_scores.c.total_fundamentals_programming_score + continuous_assessment_scores.c.total_fundamentals_programming_score).label('final_fundamentals_programming_score'),
            (diagnostic_scores.c.total_data_structure_algorithm_score + continuous_assessment_scores.c.total_data_structure_algorithm_score).label('final_data_structure_algorithm_score'),
            (diagnostic_scores.c.total_computer_hardware_score + continuous_assessment_scores.c.total_computer_hardware_score).label('final_computer_hardware_score'),
            (diagnostic_scores.c.total_networking_score + continuous_assessment_scores.c.total_networking_score).label('final_networking_score')
        ).join(continuous_assessment_scores, diagnostic_scores.c.student_id == continuous_assessment_scores.c.students_id).all()

        # Formatting the results
        result = [{"student_id": score.student_id,
                   "final_fundamentals_programming_score": score.final_fundamentals_programming_score,
                   "final_data_structure_algorithm_score": score.final_data_structure_algorithm_score,
                   "final_computer_hardware_score": score.final_computer_hardware_score,
                   "final_networking_score": score.final_networking_score}
                  for score in total_scores]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_personalized_scores', methods=['GET'])
def total_personalized_scores():
    try:
        # Querying and summing scores for each student in the PersonalizedLearningPlan table
        scores = db.session.query(
            PersonalizedLearningPlan.students_id.label('student_id'), 
            func.sum(PersonalizedLearningPlan.score).label('total_score')
        ).group_by(PersonalizedLearningPlan.students_id).all()

        # Formatting the results
        result = [
            {"student_id": student_id, "total_score": float(total_score)}  # Ensure total_score is a float
            for student_id, total_score in scores
        ]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/error_frequency_per_student', methods=['GET'])
def error_frequency_per_student():
    try:
        # Querying errors for each category, grouped by student ID
        error_frequency = db.session.query(
            DiagnosticPersonalizedScores.student_id,
            func.sum(DiagnosticPersonalizedScores.fundamentals_programming_error).label('fundamentals_programming_error'),
            func.sum(DiagnosticPersonalizedScores.data_structure_algorithm_error).label('data_structure_algorithm_error'),
            func.sum(DiagnosticPersonalizedScores.computer_hardware_error).label('computer_hardware_error'),
            func.sum(DiagnosticPersonalizedScores.networking_error).label('networking_error')
        ).group_by(DiagnosticPersonalizedScores.student_id).all()

        # Formatting the results
        result = []
        for student_errors in error_frequency:
            result.append({
                "student_id": student_errors.student_id,
                "fundamentals_programming_error": student_errors.fundamentals_programming_error or 0,
                "data_structure_algorithm_error": student_errors.data_structure_algorithm_error or 0,
                "computer_hardware_error": student_errors.computer_hardware_error or 0,
                "networking_error": student_errors.networking_error or 0
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_personalized_category_scores', methods=['GET'])
def total_personalized_category_scores():
    try:
        # Querying and summing scores for each category, grouped by student ID
        scores = db.session.query(
            DiagnosticPersonalizedScores.student_id,
            func.sum(DiagnosticPersonalizedScores.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(DiagnosticPersonalizedScores.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(DiagnosticPersonalizedScores.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(DiagnosticPersonalizedScores.networking_score).label('total_networking_score')
        ).group_by(DiagnosticPersonalizedScores.student_id).all()

        # Formatting the results
        result = [{
            "student_id": score.student_id,
            "total_fundamentals_programming_score": score.total_fundamentals_programming_score,
            "total_data_structure_algorithm_score": score.total_data_structure_algorithm_score,
            "total_computer_hardware_score": score.total_computer_hardware_score,
            "total_networking_score": score.total_networking_score
        } for score in scores]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/fetch_total_scores_per_category_per_student', methods=['GET'])
def fetch_total_scores_per_category_per_student():
    try:
        # Querying and summing scores for each category, grouped by student ID
        category_scores = db.session.query(
            ContinuousAssessmentScores.students_id,
            func.sum(ContinuousAssessmentScores.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(ContinuousAssessmentScores.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(ContinuousAssessmentScores.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(ContinuousAssessmentScores.networking_score).label('total_networking_score')
        ).group_by(ContinuousAssessmentScores.students_id).all()

        # Formatting the results
        result = [{
            "student_id": score.students_id,
            "total_fundamentals_programming_score": score.total_fundamentals_programming_score,
            "total_data_structure_algorithm_score": score.total_data_structure_algorithm_score,
            "total_computer_hardware_score": score.total_computer_hardware_score,
            "total_networking_score": score.total_networking_score
        } for score in category_scores]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/continuous_frequency_of_error', methods=['GET'])
def continuous_frequency_of_error():
    try:
        # Querying errors for each category, grouped by student ID
        students_errors = db.session.query(
            ContinuousAssessmentScores.students_id,
            func.sum(ContinuousAssessmentScores.fundamentals_programming_error).label('fundamentals_programming_error'),
            func.sum(ContinuousAssessmentScores.data_structure_algorithm_error).label('data_structure_algorithm_error'),
            func.sum(ContinuousAssessmentScores.computer_hardware_error).label('computer_hardware_error'),
            func.sum(ContinuousAssessmentScores.networking_error).label('networking_error')
        ).group_by(ContinuousAssessmentScores.students_id).all()

        result = []
        for student_error in students_errors:
            total_exams = db.session.query(func.count(ContinuousAssessmentScores.students_id))\
                .filter(ContinuousAssessmentScores.students_id == student_error.students_id).scalar()
            total_exams = total_exams if total_exams > 0 else 1  # Avoid division by zero

            total_errors = sum([
                student_error.fundamentals_programming_error or 0,
                student_error.data_structure_algorithm_error or 0,
                student_error.computer_hardware_error or 0,
                student_error.networking_error or 0
            ])

            result.append({
                "student_id": student_error.students_id,
                "fundamentals_programming_error": (student_error.fundamentals_programming_error or 0) / total_exams,
                "data_structure_algorithm_error": (student_error.data_structure_algorithm_error or 0) / total_exams,
                "computer_hardware_error": (student_error.computer_hardware_error or 0) / total_exams,
                "networking_error": (student_error.networking_error or 0) / total_exams,
                "total_errors": total_errors  # Add this line
            })

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_diagnostic_scores', methods=['GET'])
def total_diagnostic_scores():
    try:
        # Querying and summing scores for each student
        scores = db.session.query(
            DiagnosticExamScores.student_id, 
            func.sum(DiagnosticExamScores.score).label('total_score')
        ).group_by(DiagnosticExamScores.student_id).all()

        # Formatting the results
        result = [
            {"student_id": student_id, "total_score": total_score}
            for student_id, total_score in scores
        ]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/total_personalized_plan_scores', methods=['GET'])
def total_personalized_plan_scores():
    try:
        # Querying and summing scores for each category, grouped by student ID
        scores = db.session.query(
            PersonalizedLearningPlan.students_id.label('student_id'),
            func.sum(PersonalizedLearningPlan.fundamentals_programming_score).label('total_fundamentals_programming_score'),
            func.sum(PersonalizedLearningPlan.data_structure_algorithm_score).label('total_data_structure_algorithm_score'),
            func.sum(PersonalizedLearningPlan.computer_hardware_score).label('total_computer_hardware_score'),
            func.sum(PersonalizedLearningPlan.networking_score).label('total_networking_score')
        ).group_by(PersonalizedLearningPlan.students_id).all()

        # Formatting the results
        result = [{
            "student_id": score.student_id,
            "total_fundamentals_programming_score": score.total_fundamentals_programming_score or 0,
            "total_data_structure_algorithm_score": score.total_data_structure_algorithm_score or 0,
            "total_computer_hardware_score": score.total_computer_hardware_score or 0,
            "total_networking_score": score.total_networking_score or 0
        } for score in scores]

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/upload_questions', methods=['POST'])
def upload_questions():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Determine file type and process accordingly
        if filename.endswith('.json'):
            questions = read_json(file_path)
        elif filename.endswith('.csv'):
            questions = read_csv(file_path)
        else:
            return jsonify({"error": "Unsupported file format"}), 400

        if questions:
            save_questions_to_database(questions)
            return jsonify({"message": "Questions uploaded successfully"}), 200
        else:
            return jsonify({"error": "Failed to read questions from the file"}), 400

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def read_csv(file_path):
    try:
        questions = []
        with open(file_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Assuming the CSV has 'question' and 'category' columns
                questions.append({'question': row['question'], 'category': row['category']})
        return questions
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return None

def save_questions_to_database(questions):
    try:
        for question in questions:
            new_question = Question(question=question['question'], category=question['category'])
            db.session.add(new_question)
        db.session.commit()
    except Exception as e:
        print(f"Error saving questions to database: {e}")
        db.session.rollback()


if __name__ == '__main__':

    app.run(debug=True)