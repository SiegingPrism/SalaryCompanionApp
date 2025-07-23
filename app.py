import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, date
import locale
from utils.tax_calculator import IndianTaxCalculator
from utils.currency_formatter import format_indian_currency
from utils.payslip_generator import generate_payslip_data

# Set page config
st.set_page_config(
    page_title="SalaryCompanion - Employee Salary Management",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        border-radius: 10px;
        color: white;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid #667eea;
    }
    .success-card {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
    }
    .warning-card {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'salary_data' not in st.session_state:
    st.session_state.salary_data = []
if 'goals_data' not in st.session_state:
    st.session_state.goals_data = []

def main():
    # Header
    st.markdown("""
    <div class="main-header">
        <h1>💰 SalaryCompanion</h1>
        <p>Your Complete Employee Salary Management Solution</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar navigation
    st.sidebar.title("Navigation")
    page = st.sidebar.selectbox(
        "Choose a section:",
        ["Dashboard", "Salary Tracker", "Tax Calculator", "Payslip Generator", "Goals", "Benefits", "Budget", "Reports"]
    )
    
    # User info in sidebar
    st.sidebar.markdown("---")
    st.sidebar.markdown("### 👤 User Profile")
    st.sidebar.markdown("**Name:** Ishan")
    st.sidebar.markdown("**Employee ID:** EMP001")
    st.sidebar.markdown("**Department:** Technology")
    
    # Main content based on selected page
    if page == "Dashboard":
        show_dashboard()
    elif page == "Salary Tracker":
        show_salary_tracker()
    elif page == "Tax Calculator":
        show_tax_calculator()
    elif page == "Payslip Generator":
        show_payslip_generator()
    elif page == "Goals":
        show_goals()
    elif page == "Benefits":
        show_benefits()
    elif page == "Budget":
        show_budget()
    elif page == "Reports":
        show_reports()

def show_dashboard():
    st.header("📊 Dashboard")
    
    # Welcome section
    col1, col2 = st.columns([2, 1])
    with col1:
        st.markdown("""
        <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); 
                    padding: 2rem; border-radius: 10px; color: white; margin-bottom: 2rem;">
            <h2>Welcome back, Ishan! 👋</h2>
            <p>Here's your salary overview for December 2024</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="background: rgba(255,255,255,0.1); padding: 1rem; 
                    border-radius: 10px; text-align: center; color: #667eea;">
            <h4>Current CTC</h4>
            <h2>₹12,00,000</h2>
        </div>
        """, unsafe_allow_html=True)
    
    # Metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="Annual CTC",
            value="₹12,00,000",
            delta="8% from last year"
        )
    
    with col2:
        st.metric(
            label="Monthly Take-Home",
            value="₹85,000",
            delta="After tax & deductions"
        )
    
    with col3:
        st.metric(
            label="Tax Saved",
            value="₹1,50,000",
            delta="Under 80C & other sections"
        )
    
    with col4:
        st.metric(
            label="Performance Bonus",
            value="₹50,000",
            delta="Q4 2024 achievement"
        )
    
    # Charts section
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Salary Trend")
        months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        salaries = [95000, 95000, 100000, 95000, 110000]
        
        fig = px.line(x=months, y=salaries, title="Monthly Salary Trend")
        fig.update_traces(line_color='#667eea', line_width=3)
        fig.update_layout(height=300)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("💰 Salary Breakdown")
        labels = ['Basic Salary', 'HRA', 'Allowances', 'Bonus']
        values = [50000, 20000, 15000, 10000]
        
        fig = px.pie(values=values, names=labels, title="Current Month Breakdown")
        fig.update_layout(height=300)
        st.plotly_chart(fig, use_container_width=True)
    
    # Recent activity
    st.subheader("📋 Recent Payslips")
    payslip_data = {
        'Period': ['December 2024', 'November 2024', 'October 2024'],
        'Gross': ['₹1,00,000', '₹1,00,000', '₹1,00,000'],
        'Net': ['₹85,000', '₹85,000', '₹85,000'],
        'Bonus': ['₹10,000', '₹0', '₹5,000']
    }
    st.dataframe(pd.DataFrame(payslip_data), use_container_width=True)

def show_salary_tracker():
    st.header("💼 Salary Tracker")
    
    # Add new salary entry
    with st.expander("➕ Add New Salary Entry"):
        col1, col2, col3 = st.columns(3)
        
        with col1:
            basic_salary = st.number_input("Basic Salary (₹)", min_value=0, value=50000)
            hra = st.number_input("HRA (₹)", min_value=0, value=20000)
            allowances = st.number_input("Other Allowances (₹)", min_value=0, value=15000)
        
        with col2:
            bonuses = st.number_input("Bonuses (₹)", min_value=0, value=0)
            overtime = st.number_input("Overtime (₹)", min_value=0, value=0)
            benefits = st.number_input("Benefits Value (₹)", min_value=0, value=5000)
        
        with col3:
            period = st.selectbox("Period", ["Monthly", "Yearly"])
            entry_date = st.date_input("Date", value=date.today())
            currency = st.selectbox("Currency", ["INR", "USD"])
        
        if st.button("💾 Save Entry"):
            new_entry = {
                'Date': entry_date,
                'Basic Salary': basic_salary,
                'HRA': hra,
                'Allowances': allowances,
                'Bonuses': bonuses,
                'Overtime': overtime,
                'Benefits': benefits,
                'Gross Total': basic_salary + hra + allowances + bonuses + overtime + benefits,
                'Period': period,
                'Currency': currency
            }
            st.session_state.salary_data.append(new_entry)
            st.success("✅ Salary entry saved successfully!")
    
    # Summary cards
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("""
        <div style="background: linear-gradient(90deg, #3b82f6, #1d4ed8); 
                    color: white; padding: 1rem; border-radius: 10px; text-align: center;">
            <h4>Average Monthly</h4>
            <h2>₹95,000</h2>
            <small>+5% from last quarter</small>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style="background: linear-gradient(90deg, #10b981, #059669); 
                    color: white; padding: 1rem; border-radius: 10px; text-align: center;">
            <h4>Highest Month</h4>
            <h2>₹1,10,000</h2>
            <small>December 2024</small>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div style="background: linear-gradient(90deg, #8b5cf6, #7c3aed); 
                    color: white; padding: 1rem; border-radius: 10px; text-align: center;">
            <h4>Total Bonuses</h4>
            <h2>₹50,000</h2>
            <small>This year</small>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        st.markdown("""
        <div style="background: linear-gradient(90deg, #f59e0b, #d97706); 
                    color: white; padding: 1rem; border-radius: 10px; text-align: center;">
            <h4>Annual Growth</h4>
            <h2>12%</h2>
            <small>Year over year</small>
        </div>
        """, unsafe_allow_html=True)
    
    # Salary history table
    st.subheader("📊 Salary History")
    
    if st.session_state.salary_data:
        df = pd.DataFrame(st.session_state.salary_data)
        st.dataframe(df, use_container_width=True)
    else:
        # Sample data
        sample_data = {
            'Date': ['2024-12-01', '2024-11-01', '2024-10-01'],
            'Basic Salary': [50000, 50000, 50000],
            'HRA': [20000, 20000, 20000],
            'Allowances': [15000, 15000, 15000],
            'Bonuses': [10000, 0, 5000],
            'Overtime': [0, 5000, 0],
            'Benefits': [5000, 5000, 5000],
            'Gross Total': [100000, 95000, 95000]
        }
        st.dataframe(pd.DataFrame(sample_data), use_container_width=True)

def show_tax_calculator():
    st.header("🧮 Indian Tax Calculator")
    st.markdown("**Financial Year 2024-25**")
    
    # Tax regime selection
    st.subheader("Select Tax Regime")
    col1, col2 = st.columns(2)
    
    with col1:
        new_regime = st.checkbox("New Tax Regime", value=True)
        if new_regime:
            st.info("✅ Lower tax rates, limited deductions")
    
    with col2:
        old_regime = st.checkbox("Old Tax Regime", value=False)
        if old_regime:
            st.info("📊 Higher rates, more deductions available")
    
    # Input form
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("💰 Salary & Personal Details")
        annual_salary = st.number_input("Annual Gross Salary (₹)", min_value=0, value=1200000)
        age = st.number_input("Age", min_value=18, max_value=100, value=30)
        city_type = st.selectbox("City Type", ["Metro City", "Non-Metro City"])
        has_hra = st.checkbox("I receive HRA", value=True)
        
        if has_hra:
            hra_amount = st.number_input("Monthly HRA Amount (₹)", min_value=0, value=20000)
        else:
            hra_amount = 0
    
    with col2:
        st.subheader("📊 Tax Calculation Results")
        
        # Calculate tax
        calculator = IndianTaxCalculator()
        tax_result = calculator.calculate_tax(
            annual_salary, age, has_hra, hra_amount, 
            city_type.lower().replace(" ", "-")
        )
        
        # Display results
        st.metric("Annual Gross Salary", f"₹{annual_salary:,}")
        st.metric("Income Tax", f"₹{tax_result['income_tax']:,}", delta=f"-{tax_result['tax_percentage']:.1f}%")
        st.metric("EPF Contribution", f"₹{tax_result['epf']:,}")
        st.metric("ESI Contribution", f"₹{tax_result['esi']:,}")
        st.metric("Professional Tax", f"₹{tax_result['professional_tax']:,}")
        
        st.markdown("---")
        st.metric("**Annual Take-Home**", f"₹{tax_result['net_salary']:,}", delta="After all deductions")
        st.metric("**Monthly Take-Home**", f"₹{tax_result['monthly_net']:,}")
    
    # Tax breakdown chart
    st.subheader("📈 Tax Breakdown Visualization")
    
    labels = ['Take-Home', 'Income Tax', 'EPF', 'ESI', 'Professional Tax']
    values = [
        tax_result['net_salary'],
        tax_result['income_tax'],
        tax_result['epf'],
        tax_result['esi'],
        tax_result['professional_tax']
    ]
    
    fig = px.pie(values=values, names=labels, title="Salary Distribution")
    st.plotly_chart(fig, use_container_width=True)
    
    # Tax saving tips
    st.subheader("💡 Tax Saving Opportunities")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class="success-card">
            <h4>Section 80C</h4>
            <p>Save up to ₹46,800 by investing ₹1.5L in EPF, ELSS, PPF, etc.</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="success-card">
            <h4>Section 80D</h4>
            <p>Health insurance premium deduction up to ₹25,000</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="success-card">
            <h4>HRA Exemption</h4>
            <p>Optimize your HRA to reduce taxable income</p>
        </div>
        """, unsafe_allow_html=True)

def show_payslip_generator():
    st.header("📄 Payslip Generator")
    
    # Month selection
    col1, col2 = st.columns([3, 1])
    with col1:
        selected_month = st.selectbox(
            "Select Month",
            ["December 2024", "November 2024", "October 2024", "September 2024"]
        )
    with col2:
        if st.button("📥 Download PDF"):
            st.success("PDF download functionality would be implemented here!")
    
    # Generate payslip data
    payslip_data = generate_payslip_data(selected_month)
    
    # Company header
    st.markdown("""
    <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); 
                color: white; padding: 2rem; border-radius: 10px; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between;">
            <div>
                <h2>TechCorp Solutions Pvt Ltd</h2>
                <p>Sector 62, Noida, UP - 201301</p>
            </div>
            <div style="text-align: right;">
                <p>Salary Slip</p>
                <h3>{}</h3>
            </div>
        </div>
    </div>
    """.format(selected_month), unsafe_allow_html=True)
    
    # Employee details
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("👤 Employee Details")
        st.write("**Name:** Ishan")
        st.write("**Employee ID:** EMP001")
        st.write("**Designation:** Senior Software Engineer")
        st.write("**Department:** Technology")
        st.write("**PAN Number:** ABCDE1234F")
    
    with col2:
        st.subheader("📅 Pay Period Details")
        st.write(f"**Pay Period:** {selected_month}")
        st.write("**Working Days:** 22")
        st.write("**Paid Days:** 22")
        st.write("**LOP Days:** 0")
        st.write("**UAN Number:** 123456789012")
    
    # Salary breakdown
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("💰 Earnings")
        earnings_data = {
            'Component': ['Basic Salary', 'HRA', 'Conveyance Allowance', 'Medical Allowance', 
                         'Special Allowance', 'Performance Bonus'],
            'Amount (₹)': [50000, 20000, 1600, 1250, 15000, 10000]
        }
        earnings_df = pd.DataFrame(earnings_data)
        st.dataframe(earnings_df, use_container_width=True)
        
        total_earnings = earnings_df['Amount (₹)'].sum()
        st.metric("**Total Earnings**", f"₹{total_earnings:,}")
    
    with col2:
        st.subheader("📉 Deductions")
        deductions_data = {
            'Component': ['EPF (Employee)', 'ESI', 'Professional Tax', 'Income Tax (TDS)'],
            'Amount (₹)': [6000, 734, 200, 8500]
        }
        deductions_df = pd.DataFrame(deductions_data)
        st.dataframe(deductions_df, use_container_width=True)
        
        total_deductions = deductions_df['Amount (₹)'].sum()
        st.metric("**Total Deductions**", f"₹{total_deductions:,}")
        
        st.subheader("🏢 Employer Contributions")
        st.write("**EPF (Employer):** ₹6,000")
    
    # Net salary
    net_salary = total_earnings - total_deductions
    st.markdown(f"""
    <div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); 
                color: white; padding: 2rem; border-radius: 10px; margin: 2rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
                <p>Net Salary</p>
                <h1>₹{net_salary:,}</h1>
            </div>
            <div style="text-align: right;">
                <p>In Words</p>
                <p>Eighty Two Thousand Four Hundred Sixteen Rupees Only</p>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)

