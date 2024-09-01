// src/services/loginService.js

export async function login(emailId, password) {
    const payload = { emailId, password, orgId: 1 }; // Assuming orgId is hardcoded for testing
    console.log('Payload being sent to API:', payload);
  
    try {
        const response = await fetch('http://gtdev.greentinsolutions.com:8085/GGRLocService/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
  
        const responseData = await response.json();
        console.log('API Response:', responseData);
  
        if (!response.ok) {
            throw new Error(responseData.message || 'Login failed');
        }
  
        // Store orgId into localStorage
        if (responseData.employeeDetails.organization.orgId) {
            localStorage.setItem('orgId', responseData.employeeDetails.organization.orgId);
            console.log('orgId stored in localStorage:', responseData.employeeDetails.organization.orgId);
        } else {
            throw new Error('Organization ID not found in response');
        }
  
        // Store authToken into localStorage
        if (responseData.authToken) {  // Assuming the token is returned as 'authToken'
            localStorage.setItem('authToken', responseData.authToken);
            console.log('authToken stored in localStorage:', responseData.authToken);
        } else {
            throw new Error('Auth token not found in response');
        }
  
        // Store loggedInEmpId into localStorage
        if ( responseData.employeeDetails.empId) { // Adjust the field name based on your actual API response
          localStorage.setItem('loggedInEmpId', responseData.employeeDetails.empId);
          console.log('loggedInEmpId stored in localStorage:', responseData.employeeDetails.empId);
      } else {
          throw new Error('Employee ID not found in response');
      }
  
      
      if ( responseData.employeeDetails.branch.branchId) { // Adjust field name based on your actual API response
          localStorage.setItem('branchId', responseData.employeeDetails.branch.branchId);
          console.log('branchId stored in localStorage:', responseData.employeeDetails.branch.branchId);
        } else {
          throw new Error('Branch ID not found in response');
        }
  
        return responseData;
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throw error to be handled by caller
    }
  }
  