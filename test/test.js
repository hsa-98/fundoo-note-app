const chai = require('chai');
const chaiHttp = require('chai-http');
const { data } = require('../logger/logger');
chai.should();
const server = require('../server');
const user = require('./user.test.json');
chai.use(chaiHttp);
/*
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
describe('forgotPassword',()=>{

    it('givenInValidEMail_ShouldReturnStatus400AndError',(done)=>{
        const email = user.forgotPassword.invalidEmail;
        chai.request(server)
        .post('/forgotpassword')
        .send(email)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Invalid email please try again');
            done();
        })
    })

    it('givenNonRegisteredEMail_ShouldReturnStatus400AndError',(done)=>{
        const email = user.forgotPassword.validEmailButDoesntExist;
        chai.request(server)
        .post('/forgotpassword')
        .send(email)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Invalid email please try again');
            done();
        })
    })

    it('givenCorrectEmail_ShouldReturnStatus200AndSendLink',(done)=>{
        const email = user.forgotPassword.validEmail;
        chai.request(server)
        .post('/forgotpassword')
        .send(email)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Email reset link sent succesfully');
            res.body.should.have.property('success').eql(true);
            done();
        })
    }).timeout(10000);
})   

describe('resetpassword',()=>{
        it('givenCorrectPasswordAndToken_ShouldResetPassword_ReturnStatus200',(done)=>{
            const credentials = user.resetPassword.validTokenAndPassword;
            chai.request(server)
            .put('/resetPassword')
            .send(credentials)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('message').eql("Password reset succesfully");
                done();
            })
        })
        it('givenInvalidPassword_ShouldReturnStatus400',(done)=>{
            const credentials = user.resetPassword.invalidPassword;
            chai.request(server)
            .put('/resetPassword')
            .send(credentials)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                res.should.have.status(400);
                res.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql("Invalid password please try again");
                done();
        });
    });
    it('givenInvalidToken_ShouldReturnStatus400',(done)=>{
        const credentials = user.resetPassword.invalidToken;
            chai.request(server)
            .put('/resetPassword')
            .send(credentials)
            .end((err,res)=>{
                if(err){
                    return done(err);
                }
                res.should.have.status(400);
                res.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('message').eql("Invalid Token");
                done();
        });

    })    
})
*/
describe('createnotes',()=>{
    it('givenValidNote_ShouldreturnStatus201',(done)=>{
        const note = user.createnotes.validNote.data;
        const token = user.createnotes.validNote.token;
        chai.request(server)
        .post('/createnotes')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
        
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            done();
        })
    })
    it('givenNoTitle_ShouldReturnStatus400',(done)=>{
        const note = user.createnotes.invalidNoteWithNote.data;
        const token = user.createnotes.invalidNoteWithNote.token;
        chai.request(server)
        .post('/createnotes')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
        
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Please enter valid note')
            done();
        })
    })

    it('givenNoNote_ShouldReturnStatus400',(done)=>{
        const note = user.createnotes.invalidNoteWithTitle.data;
        const token = user.createnotes.invalidNoteWithTitle.token;
        chai.request(server)
        .post('/createnotes')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
        
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Please enter valid note')
            done();
        })
    })
    
    it('givenInvalidToken_ShouldReturnStatus400',(done)=>{
        const note = user.createnotes.invalidToken.data;
        const token = user.createnotes.invalidToken.token;
        chai.request(server)
        .post('/createnotes')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
        
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Invalid Token')
            done();
        })
    })
})
describe('getnotes',()=>{
    it('givenValidToken_ShouldReturnAllNotes',(done)=>{
        const token = user.getnotes.validToken.token;
        chai.request(server)
        .get('/getnotes')
        .set('authorization',token)
        .end((err,res)=>{
            if(err){
                return done(err);
            }else{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Notes retieved succesfully');
            res.body.should.have.property('success').eql(true);
            done();
            }
        })
    }),
    it('giveninvalidToken_ShouldReturnError',(done)=>{
        const token = user.getnotes.invalidToken;
        chai.request(server)
        .get('/getnotes')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Please enter valid token');
            done();
        })
    })
})

describe('updatenotes',()=>{
    it('givenPoperDetails_ShouldUpdateNote',(done)=>{
        const token = user.updatenotes.validData.token;
        const note = user.updatenotes.validData.data;
        chai.request(server)
        .put('/updatenotes/6129a4f353113b101862368c')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Note updated');
            res.body.should.have.property('success').eql(true);
            done();
        })
    })

    it('givenInvalidNote_ShouldReturnError',(done)=>{
        const token = user.updatenotes.invalidNote.token;
        const note = user.updatenotes.invalidNote.data;
        chai.request(server)
        .put('/updatenotes/6129a4f353113b101862368c')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Enter valid note');
            res.body.should.have.property('success').eql(false);
            done();
        })
    })

    it('givenInvalidToken_ShouldReturnError',(done)=>{
        const token = user.updatenotes.invalidToken.token;
        const note = user.updatenotes.invalidToken.data;
        chai.request(server)
        .put('/updatenotes/6129a4f353113b101862368c')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Please enter valid token');
            done();
        })
    })

    it('givenNoteWithoutNote_ShouldReturnError',(done)=>{
        const token = user.updatenotes.noteWithoutNote.token;
        const note = user.updatenotes.noteWithoutNote.data;
        chai.request(server)
        .put('/updatenotes/6129a4f353113b101862368c')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Enter valid note');
            res.body.should.have.property('success').eql(false);
            done();
        })

    })
})

describe('deletenotes',()=>{
    it('givenValidIdAndToken_ShouldDeleteNote_ReturnStatus',(done)=>{
        const token = user.deletenotes.validToken.token;
        chai.request(server)
        .delete('/deletenotes/612ef7e8ffe65e5cd8c482eb')
        .send('612ef7e8ffe65e5cd8c482eb')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Note deleted');
            res.body.should.have.property('success').eql(true);
            done();
        }) 
    })
    it('givenInvalidToken_ShouldReturnError_FailtoDeleteNote',(done)=>{
        const token = user.deletenotes.invalidToken;
        chai.request(server)
        .delete('/deletenotes/612e59fb7ec8de4a50bd81ce')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid Token');
            res.body.should.have.property('success').eql(false);
            done();
        })
    })
})