def show_goals():
    st.header("🎯 Financial & Career Goals")
    
    # Add new goal
    with st.expander("➕ Add New Goal"):
        col1, col2 = st.columns(2)
        
        with col1:
            goal_title = st.text_input("Goal Title")
            target_amount = st.number_input("Target Amount (₹)", min_value=0)
            current_amount = st.number_input("Current Amount (₹)", min_value=0)
        
        with col2:
            deadline = st.date_input("Target Date")
            currency = st.selectbox("Currency", ["INR", "USD"])
            goal_type = st.selectbox("Goal Type", ["Salary", "Savings", "Investment", "Certification"])
        
        if st.button("💾 Save Goal"):
            new_goal = {
                'Title': goal_title,
                'Target': target_amount,
                'Current': current_amount,
                'Deadline': deadline,
                'Currency': currency,
                'Type': goal_type,
                'Progress': (current_amount / target_amount * 100) if target_amount > 0 else 0
            }
            st.session_state.goals_data.append(new_goal)
            st.success("✅ Goal saved successfully!")
    
    # Goals summary
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Completed Goals", "1", delta="✅")
    with col2:
        st.metric("In Progress", "3", delta="🔄")
    with col3:
        st.metric("Total Target", "₹40,50,000", delta="🎯")
    with col4:
        st.metric("Achieved", "₹24,00,000", delta="📈")
    
    # Sample goals display
    st.subheader("📋 Your Goals")
    
    goals_data = [
        {"Goal": "Reach ₹15 LPA Salary", "Target": "₹15,00,000", "Current": "₹12,00,000", "Progress": 80, "Status": "In Progress"},
        {"Goal": "Emergency Fund", "Target": "₹5,00,000", "Current": "₹3,50,000", "Progress": 70, "Status": "In Progress"},
        {"Goal": "AWS Certification", "Target": "₹50,000", "Current": "₹50,000", "Progress": 100, "Status": "Completed"},
        {"Goal": "Home Down Payment", "Target": "₹20,00,000", "Current": "₹8,00,000", "Progress": 40, "Status": "In Progress"}
    ]
    
    for goal in goals_data:
        with st.container():
            col1, col2, col3 = st.columns([2, 1, 1])
            
            with col1:
                st.write(f"**{goal['Goal']}**")
                st.progress(goal['Progress'] / 100)
                st.write(f"{goal['Current']} / {goal['Target']}")
            
            with col2:
                st.metric("Progress", f"{goal['Progress']}%")
            
            with col3:
                status_color = "🟢" if goal['Status'] == "Completed" else "🟡"
                st.write(f"{status_color} {goal['Status']}")
            
            st.markdown("---")

