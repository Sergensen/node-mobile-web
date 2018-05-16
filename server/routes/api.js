const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const User = require('../models/user');
const parse = require('jwt-decode');

const onlyUnique = (value, index, self)=> {
    return self.indexOf(value) === index;
}

const success = (res) => {
  return res.status(200).json({
    success: true,
    message: "request sent"
  });
}

const secureUserData = (user) => {
  user.password = [];
  user.friends = [];
  user.inRequests = [];
  user.outRequests = [];
  return user;
}

async function getData(res, data) {
  let out = {};
  for(let key in data){
    await User.findOne({_id: data[key]}, (err, user) => {
      if(err) return res.status(404).json({
        success: false,
        message: "something went wrong"
      });
      const { name, _id, email } = user;
      out[_id] = {
        name,
        email,
        id: _id
      };
    });
  }
  return out;
}

router.get('/users/:name', (req, res, next) => {
  User.find({name: req.params.name}, (err, user) => {
    if (err) return res.status(404).json({
      success: false,
      message: "something went wrong"
    });
    for(let key in user){
      user[key].password = [];
      user[key].friends = [];
      user[key].inRequests = [];
      user[key].outRequests = [];
    }
    return res.status(200).json({
      success: true,
      message: user
    });
  });
});

router.post('/delete/friend', (req, res, next) => {
  const { from, to } = req.body;
  User.findOne({_id: from}, (err, fromUser) => {
    if (err) return res.status(404).json({
      success: false,
      message: "something went wrong"
    });
    User.findOne({_id: to}, (err,toUser) => {
      if (err) return res.status(404).json({
        success: false,
        message: "something went wrong"
      });
      fromUser.friends.splice(fromUser.friends.indexOf(secureUserData(toUser)), 1);
      toUser.friends.splice(toUser.friends.indexOf(secureUserData(fromUser)), 1);
      fromUser.save((err)=>{
        if(err)return res.status(400).json({
          success: false,
          message: "update failed"
        });
      });
      toUser.save((err)=>{
        if(err)return res.status(400).json({
          success: false,
          message: "update failed"
        });
      });
      return res.status(200).json({
        success: true,
        message: "deleted user"
      });
    });
  });
});

router.post('/delete/request', (req, res, next) => {
  const { from, to } = req.body;
  User.findOne({_id: from}, (err, fromUser) => {
    if (err) return res.status(404).json({
      success: false,
      message: "something went wrong"
    });
    User.findOne({_id: to}, (err,toUser) => {
      if (err) return res.status(404).json({
        success: false,
        message: "something went wrong"
      });
      fromUser.outRequests.splice(fromUser.outRequests.indexOf(secureUserData(toUser)), 1);
      toUser.inRequests.splice(toUser.inRequests.indexOf(secureUserData(fromUser)), 1);
      fromUser.save((err)=>{
        if(err)return res.status(400).json({
          success: false,
          message: "update failed"
        });
      });
      toUser.save((err)=>{
        if(err)return res.status(400).json({
          success: false,
          message: "update failed"
        });
      });
      return res.status(200).json({
        success: true,
        message: "request sent"
      });
    });
  });
});

router.post('/userself', (req, res, next) => {
  User.findOne({_id: parse(req.headers.authorization.slice(7)).sub}, (err, user) => {
    if (err) return res.status(404).json({
      success: false,
      message: "something went wrong"
    });
    user.password="";
    return res.status(200).json({
      success: true,
      message: user
    });
  });
});


router.post('/add', (req, res, next) => {
  const { from, to } = req.body;
  if(from!==to){
    User.findOne({_id: from}, (err, fromUser) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: "cant find from-user"
        });
      }
      User.findOne({_id: to}, (err,toUser) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: "cant find to-user"
          });
        }
        if(toUser.inRequests.indexOf(secureUserData(fromUser)) > -1){
          return res.status(200).json({
            success: false,
            message: "already sent a request"
          });
        } else if (toUser.outRequests.indexOf(secureUserData(fromUser)) > -1){
          fromUser.inRequests.splice(fromUser.inRequests.indexOf(secureUserData(toUser)), 1);
          toUser.outRequests.splice(toUser.outRequests.indexOf(secureUserData(fromUser)), 1);
          fromUser.friends.push(secureUserData(toUser));
          fromUser.friends.filter(onlyUnique);
          fromUser.save((err)=>{
            if(err) {
              return res.status(404).json({
                success: false,
                message: "could not add friend to from-user"
              });
            } else {
              success(res);
            }
          });
          toUser.friends.push(secureUserData(fromUser));
          toUser.friends.filter(onlyUnique);
          toUser.save((err)=>{
            if(err) {
              return res.status(404).json({
                success: false,
                message: "could not add friend to to-user"
              });
            } else {
              success(res);
            }
          });
        } else {
          fromUser.outRequests.push(secureUserData(toUser));
          toUser.inRequests.push(secureUserData(fromUser));
          fromUser.outRequests.filter(onlyUnique);
          toUser.inRequests.filter(onlyUnique);
          fromUser.save((err)=>{
            if(err) {
              return res.status(404).json({
                success: false,
                message: "could not save out-request from from-user"
              });
            } else {
              toUser.save((err)=>{
                if(err) {
                  return res.status(404).json({
                    success: false,
                    message: "could not save in-request from to-user"
                  });
                } else {
                  success(res);
                }
              });
            }
          });
        }
      });
    });
  }
});

module.exports = router;
