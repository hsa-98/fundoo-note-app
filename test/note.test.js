
const chai = require('chai');
const chaiHttp = require('chai-http');
const { data } = require('../logger/logger');
chai.should();
const server = require('../server');
const userInput = require('./user.test.json');
chai.use(chaiHttp);

const user = require('./note.test.json');
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
describe('createnotes',()=>{
    it('givenValidNote_ShouldreturnStatus201',(done)=>{
        const note = user.notes.createnotes.validNote;
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
        const note = user.notes.createnotes.invalidNoteWithNote;
      
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
        const note = user.notes.createnotes.invalidNoteWithTitle;
       
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
    
    it('givenInvalidToken_ShouldReturnStatus401',(done)=>{
        const note = user.notes.createnotes.invalidToken;
        const token = user.notes.createnotes.invalidToken.token;
        chai.request(server)
        .post('/createnotes')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
        
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(false);
            res.body.should.have.property('message').eql('Invalid Token')
            done();
        })
    })
})
describe('getnotes',()=>{
    it('givenValidToken_ShouldReturnAllNotes',(done)=>{
       
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
        const token = user.notes.getnotes.invalidToken;
        chai.request(server)
        .get('/getnotes')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid Token');
            done();
        })
    })
})

describe('updatenotes',()=>{
    it('givenPoperDetails_ShouldUpdateNote',(done)=>{
        const note = user.notes.updatenotes.validData;
        chai.request(server)
        .put('/updatenotes/613b7ed958e10bbb00eedb5a')
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
        const note = user.notes.updatenotes.invalidNote;
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
        const token = user.notes.updatenotes.invalidToken.token;
        const note = user.notes.updatenotes.invalidToken;
        chai.request(server)
        .put('/updatenotes/6129a4f353113b101862368c')
        .set({authorization:token})
        .send(note)
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid Token');
            done();
        })
    })

    it('givenNoteWithoutNote_ShouldReturnError',(done)=>{
        const note = user.notes.updatenotes.noteWithoutNote.data;
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
        const token = user.notes.deletenotes.invalidToken;
        chai.request(server)
        .delete('/deletenotes/612e59fb7ec8de4a50bd81ce')
        .set({authorization:token})
        .end((err,res)=>{
            if(err){
                return done(err);
            }
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Invalid Token');
            res.body.should.have.property('success').eql(false);
            done();
        })
    })

})