def show_benefits():
    st.header("🏥 Benefits Tracker")
    
    st.info("Track your health insurance, EPF, and other company benefits here.")
    
    # Benefits overview
    benefits_data = {
        'Benefit': ['Health Insurance', 'EPF Contribution', 'Meal Allowance', 'Transport Allowance'],
        'Employee Contribution': ['₹2,500', '₹6,000', '₹0', '₹0'],
        'Employer Contribution': ['₹5,000', '₹6,000', '₹2,000', '₹1,600'],
        'Total Value': ['₹7,500', '₹12,000', '₹2,000', '₹1,600'],
        'Status': ['Active', 'Active', 'Active', 'Active']
    }
    
    st.dataframe(pd.DataFrame(benefits_data), use_container_width=True)
    
    # Benefits utilization chart
    fig = px.bar(
        x=['Health Insurance', 'EPF', 'Meal', 'Transport'],
        y=[7500, 12000, 2000, 1600],
        title="Monthly Benefits Value"
    )
    st.plotly_chart(fig, use_container_width=True)

def show_budget():
    st.header("💳 Budget Planner")
    
    st.info("Plan and track your budget based on your Indian salary data with expense categories.")
    
    # Budget categories
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📊 Budget Allocation")
        budget_data = {
            'Category': ['Housing', 'Food', 'Transportation', 'Healthcare', 'Entertainment', 'Savings'],
            'Allocated': [25000, 8000, 5000, 3000, 4000, 20000],
            'Spent': [24000, 7500, 4800, 2500, 3800, 20000]
        }
        
        df = pd.DataFrame(budget_data)
        df['Remaining'] = df['Allocated'] - df['Spent']
        st.dataframe(df, use_container_width=True)
    
    with col2:
        st.subheader("📈 Spending Analysis")
        fig = px.pie(
            values=budget_data['Spent'],
            names=budget_data['Category'],
            title="Monthly Spending Distribution"
        )
        st.plotly_chart(fig, use_container_width=True)

