const jwt = require('jsonwebtoken')
const auth = require('./app/middleware/authenticate');
auth.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MTIzZWM2ZTNmYmI4MzRlMzBlZDcxODYiLCJuYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IkFncmF3YWwiLCJlbWFpbElkIjoiaGFyc2hzYW5qYXlhZ3Jhd2FsODlAZ21haWwuY29tIn0sImlhdCI6MTYyOTgzNDgxMCwiZXhwIjoxNjI5ODM4NDEwfQ.niY50a_J_jPeSEeUuGK92xxGmvYy0in8RlsY5RHZidw',(err,data)=>{
    if(data){
        console.log(data);
    }
    else{
        console.log("Error",err);
    }
})    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhRm9yVG9rZW4iOnsiaWQiOiI2MTIzZWM2ZTNmYmI4MzRlMzBlZDcxODYiLCJuYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IkFncmF3YWwiLCJlbWFpbElkIjoiaGFyc2hzYW5qYXlhZ3Jhd2FsODlAZ21haWwuY29tIn0sImlhdCI6MTYzMDA3NzE5OCwiZXhwIjoxNjMwMDgwNzk4fQ.f96-fMjPK4_f6_aFIccRRsMhCbPohBtKDHtNQ3egngo",
