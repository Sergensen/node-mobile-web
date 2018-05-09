const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const User = require('../models/user');

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
        /*add each other*/
        return res.status(200).json({
          success: true,
          message: "added eachother"
        });
      } else {
        fromUser.outRequests.push(to);
        fromUser.save((err)=>{
          if(err)return res.status(400).json({
            success: false,
            message: "update failed"
          });
        })
        toUser.inRequests.push(from);
        toUser.save((err)=>{
          if(err)return res.status(400).json({
            success: false,
            message: "update failed"
          });
        })
        return res.status(200).json({
          success: true,
          message: "request sent"
        });
      }
    });
  });
});

module.exports = router;
