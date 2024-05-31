import Coupon from "../models/couponModel.js";
import asyncHandler from 'express-async-handler'
import validateMongoDbId from "../utils/validateMongodbId.js";

export const createCoupon = asyncHandler(async(req,res)=>{
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

export const getallCoupons = asyncHandler(async(req,res)=>{
    try {
        const allCoupons = await Coupon.find()
        res.json(allCoupons)
    } catch (error) {
        throw new Error(error)
    }
})

export const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req?.params
    validateMongoDbId(id)
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true})
        res.json(updatedCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

export const deleteCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params

    try {
        const deletedCoupon  = await Coupon.findByIdAndDelete(id)
        res.json(deletedCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

export const getCoupon = asyncHandler(async(req,res)=>{
    const {id}= req.params

    try {
        const couponDetails = await Coupon.findById(id)
        res.json(couponDetails)        
    } catch (error) {
        throw new Error(error)
    }
})