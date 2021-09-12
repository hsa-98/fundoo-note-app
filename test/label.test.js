const chai = require('chai');
const chaiHttp = require('chai-http');
const { data } = require('../logger/logger');
chai.should();
const server = require('../server');
const userInput = require('./user.test.json');
chai.use(chaiHttp);

const labelInput = require('./label.test.json');
let token  = '';

beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(userInput.login.validDetails)
        .end((error, res) => {
            if (error) {
              return done(error);
            }
            token = "bearer "+res.body.data.token;
            done();
        });
});

describe('createlabel',()=>{
    it('givenValidLabel_ShouldReturn_Status201',(done)=>{
        const label = labelInput.label.createLabel.validLabel;
        chai.request(server)
        .post('/createlabel')
        .set({authorization:token})
        .send(label)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
            
            done();
            }
        })

    })

    it('givenInValidLabel_ShouldReturn_Status400',(done)=>{
        const label = labelInput.label.createLabel.invalidLabel;
        chai.request(server)
        .post('/createlabel')
        .set({authorization:token})
        .send(label)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Please enter valid label")
            done();
            }
        })

    })

    it('givenInvalidToken_ShouldReturnStatus401',(done)=>{
        const label = labelInput.label.createLabel.invalidToken;
        const token = labelInput.label.createLabel.invalidToken.token;
        chai.request(server)
        .post('/createlabel')
        .set({authorization:token})
        .send(label)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Invalid Token")
            done();
            }
        })

    })   
})

describe('getLabel',()=>{
    it('givenValidData_ShouldReturnLabels_Status200',(done)=>{
        chai.request(server)
        .get('/getlabels')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql("labels retrieved")
            done();
            }
        })
    })

    it('givenValidToken_ButNoLabelInDb_ShouldReturnStatus404',(done)=>{
        const token = labelInput.label.getLabel.validTokenButNoLabels.token
        chai.request(server)
        .get('/getlabels')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Labels not found ")
            done();
            }
        })
    })

    it('givenInvalidToken_ShouldReturnStatus401',(done)=>{
        const token = labelInput.label.getLabel.invalidToken.token;
        chai.request(server)
        .post('/createlabel')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Invalid Token")
            done();
            }
        })
    })
})

describe('updateLabel',()=>{
    it('givenValidData_ShouldUpdateLabel_ReturnStatus200',(done)=>{
        const label = labelInput.label.updateLabel.validLabel;
        chai.request(server)
        .put('/updatelabel/61375f7d2d66eaa714b6b22e')
        .set({authorization:token})
        .send(label)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql("label updated");
            done();
            }
        })
    })

    it('givenInvalidLabelId_ShouldReturnError404',(done)=>{
        const label = labelInput.label.updateLabel.validLabel;
        chai.request(server)
        .put('/updatelabel/613ceac3cdb278443489b3')
        .set({authorization:token})
        .send(label)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Label Not Found");
            done();
            }
        })
    })

    it('givenInvalidLabel_ShouldReturnStatus400',(done)=>{
        const label = labelInput.label.updateLabel.invalidLabel;
        chai.request(server)
        .put('/updatelabel/613ceac3cdb278443489b371')
        .set({authorization:token})
        .send(label)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Please enter valid label");
            done();
            }
        })
    })

    it('givenInvalidToken_ShouldReturnStatus401',(done)=>{
        const token = labelInput.label.getLabel.invalidToken.token;
        chai.request(server)
        .put('/updatelabel/613ceac3cdb278443489b371')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Invalid Token")
            done();
            }
        })
    })
})

describe('deletelabel',()=>{
    it('givenValidLabelId_ShouldDeleteLabel_ReturnStatus200',(done)=>{
        chai.request(server)
        .delete('/deletelabel/613ceac3cdb278443489b371')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('message').eql("Deleted label")
            done();
            }
        })

    })

    it('givenInvalidToken_ShouldReturnStatus401',(done)=>{
        const token = labelInput.label.getLabel.invalidToken.token;
        chai.request(server)
        .delete('/deletelabel/613ceac3cdb278443489b371')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            else{
                res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql("Invalid Token")
            done();
            }
        })
    })
})