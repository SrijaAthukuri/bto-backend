const alert = require('alert')
var express = require("express");
var router = express.Router();
var models = require("../models");
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const jwt = require("jsonwebtoken");
const database = new sqlite3.Database("./db.sqlite");
let similarity = require('sentence-similarity')
let similarityScore = require('similarity-score')
var nodemailer = require('nodemailer');
const { removeListener } = require('../app');
const SECRET_KEY = "vitap";
const Nexmo = require('nexmo');
const { request } = require('express');
const nexmo = new Nexmo({
  apiKey: "d64bd3ba",
  apiSecret: "GlrkbEevcOBFDC6S",
}, {debug: true});

//get all posts
router.get("/posts", function (request, response) {
	models.posts.findAll().then(posts => response.json(posts));
});

//post experience
router.post("/postexperience", function (request, response) {
	console.log("vfhsgh", request.body.description);
	models.posts.create({
		description: request.body.description,
		postedby: request.body.name,
		comments: "0"

	})
		.then(function (posts) {
			//response.redirect("http://localhost:3000");
			response.json(posts)
		});
});
  
  


function findUserByEmail(email, cb) {
	return database.get(`SELECT * FROM Employees WHERE emailId = ?`, [email], (err, row) => {
		cb(err, row);
	});
}


const createUser = (user, cb) => {
	return database.run('INSERT INTO users (username, email, password,role) VALUES (?,?,?,?)', user, (err) => {
		cb(err)
	});
}


//login
router.post('/login', (req, res) => {
	const user = req.body.email;
	const password = req.body.password;
	findUserByEmail(user, (err, temp) => {
		//console.log(user)
		if (err) {  return res.status(500).send('Server error!'); }
		if (!temp) {  return res.status(404).send('User not found!'); }
		var result = true;

		if (password != temp.empId) {
			result = false
		}
		//res.send(result)
		if (!result) {  return res.status(401).send('Password not valid!') };

		const expiresIn = 24 * 60 * 60;
		const accessToken = jwt.sign({ id: temp.id }, SECRET_KEY, {
			expiresIn: expiresIn
		}
		);
		const user={
			"empId":temp.id,
			"name":temp.name,
			"emailId":temp.emailId,
			"workstation":temp.workstation,
			"team":temp.team,
			"accessToken":accessToken

		}
		
		
	res.status(201).send({ "user": user,"accessToken": accessToken});
		//res.json(user.username)
		console.log(user)
		console.log(accessToken)
		
	});
});






router.get("/:post_id/posts",function(request,response){
	models.posts.findAll({
		where:{
			id:request.params.post_id
		}
	}).then(posts => {
		response.json(posts);
	});
	
});



//get answer
router.get("/:question_id/answer/:answer_id", function (request, response) {
	models.answers
		.findAll({
			where: {
				queid: request.params.question_id,
				id: request.params.answer_id
			}
		})
		.then(answers => {
			response.json(answers);
		});
});

//get answers for a que
router.get("/:post_id/comments", function (request, response) {
	models.comments
		.findAll({
			where: {
				postid: request.params.post_id
			}
		})
		.then(comments => {
			response.json(comments);
		});
});



//post comment
router.post("/:post_id/comment", function (request, response) {
	//console.log("vfhsgh", request.params.answer);
	models.posts.increment("comments", {
		where: { id: request.params.post_id }
	});
	models.comments
		.create({
			postid: request.params.post_id,
			comment: request.body.comment,
			commentedby: "Srija",
			
		})
		.then(function (comments) {
			response.redirect(
				`http://localhost:3000/${request.params.post_id}/posts`
			);
		});
});

router.post("/request/:title/:workstation",function(req,res){
	//console.log(workstation)
	//res.send(req.body);
	const from = 'Vonage APIs';
	const to = '917893584099';
	var text = 'Your request is registered to sanitize ';
	if(req.params.title=='Workspace')
		text=text+'your workstation '+req.params.workstation;
	else if(req.params.title=='Cafeteria')
		text=text+'Cafeteria';
	else
		text=text+'WashArea';
	nexmo.message.sendSms(from, to, text);
	console.log(text);
	res.sendStatus(200);
});




module.exports = router;