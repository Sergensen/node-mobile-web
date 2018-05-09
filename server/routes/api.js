const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const User = require('../models/user');
const parse = require('jwt-decode');

const onlyUnique = (value, index, self)=>{
    return self.indexOf(value) === index;
}

async function getFriends(res, friends) {
  let out = {};
  for(let key in friends){
    await User.findOne({_id: friends[key]}, (err, friend) => {
      if(err) return res.status(404).json({
        success: false,
        message: "something went wrong"
      });
      const { name, _id, email } = friend;
      out[_id] = {
        name,
        email
      };
    });
  }
  return out;
}


router.get('/user/:name', (req, res, next) => {
  User.find({name: req.params.name}, (err, user) => {
    if (err) return res.status(404).json({
      success: false,
      message: "something went wrong"
    });
    return res.status(200).json({
      success: true,
      message: user
    });
  });
});

router.post('/friends', (req, res, next) => {
  User.findOne({_id: parse(req.headers.authorization.slice(7)).sub}, (err, user) => {
    if (err) return res.status(404).json({
      success: false,
      message: "something went wrong"
    });
    getFriends(res, user.friends.filter(onlyUnique)).then((response)=>{
      return res.status(200).json({
        success: true,
        message: response,
      });
    });
  });
});

router.post('/inrequests', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: req
  });
});

router.post('/add', (req, res, next) => {
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
      if(toUser.inRequests.indexOf(from) > -1){
        return res.status(200).json({
          success: false,
          message: "already sent a request"
        });
      } else if (toUser.outRequests.indexOf(from) > -1){
        fromUser.inRequests.splice(fromUser.inRequests.indexOf(to), 1);
        toUser.outRequests.splice(toUser.outRequests.indexOf(from), 1);
        fromUser.friends.push(to);
        toUser.friends.push(from);
        fromUser.friends.filter(onlyUnique);
        toUser.friends.filter(onlyUnique);
      } else {
        fromUser.outRequests.push(to);
        toUser.inRequests.push(from);
      }
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

module.exports = router;
