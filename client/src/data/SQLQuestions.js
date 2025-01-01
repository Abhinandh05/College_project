const SQLQuestions = [

    {
        question: "What is the output of `SELECT 1 + 1;`?",
        correctAnswer: "2"
    },
    {
        question: "What is the output of `SELECT COUNT(*) FROM employees;`?",
        correctAnswer: "Total number of rows in 'employees' table"
    },
    {
        question: "What is the output of `SELECT DISTINCT department FROM employees;`?",
        correctAnswer: "List of unique departments"
    },
    {
        question: "What is the output of `SELECT MAX(salary) FROM employees;`?",
        correctAnswer: "The highest salary in the 'employees' table"
    },
    {
        question: "What is the output of `SELECT AVG(salary) FROM employees;`?",
        correctAnswer: "The average salary in the 'employees' table"
    },
    {
        question: "What is the output of `SELECT * FROM employees WHERE age > 30;`?",
        correctAnswer: "List of employees with age greater than 30"
    },
    {
        question: "What is the output of `SELECT name FROM employees ORDER BY hire_date DESC;`?",
        correctAnswer: "List of employee names ordered by hire date in descending order"
    },
    {
        question: "What is the output of `SELECT COUNT(DISTINCT department) FROM employees;`?",
        correctAnswer: "Count of unique departments"
    },
    {
        question: "What is the output of `SELECT employee_id, department FROM employees WHERE department = 'Sales';`?",
        correctAnswer: "List of employee IDs and departments where the department is 'Sales'"
    },
    {
        question: "What is the output of `SELECT employee_id, department FROM employees WHERE department != 'HR';`?",
        correctAnswer: "List of employee IDs and departments excluding 'HR'"
    },
    {
        question: "What is the output of `SELECT employee_id, name FROM employees WHERE name LIKE 'J%';`?",
        correctAnswer: "List of employee IDs and names starting with 'J'"
    },
    {
        question: "What is the output of `SELECT employee_id, name FROM employees WHERE name IN ('John', 'Jane');`?",
        correctAnswer: "List of employee IDs and names that are either 'John' or 'Jane'"
    },
    {
        question: "What is the output of `SELECT employee_id, name FROM employees WHERE name NOT LIKE 'J%';`?",
        correctAnswer: "List of employee IDs and names not starting with 'J'"
    },
    {
        question: "What is the output of `SELECT SUM(salary) FROM employees WHERE department = 'Engineering';`?",
        correctAnswer: "Total salary for the 'Engineering' department"
    },
    {
        question: "What is the output of `SELECT MAX(salary) - MIN(salary) FROM employees;`?",
        correctAnswer: "Difference between the highest and lowest salary"
    },
    {
        question: "What is the output of `SELECT employee_id, name, department FROM employees WHERE department IN ('Sales', 'Marketing');`?",
        correctAnswer: "List of employee IDs, names, and departments where the department is either 'Sales' or 'Marketing'"
    },
    {
        question: "What is the output of `SELECT employee_id, department, salary FROM employees WHERE salary BETWEEN 50000 AND 100000;`?",
        correctAnswer: "List of employee IDs, departments, and salaries within the range of 50,000 to 100,000"
    },
    {
        question: "What is the output of `SELECT department, COUNT(employee_id) FROM employees GROUP BY department;`?",
        correctAnswer: "Count of employees per department"
    },
    {
        question: "What is the output of `SELECT name, department FROM employees HAVING COUNT(department) > 1;`?",
        correctAnswer: "List of names and departments where there are multiple employees"
    },
    {
        question: "What is the output of `SELECT employee_id, name FROM employees ORDER BY hire_date ASC LIMIT 5;`?",
        correctAnswer: "List of employee IDs and names of the first 5 employees hired"
    },
    {
        question: "What is the output of `SELECT employee_id, name FROM employees WHERE employee_id BETWEEN 100 AND 110;`?",
        correctAnswer: "List of employee IDs and names within the employee ID range of 100 to 110"
    },
    {
        question: "What is the output of `SELECT employee_id, name FROM employees ORDER BY name ASC LIMIT 5 OFFSET 5;`?",
        correctAnswer: "List of employee IDs and names starting from the 6th row, ordered alphabetically"
    },

];

export default SQLQuestions;
