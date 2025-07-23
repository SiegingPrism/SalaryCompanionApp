from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from datetime import datetime, date
import json
from utils.tax_calculator import IndianTaxCalculator
from utils.currency_formatter import CurrencyFormatter
from utils.payslip_generator import PayslipGenerator

app = Flask(__name__)
CORS(app)

# In-memory storage (in production, use a database)
salary_entries = []
goals = []
benefits = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    current_salary = 1200000
    monthly_take_home = 85000
    annual_take_home = monthly_take_home * 12
    
    dashboard_data = {
        'current_salary': current_salary,
        'monthly_take_home': monthly_take_home,
        'annual_take_home': annual_take_home,
        'tax_saved': 150000,
        'performance_bonus': 50000,
        'recent_payslips': [
            {
                'period': 'December 2024',
                'gross': 100000,
                'net': 85000,
                'bonus': 10000
            },
            {
                'period': 'November 2024',
                'gross': 100000,
                'net': 85000,
                'bonus': 0
            },
            {
                'period': 'October 2024',
                'gross': 100000,
                'net': 85000,
                'bonus': 5000
            }
        ],
        'benefits': [
            {'name': 'EPF Contribution', 'value': 1800, 'type': 'deduction'},
            {'name': 'Health Insurance', 'value': 5000, 'type': 'benefit'},
            {'name': 'Meal Allowance', 'value': 2000, 'type': 'benefit'},
            {'name': 'Professional Tax', 'value': 200, 'type': 'deduction'}
        ]
    }
    
    return jsonify(dashboard_data)

@app.route('/api/salary-entries', methods=['GET', 'POST'])
def handle_salary_entries():
    if request.method == 'GET':
        return jsonify(salary_entries)
    
    elif request.method == 'POST':
        data = request.json
        entry = {
            'id': str(len(salary_entries) + 1),
            'base_salary': float(data.get('baseSalary', 0)),
            'hra': float(data.get('hra', 0)),
            'allowances': float(data.get('allowances', 0)),
            'bonuses': float(data.get('bonuses', 0)),
            'overtime': float(data.get('overtime', 0)),
            'benefits': float(data.get('benefits', 0)),
            'period': data.get('period', 'monthly'),
            'date': data.get('date', str(date.today())),
            'currency': data.get('currency', 'INR')
        }
        salary_entries.append(entry)
        return jsonify(entry), 201

@app.route('/api/tax-calculation', methods=['POST'])
def calculate_tax():
    data = request.json
    
    calculator = IndianTaxCalculator()
    result = calculator.calculate_tax(
        annual_salary=float(data.get('grossPay', 0)),
        age=int(data.get('age', 30)),
        has_hra=data.get('hasHRA', True),
        hra_amount=float(data.get('hraAmount', 0)),
        city_type=data.get('cityType', 'metro'),
        tax_regime=data.get('taxRegime', 'new')
    )
    
    return jsonify(result)

@app.route('/api/goals', methods=['GET', 'POST'])
def handle_goals():
    if request.method == 'GET':
        return jsonify(goals)
    
    elif request.method == 'POST':
        data = request.json
        goal = {
            'id': str(len(goals) + 1),
            'title': data.get('title'),
            'target_amount': float(data.get('targetAmount', 0)),
            'current_amount': float(data.get('currentAmount', 0)),
            'deadline': data.get('deadline'),
            'status': 'in-progress',
            'currency': data.get('currency', 'INR')
        }
        goals.append(goal)
        return jsonify(goal), 201

@app.route('/api/payslip/<month>')
def generate_payslip(month):
    generator = PayslipGenerator()
    payslip_data = generator.generate_payslip(month)
    return jsonify(payslip_data)

if __name__ == '__main__':
    # Initialize with sample data
    salary_entries.extend([
        {
            'id': '1',
            'base_salary': 50000,
            'hra': 20000,
            'allowances': 15000,
            'bonuses': 10000,
            'overtime': 0,
            'benefits': 5000,
            'period': 'monthly',
            'date': '2024-12-01',
            'currency': 'INR'
        },
        {
            'id': '2',
            'base_salary': 50000,
            'hra': 20000,
            'allowances': 15000,
            'bonuses': 0,
            'overtime': 5000,
            'benefits': 5000,
            'period': 'monthly',
            'date': '2024-11-01',
            'currency': 'INR'
        }
    ])
    
    goals.extend([
        {
            'id': '1',
            'title': 'Reach ₹15 LPA Salary',
            'target_amount': 1500000,
            'current_amount': 1200000,
            'deadline': '2025-06-01',
            'status': 'in-progress',
            'currency': 'INR'
        },
        {
            'id': '2',
            'title': 'Emergency Fund',
            'target_amount': 500000,
            'current_amount': 350000,
            'deadline': '2025-12-31',
            'status': 'in-progress',
            'currency': 'INR'
        }
    ])
    
    app.run(debug=True, port=5000)