def show_reports():
    st.header("📊 Reports & Analytics")
    
    st.info("Generate comprehensive reports on your salary trends, tax savings, and career progress in Indian context.")
    
    # Report options
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Salary Growth Report")
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        salaries = [90000, 90000, 95000, 95000, 95000, 100000, 100000, 95000, 95000, 100000, 95000, 110000]
        
        fig = px.line(x=months, y=salaries, title="2024 Salary Trend")
        fig.update_traces(line_color='#667eea', line_width=3)
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("💰 Tax Savings Report")
        tax_savings = {
            'Section': ['80C', '80D', 'HRA', 'Standard Deduction'],
            'Amount Saved': [46800, 25000, 60000, 18000]
        }
        
        fig = px.bar(
            x=tax_savings['Section'],
            y=tax_savings['Amount Saved'],
            title="Annual Tax Savings Breakdown"
        )
        st.plotly_chart(fig, use_container_width=True)
    
    # Download reports
    st.subheader("📥 Download Reports")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("📊 Annual Salary Report"):
            st.success("Annual salary report downloaded!")
    
    with col2:
        if st.button("💰 Tax Summary Report"):
            st.success("Tax summary report downloaded!")
    
    with col3:
        if st.button("📈 Growth Analysis Report"):
            st.success("Growth analysis report downloaded!")

if __name__ == "__main__":
    main()