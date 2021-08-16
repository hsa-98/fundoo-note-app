const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
const server = require('../server');
const user = require('./user.test.json');
chai.use(chaiHttp);

describe('register',()=>{
    it('givenValidDetails_shouldUpdateDbAndRegister_Return201',(done)=>{
            const userDetails = user.user.validDetails;
            chai.request(server)
            .post('/register')
            .send(userDetails)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                done();
            });
    });
    it('givenEmptyFirstName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidFirstName;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenEmptyLastName_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidLastName;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenEmptyEmailId_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithInvalidEmailId;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
    it('givenEmptyPassword_shouldReturnStatus400',(done)=>{
        const userDetails = user.user.detailsWithWeakPassword;
        chai.request(server)
        .post('/register')
        .send(userDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property('success').eql(false);
            done();
        });
    });
});

describe('login',()=>{
    it('givenValidLoginInfo_shouldReturnStatus200_WithTokenAndData',(done)=>{
        const loginDetails = user.login.validDetails;
        chai.request(server)
        .post('/login')
        .send(loginDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(200);
            res.body.should.be.a('object')
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('data');
            res.body.should.have.property('token');
            done();
        });
    });
    
    it('givenInvalidEmail_ShouldReturnStatus401',(done)=>{
        const loginDetails = user.login.invalidEmail;
        chai.request(server)
        .post('/login')
        .send(loginDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(401);
            done();
        });
    });

    it('givenValidButNonExistentEmail_ShouldReturnStatus401AndError',(done)=>{
        const loginDetails = user.login.validEmailButNonExistent;
        chai.request(server)
        .post('/login')
        .send(loginDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Email id doesnt exist');
            done();
        });
    });

    it('givenWrongPassword_ShouldReturnStatus401AndError',(done)=>{
        const loginDetails = user.login.wrongPassword;
        chai.request(server)
        .post('/login')
        .send(loginDetails)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Invalid Password');
            done();
        });

    })
});