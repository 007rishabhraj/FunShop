import express from 'express'
import Review from "../models/reviewsModel.js"
import mongoose from "mongoose"

export const createReview = async(req,res) => {
    try {
        // console.log(req.body);
        const {rating , description,productId} = req.body
        const userId = req.body.user._id
        const result = await Review.create({description:description,rating:rating,userId:userId,productId:productId})
        res.status(200).json({
            success: "true",
            result: result
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            msg: error.message
        })
    }
}

export const getReviews = async(req,res) => {
    try {
      // Extract productId from req.query instead of req.params
      const { productId } = req.params;
      // console.log("Product ID:", productId);

      // Query the reviews collection using the extracted productId
      const result = await Review.find({ productId });
      // console.log("Review Result:", result);

      // Respond with the found reviews
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: "false",
        msg: error.message,
      });
    }
}

export const getAllReviews = async (req, res) => {
  try {
    const result = await Review.find();
    res.status(200).json({
      success: "true",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: "false",
      msg: error.message,
    });
  }
};
