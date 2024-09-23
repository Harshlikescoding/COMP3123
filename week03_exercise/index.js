var http = require("http");
// Use Employee Module here
var employeemodule = require("./Employee");
console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        res.statusCode = 405; 
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
        return; // Ensure no further code is executed
    }

 
    if (req.url === '/') {
       
        res.setHeader('Content-Type', 'text/html');
        res.end("<h1>Welcome to Lab Exercise 03</h1>");
        return; // Stop further execution
    }

    if (req.url === '/employee') {

        res.end(JSON.stringify(employeemodule.getAllEmployees()));
        return; s
    }

    if (req.url === '/employee/names') {
        // Display employee names in ascending order
        let employeeNames = employeemodule.getAllEmployees()
            .map(emp => `${emp.firstName} ${emp.lastName}`)
            .sort(); // Sorting in ascending order
        res.end(JSON.stringify(employeeNames));
        return; // Stop further execution
    }

    if (req.url === '/employee/totalsalary') {
        // Display total salary of all employees
        let totalSalary = employeemodule.getAllEmployees()
            .reduce((total, emp) => total + emp.Salary, 0);
        res.end(JSON.stringify({ "total_salary": totalSalary }));
        return; // Stop further execution
    }

    // If no matching route, send 404 response
    res.statusCode = 404; // Not Found
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
});

// Start the server and listen on the defined port
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
